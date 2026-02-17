// Vyxlo Logout Endpoint
// POST /api/v1/auth/logout

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { successResponse, handleError } from '../../../src/server/utils/errors';
import { clearSessionCookie } from '../../../src/server/utils/cookie';
import { requireAuth } from '../../../src/server/middleware/auth';
import { revokeAllUserSessions, logAudit } from '../../../src/server/services/auth';

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
    // Require authentication
    const user = await requireAuth(req);

    // Revoke all user sessions
    await revokeAllUserSessions(user.id);

    // Clear cookie
    const cookie = clearSessionCookie();
    res.setHeader('Set-Cookie', cookie);

    // Audit log
    await logAudit('user.logout', user.id);

    // Return response
    const response = successResponse({
      message: 'Logged out successfully',
    });

    res.status(200).json(response);
  } catch (error) {
    const { response, statusCode } = handleError(error);
    res.status(statusCode).json(response);
  }
}
