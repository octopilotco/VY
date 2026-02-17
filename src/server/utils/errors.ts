// Vyxlo Error Utilities
// Standard error types and handlers for API responses

export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super('validation_error', message, 400);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super('unauthorized', message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super('forbidden', message, 403);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super('not_found', message, 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super('rate_limit_exceeded', message, 429);
    this.name = 'RateLimitError';
  }
}

// Standard API response format
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// Create success response
export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
  };
}

// Create error response
export function errorResponse(
  code: string,
  message: string
): ApiResponse {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
}

// Handle error and return appropriate response
export function handleError(error: unknown): {
  response: ApiResponse;
  statusCode: number;
} {
  // Known AppError
  if (error instanceof AppError) {
    return {
      response: errorResponse(error.code, error.message),
      statusCode: error.statusCode,
    };
  }

  // Unknown error
  console.error('[Unhandled Error]', error);
  return {
    response: errorResponse(
      'internal_error',
      'An unexpected error occurred'
    ),
    statusCode: 500,
  };
}
