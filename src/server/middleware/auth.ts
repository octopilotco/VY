// Vyxlo Authentication Middleware
// Extract and verify user from request (cookie, bearer, or API key)

import type { VercelRequest } from '@vercel/node';
import { getSessionToken } from '../utils/cookie';
import { verifyAccessToken, findUserById, verifyApiKey } from '../services/auth';
import type { User } from '@/types/models';
import { UnauthorizedError } from '../utils/errors';

export interface AuthenticatedRequest extends VercelRequest {
  user?: User;
  organizationId?: string;
  authMethod?: 'jwt' | 'apikey';
}

// Extract token from Authorization header
function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return null;
  }

  const [scheme, token] = parts;
  if (scheme.toLowerCase() === 'bearer' || scheme.toLowerCase() === 'apikey') {
    return token;
  }

  return null;
}

// Get user from JWT token
async function getUserFromToken(token: string): Promise<User | null> {
  const payload = await verifyAccessToken(token);
  if (!payload) {
    return null;
  }

  const user = await findUserById(payload.sub);
  return user;
}

// Get organization ID from API key
async function getOrgFromApiKey(apiKey: string): Promise<string | null> {
  return await verifyApiKey(apiKey);
}

// Main authentication function
export async function getUserFromRequest(
  req: VercelRequest
): Promise<{
  user?: User;
  organizationId?: string;
  authMethod?: 'jwt' | 'apikey';
} | null> {
  // Try cookie first (session auth)
  const cookieToken = getSessionToken(req.headers.cookie);
  if (cookieToken) {
    const user = await getUserFromToken(cookieToken);
    if (user) {
      return { user, authMethod: 'jwt' };
    }
  }

  // Try Authorization header
  const bearerToken = extractBearerToken(req.headers.authorization as string);
  if (bearerToken) {
    // Try as JWT first
    const user = await getUserFromToken(bearerToken);
    if (user) {
      return { user, authMethod: 'jwt' };
    }

    // Try as API key
    const organizationId = await getOrgFromApiKey(bearerToken);
    if (organizationId) {
      return { organizationId, authMethod: 'apikey' };
    }
  }

  return null;
}

// Require authentication (throws if not authenticated)
export async function requireAuth(req: VercelRequest): Promise<User> {
  const auth = await getUserFromRequest(req);
  
  if (!auth || !auth.user) {
    throw new UnauthorizedError('Authentication required');
  }

  return auth.user;
}

// Require API key authentication
export async function requireApiKey(req: VercelRequest): Promise<string> {
  const auth = await getUserFromRequest(req);
  
  if (!auth || !auth.organizationId || auth.authMethod !== 'apikey') {
    throw new UnauthorizedError('Valid API key required');
  }

  return auth.organizationId;
}
