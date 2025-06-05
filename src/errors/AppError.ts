import { HTTP_STATUS } from '../constants/httpStatus';

export class AppError extends Error {
  code: number;
  constructor(message: string, code: number = HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Bad request') {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
} 
export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
} 
export class UnauthorizedError extends AppError{
  constructor(message= 'Unauthorized'){
    super(message, HTTP_STATUS.UNAUTHORIZED)
  }
}