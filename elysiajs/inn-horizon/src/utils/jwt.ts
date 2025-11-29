import { ENV } from '../config/env';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Generate access token (short-lived)
 */
export function generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const expiresIn = parseExpiry(ENV.JWT_EXPIRES_IN);

  const jwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn,
  };

  return createJWT(header, jwtPayload, ENV.JWT_SECRET);
}

/**
 * Generate refresh token (long-lived)
 */
export function generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const expiresIn = parseExpiry(ENV.JWT_REFRESH_EXPIRES_IN);

  const jwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn,
  };

  return createJWT(header, jwtPayload, ENV.JWT_REFRESH_SECRET);
}

/**
 * Generate both access and refresh tokens
 */
export function generateTokenPair(payload: Omit<JWTPayload, 'iat' | 'exp'>): TokenPair {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): JWTPayload | null {
  return verifyJWT(token, ENV.JWT_SECRET);
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): JWTPayload | null {
  return verifyJWT(token, ENV.JWT_REFRESH_SECRET);
}

/**
 * Parse expiry string to seconds
 * Examples: '7d' -> 604800, '1h' -> 3600, '30m' -> 1800
 */
function parseExpiry(expiry: string): number {
  const unit = expiry.slice(-1);
  const value = parseInt(expiry.slice(0, -1));

  switch (unit) {
    case 'd': return value * 24 * 60 * 60; // days
    case 'h': return value * 60 * 60;      // hours
    case 'm': return value * 60;           // minutes
    case 's': return value;                // seconds
    default: return 7 * 24 * 60 * 60;      // default 7 days
  }
}

/**
 * Base64URL encode
 */
function base64URLEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Base64URL decode
 */
function base64URLDecode(str: string): string {
  // Add padding if needed
  const padding = '='.repeat((4 - (str.length % 4)) % 4);
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/') + padding;
  return Buffer.from(base64, 'base64').toString('utf-8');
}

/**
 * Create HMAC SHA256 signature
 */
async function createSignature(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(data);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, messageData);
  return Buffer.from(signature).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Create JWT token
 */
function createJWT(header: object, payload: object, secret: string): string {
  const headerEncoded = base64URLEncode(JSON.stringify(header));
  const payloadEncoded = base64URLEncode(JSON.stringify(payload));
  const data = `${headerEncoded}.${payloadEncoded}`;

  // For synchronous operation, use simple HMAC
  const crypto = require('crypto');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `${data}.${signature}`;
}

/**
 * Verify JWT token
 */
function verifyJWT(token: string, secret: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const [headerEncoded, payloadEncoded, signature] = parts;
    const data = `${headerEncoded}.${payloadEncoded}`;

    // Verify signature
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    if (signature !== expectedSignature) {
      return null;
    }

    // Decode payload
    const payload = JSON.parse(base64URLDecode(payloadEncoded)) as JWTPayload;

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Decode JWT without verification (useful for debugging)
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payloadEncoded = parts[1];
    return JSON.parse(base64URLDecode(payloadEncoded)) as JWTPayload;
  } catch (error) {
    return null;
  }
}
