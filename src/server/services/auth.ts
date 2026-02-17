// Vyxlo Authentication Service
// User creation, credential verification, session management

import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';
import { query, transaction } from '../db/client';
import type { User, Session } from '@/types/models';

const JWT_SECRET = new TextEncoder().encode(
  process.env.VERCEL_JWT_SECRET || 'fallback-secret-for-dev-only'
);
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes
const SESSION_EXPIRY_DAYS = 30; // 30 days

export interface JWTPayload {
  sub: string; // user_id
  email: string;
  iat: number;
  exp: number;
}

// ========================================
// USER OPERATIONS
// ========================================

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const result = await query<User>(
    `INSERT INTO users (email, password_hash, name, is_active)
     VALUES ($1, $2, $3, true)
     RETURNING *`,
    [email.toLowerCase(), passwordHash, name]
  );

  return result.rows[0];
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await query<User>(
    'SELECT * FROM users WHERE email = $1',
    [email.toLowerCase()]
  );

  return result.rows[0] || null;
}

export async function findUserById(userId: string): Promise<User | null> {
  const result = await query<User>(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  );

  return result.rows[0] || null;
}

export async function updateLastLogin(userId: string): Promise<void> {
  await query(
    'UPDATE users SET last_login_at = NOW() WHERE id = $1',
    [userId]
  );
}

// ========================================
// CREDENTIAL VERIFICATION
// ========================================

export async function verifyCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await findUserByEmail(email);
  
  if (!user || !user.password_hash) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  
  if (!isValid) {
    return null;
  }

  return user;
}

// ========================================
// SESSION MANAGEMENT
// ========================================

export async function createSession(
  userId: string,
  ip?: string,
  userAgent?: string
): Promise<Session> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

  const result = await query<Session>(
    `INSERT INTO sessions (user_id, expires_at, ip, user_agent)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, expiresAt, ip || null, userAgent || null]
  );

  return result.rows[0];
}

export async function findSession(sessionId: string): Promise<Session | null> {
  const result = await query<Session>(
    'SELECT * FROM sessions WHERE id = $1 AND expires_at > NOW()',
    [sessionId]
  );

  return result.rows[0] || null;
}

export async function revokeSession(sessionId: string): Promise<void> {
  await query('DELETE FROM sessions WHERE id = $1', [sessionId]);
}

export async function revokeAllUserSessions(userId: string): Promise<void> {
  await query('DELETE FROM sessions WHERE user_id = $1', [userId]);
}

// ========================================
// JWT TOKEN OPERATIONS
// ========================================

export async function createAccessToken(user: User): Promise<string> {
  const token = await new SignJWT({
    sub: user.id,
    email: user.email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  return token;
}

export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    // Token expired or invalid
    return null;
  }
}

// ========================================
// ORGANIZATION OPERATIONS (for registration)
// ========================================

export async function createOrganization(
  name: string,
  slug: string,
  ownerId: string
): Promise<{ id: string; name: string; slug: string }> {
  const result = await query(
    `INSERT INTO organizations (name, slug, owner_id)
     VALUES ($1, $2, $3)
     RETURNING id, name, slug`,
    [name, slug, ownerId]
  );

  return result.rows[0];
}

// ========================================
// API KEY OPERATIONS
// ========================================

export async function createApiKey(
  organizationId: string,
  name: string = 'Default API Key'
): Promise<{ id: string; secret: string }> {
  const keyId = nanoid(16);
  const secret = nanoid(32);
  const fullSecret = `${keyId}.${secret}`;
  const secretHash = await bcrypt.hash(secret, 10);

  const result = await query(
    `INSERT INTO api_keys (id, organization_id, name, secret_hash, scopes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [keyId, organizationId, name, secretHash, JSON.stringify(['usage:write'])]
  );

  return {
    id: result.rows[0].id,
    secret: fullSecret,
  };
}

export async function verifyApiKey(apiKeySecret: string): Promise<string | null> {
  const [keyId, secret] = apiKeySecret.split('.');
  
  if (!keyId || !secret) {
    return null;
  }

  const result = await query(
    `SELECT organization_id, secret_hash 
     FROM api_keys 
     WHERE id = $1 AND revoked_at IS NULL`,
    [keyId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const { organization_id, secret_hash } = result.rows[0];
  const isValid = await bcrypt.compare(secret, secret_hash);

  if (!isValid) {
    return null;
  }

  return organization_id;
}

// ========================================
// AUDIT LOG
// ========================================

export async function logAudit(
  action: string,
  actorId?: string,
  organizationId?: string,
  meta?: Record<string, any>
): Promise<void> {
  await query(
    `INSERT INTO audit_logs (action, actor_id, organization_id, meta)
     VALUES ($1, $2, $3, $4)`,
    [action, actorId || null, organizationId || null, JSON.stringify(meta || {})]
  );
}

// ========================================
// COMPLETE REGISTRATION FLOW
// ========================================

export async function registerUser(
  email: string,
  password: string,
  name: string,
  orgName: string
): Promise<{
  user: User;
  organization: { id: string; name: string; slug: string };
  apiKeySecret: string;
}> {
  return await transaction(async (client) => {
    // Create user
    const userResult = await client.query<User>(
      `INSERT INTO users (email, password_hash, name, is_active)
       VALUES ($1, $2, $3, true)
       RETURNING *`,
      [email.toLowerCase(), await bcrypt.hash(password, 10), name]
    );
    const user = userResult.rows[0];

    // Generate org slug from name
    const slug = orgName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Create organization
    const orgResult = await client.query(
      `INSERT INTO organizations (name, slug, owner_id)
       VALUES ($1, $2, $3)
       RETURNING id, name, slug`,
      [orgName, slug, user.id]
    );
    const organization = orgResult.rows[0];

    // Create API key
    const keyId = nanoid(16);
    const secret = nanoid(32);
    const fullSecret = `${keyId}.${secret}`;
    const secretHash = await bcrypt.hash(secret, 10);

    await client.query(
      `INSERT INTO api_keys (id, organization_id, name, secret_hash, scopes)
       VALUES ($1, $2, $3, $4, $5)`,
      [keyId, organization.id, 'Default API Key', secretHash, JSON.stringify(['usage:write'])]
    );

    // Audit log
    await client.query(
      `INSERT INTO audit_logs (action, actor_id, organization_id, meta)
       VALUES ($1, $2, $3, $4)`,
      [
        'user.registered',
        user.id,
        organization.id,
        JSON.stringify({ email: user.email, orgName }),
      ]
    );

    return {
      user,
      organization,
      apiKeySecret: fullSecret,
    };
  });
}
