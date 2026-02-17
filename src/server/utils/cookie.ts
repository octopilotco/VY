// Vyxlo Cookie Utilities
// HttpOnly session cookie management

import { serialize, parse } from 'cookie';

const COOKIE_NAME = 'vyxlo_session';

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
}

// Serialize session cookie
export function serializeSessionCookie(
  token: string,
  maxAge: number = 60 * 15 // 15 minutes default
): string {
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  };

  return serialize(COOKIE_NAME, token, options);
}

// Clear session cookie
export function clearSessionCookie(): string {
  return serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

// Parse cookies from request header
export function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }
  return parse(cookieHeader);
}

// Get session token from cookies
export function getSessionToken(cookieHeader: string | undefined): string | null {
  const cookies = parseCookies(cookieHeader);
  return cookies[COOKIE_NAME] || null;
}
