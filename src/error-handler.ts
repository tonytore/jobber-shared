import { StatusCodes } from 'http-status-codes'


export interface IErrorResponse {
    statusCode: number
    message: string
    status: string
    comingFrom?: string
    serializeErrors(): IError[]
}

export interface IError {
    statusCode: number
    message: string
    status: string
    comingFrom: string | undefined
}

export abstract class CustomError extends Error {
    abstract statusCode: number
    abstract status: string
    comingFrom?: string
    constructor(message: string, comingFrom?: string) {
        super(message)
        this.comingFrom = comingFrom 
    }
    serializeErrors(): IError {
        return {
            statusCode: this.statusCode,
            message: this.message,
            status: this.status,
            comingFrom: this.comingFrom
        }
    }
}


export class BadRequestError extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST
    status = 'error'
    constructor(message: string, comingFrom?: string) {
        super(message, comingFrom)
    }
}


export class NotFoundError extends CustomError {
    statusCode = StatusCodes.NOT_FOUND
    status = 'error'
    constructor(message: string, comingFrom?: string) {
        super(message, comingFrom)
    }
}


export class NotAuthorizedError extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED
    status = 'error'
    constructor(message: string, comingFrom?: string) {
        super(message, comingFrom)
    }
}

export class FileTooLargeError extends CustomError {
    statusCode = StatusCodes.REQUEST_TOO_LONG 
    status = 'error'
    constructor(message: string, comingFrom?: string) {
        super(message, comingFrom)
    }
}

export class ServerError extends CustomError {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    status = 'error'
    constructor(message: string, comingFrom?: string) {
        super(message, comingFrom)
    }
}


export interface ErrnoException {
    errno?: number
    code?: string
    syscall?: string
    path?: string
    stack?: string
}