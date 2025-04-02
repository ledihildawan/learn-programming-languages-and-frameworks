export const ERROR = {
  INVALID_TOKEN: {
    status: 'error',
    message: 'The verification link is invalid or has expired. Please request a new one.',
  },
  EMAIL_NOT_FOUND: {
    status: 'error',
    message: 'This email is not registered. Please sign up first.',
  },
  EMAIL_ALREADY_VERIFIED: {
    status: 'error',
    message: 'This email has already been verified. You can now log in.',
  },
  EMAIL_NOT_VERIFIED: {
    status: 'error',
    message: 'Your email is not verified. Please check your inbox to verify your email.',
  },
  EMAIL_ALREADY_REGISTERED: {
    status: 'error',
    message: 'This email is already registered. Please sign in or use a different email to sign up.',
  },
  INVALID_SESSION: {
    status: 'error',
    message: 'Your session has expired. Please log in again.',
  },
  NO_SESSION: {
    status: 'error',
    message: 'You are not logged in. Please log in first before signing out.',
  },
};

export const INFO = {
  EMAIL_ALREADY_VERIFIED: {
    status: 'info',
    message: 'Your email is already verified. You can log in directly.',
  },
  EMAIL_ALREADY_SIGNED_IN: {
    status: 'info',
    message: 'You are already signed in.',
  },
  MAGIC_LINK_SENT: {
    status: 'info',
    message: 'A magic link has been sent to your email. Please check your inbox to log in.',
  },
  EMAIL_ALREADY_SIGNED_UP: {
    status: 'info',
    message: "You are already signed up and logged in. You don't need to sign up again.",
  },
};

export const SUCCESS = {
  SIGNUP: {
    status: 'success',
    message: 'Sign up successful! Please check your email to verify your account.',
  },
  SIGNIN: {
    status: 'success',
    message: 'Sign in successful! A magic link has been sent to your email.',
  },
  EMAIL_VERIFIED: {
    status: 'success',
    message: 'Your email has been verified. You are now logged in.',
  },
  SIGNOUT: {
    status: 'success',
    message: 'You have successfully signed out.',
  },
};
