// Vyxlo Token Refresh Endpoint
// POST /api/v1/auth/refresh

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { successResponse, handleError } from '../../../src/server/utils/errors';
import { serializeSessionCookie } from '../../../src/server/utils/cookie';
import { requireAuth } from '../../../src/server/middleware/auth';
import { createAccessToken } from '../../../src/server/services/auth';

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
    // Require authentication (validates existing token)
    const user = await requireAuth(req);

    // Create new access token
    const accessToken = await createAccessToken(user);

    // Set new HttpOnly cookie
    const cookie = serializeSessionCookie(accessToken, 60 * 15); // 15 minutes
    res.setHeader('Set-Cookie', cookie);

    // Return response
    const response = successResponse({
      accessToken,
    });

    res.status(200).json(response);
  } catch (error) {
    const { response, statusCode } = handleError(error);
    res.status(statusCode).json(response);
  }
}
