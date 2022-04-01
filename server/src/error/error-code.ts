type ErrorCode =
  | 'Unauthenticated'
  | 'Unauthorized'
  | 'InvalidArgument'
  | 'NotFound'
  | 'InternalError'
  | 'UnknownError';

export default ErrorCode;
