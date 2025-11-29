export class AppError extends Error {
  status: number;
  isOperational: boolean;

  constructor(message: string, status: number = 500, isOperational: boolean = true) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "You don't have permission to access this resource") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Too many requests") {
    super(message, 429);
  }
}
