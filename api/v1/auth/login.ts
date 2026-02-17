// Vyxlo Login Endpoint
// POST /api/v1/auth/login

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { successResponse, handleError, UnauthorizedError } from '../../../src/server/utils/errors';
import { validateBody, loginSchema } from '../../../src/server/utils/validators';
import { serializeSessionCookie } from '../../../src/server/utils/cookie';
import {
  verifyCredentials,
  createSession,
  createAccessToken,
  updateLastLogin,
  logAudit,
} from '../../../src/server/services/auth';
import { userToDTO } from '../../../src/types/models';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Validate input
    const body = await validateBody(loginSchema, req.body);

    // Verify credentials
    const user = await verifyCredentials(body.email, body.password);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new UnauthorizedError('Account is disabled');
    }

    // Update last login timestamp
    await updateLastLogin(user.id);

    // Create session
    const session = await createSession(
      user.id,
      req.headers['x-forwarded-for'] as string,
      req.headers['user-agent'] as string
    );

    // Create access token
    const accessToken = await createAccessToken(user);

    // Set HttpOnly cookie
    const cookie = serializeSessionCookie(accessToken, 60 * 15); // 15 minutes
    res.setHeader('Set-Cookie', cookie);

    // Audit log
    await logAudit('user.login', user.id, undefined, {
      email: user.email,
      ip: req.headers['x-forwarded-for'],
    });

    // Return response
    const response = successResponse({
      user: userToDTO(user),
      accessToken,
      sessionId: session.id,
    });

    res.status(200).json(response);
  } catch (error) {
    const { response, statusCode } = handleError(error);
    res.status(statusCode).json(response);
  }
}
