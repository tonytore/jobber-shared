import { StatusCodes } from 'http-status-codes'


export interface IErrorResponse {
    statusCode: number
    message: string
    status: string
    comingFrom?: string
    stack?: string;
    metadata?: unknown;
    serializeErrors(): IError[]
}

export interface IError {
    statusCode: number
    message: string
    status: string
    comingFrom: string | undefined
    stack?: string;
    metadata?: unknown;
}

export abstract class CustomError extends Error {
    abstract statusCode: number
    abstract status: string
    comingFrom?: string
    metadata?: unknown;

    constructor(message: string, comingFrom?: string, metadate?: unknown) {
        super(message)
        this.comingFrom = comingFrom
        this.metadata = metadate
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this, this.constructor)
    }
    serializeErrors(): IError {
        return {
            statusCode: this.statusCode,
            message: this.message,
            status: this.status,
            comingFrom: this.comingFrom,
            stack: this.stack,
            metadata: this.metadata
        }
    }
}


export class BadRequestError extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST
    status = 'error'
    constructor(message: string, comingFrom?: string, metadata?: unknown) {
        super(message, comingFrom, metadata)
    }
}


export class NotFoundError extends CustomError {
    statusCode = StatusCodes.NOT_FOUND
    status = 'error'
    constructor(message: string, comingFrom?: string, metadata?: unknown) {
        super(message, comingFrom, metadata)
    }
}


export class NotAuthorizedError extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED
    status = 'error'
    constructor(message: string, comingFrom?: string, metadata?: unknown) {
        super(message, comingFrom, metadata)
    }
}

export class ForbiddenError extends CustomError {
  statusCode = StatusCodes.FORBIDDEN;
  status = 'error';

  constructor(message: string, comingFrom: string, metadata?: unknown) {
    super(message, comingFrom, metadata);
  }
}

export class FileTooLargeError extends CustomError {
    statusCode = StatusCodes.REQUEST_TOO_LONG
    status = 'error'
    constructor(message: string, comingFrom?: string, metadata?: unknown) {
        super(message, comingFrom, metadata)
    }
}

export class ServerError extends CustomError {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    status = 'error'
    constructor(message: string, comingFrom?: string, metadata?: unknown) {
        super(message, comingFrom, metadata)
    }
}


export interface ErrnoException {
    errno?: number
    code?: string
    syscall?: string
    path?: string
    stack?: string
}