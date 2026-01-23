import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from './index';


const tokens: string[] = [
    'auth', 'seller', 'gig', 'search', 'buyer', "message", 'order', 'review'
]

export function verifyGatewayRequest(req: Request, res: Response, next: NextFunction) {
    if (!req.headers?.gatewayToken) {
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway')
    }

    const token: string = req.headers.gatewayToken as string;
    if (!token) {
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway')
    }

    try {
        const payload: { id: string; iat: number } = jwt.verify(token, '') as { id: string; iat: number }
        if (!tokens.includes(payload.id)) {
            throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway')
        }
    } catch (error) {
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway')
    }
}