// Vyxlo Health Check Endpoint
// GET /api/v1/health

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { successResponse, handleError } from '../../src/server/utils/errors';
import { query } from '../../src/server/db/client';

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
    // Check database connectivity
    await query('SELECT 1');

    const response = successResponse({
      status: 'ok',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });

    res.status(200).json(response);
  } catch (error) {
    const { response, statusCode } = handleError(error);
    res.status(statusCode).json(response);
  }
}
