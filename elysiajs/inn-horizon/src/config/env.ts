export const ENV = {
  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-this-in-production',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '30d',

  // Bcrypt
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || '10'),

  // File Upload
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',

  // Email (for future email verification)
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@innhorizon.com',

  // Frontend URL (for email links)
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Midtrans
  MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY || '',
  MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY || '',
  MIDTRANS_IS_PRODUCTION: process.env.MIDTRANS_IS_PRODUCTION === 'true',

  // Platform
  PLATFORM_FEE_PERCENTAGE: parseFloat(process.env.PLATFORM_FEE_PERCENTAGE || '10'),
  DEFAULT_CANCELLATION_HOURS: parseInt(process.env.DEFAULT_CANCELLATION_HOURS || '24'),
} as const;

// Validate required environment variables
export function validateEnv() {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
  ];

  const missing = required.filter(key => !process.env[key as keyof typeof process.env]);

  if (missing.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missing.join(', ')}`);
    console.warn('⚠️  Using default values for development');
  }
}
