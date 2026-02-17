// Vyxlo Registration Endpoint
// POST /api/v1/auth/register

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { successResponse, handleError, ValidationError } from '../../../src/server/utils/errors';
import { validateBody, registerSchema } from '../../../src/server/utils/validators';
import { serializeSessionCookie } from '../../../src/server/utils/cookie';
import { registerUser, createSession, createAccessToken, findUserByEmail } from '../../../src/server/services/auth';
import { userToDTO, organizationToDTO } from '../../../src/types/models';

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
    const body = await validateBody(registerSchema, req.body);

    // Check if user already exists
    const existingUser = await findUserByEmail(body.email);
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    // Register user (creates user + org + API key)
    const { user, organization, apiKeySecret } = await registerUser(
      body.email,
      body.password,
      body.name,
      body.orgName
    );

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

    // Return response
    const response = successResponse({
      user: userToDTO(user),
      organization: organizationToDTO(organization),
      apiKeySecret, // IMPORTANT: Only shown once
      sessionId: session.id,
    });

    res.status(201).json(response);
  } catch (error) {
    const { response, statusCode } = handleError(error);
    res.status(statusCode).json(response);
  }
}
