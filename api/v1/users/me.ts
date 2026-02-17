// Vyxlo Get Current User Endpoint
// GET /api/v1/users/me

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { successResponse, handleError } from '../../../src/server/utils/errors';
import { requireAuth } from '../../../src/server/middleware/auth';
import { userToDTO } from '../../../src/types/models';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Require authentication
    const user = await requireAuth(req);

    // Return user data (without sensitive fields)
    const response = successResponse(userToDTO(user));

    res.status(200).json(response);
  } catch (error) {
    const { response, statusCode } = handleError(error);
    res.status(statusCode).json(response);
  }
}
