import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from './error-handler';


const token: string[] = [
    'auth', 'seller' , 'gig', 'search','buyer', "message", 'order', 'review'
]

export function verifyGatewayRequest(req:Request,res:Response,next:NextFunction){
    if(!req.headers?.gatewayToken){
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway')
    }

    const token: string = req.headers.gatewayToken as string

    try {
        const payload: { id: string; iat: number} = jwt.verify(token, 'secret' as string) as { id: string; iat: number}
        if(!token.includes(payload.id)){
            throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway')
        }
        next()
    } catch (error) {
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway')
    }
}