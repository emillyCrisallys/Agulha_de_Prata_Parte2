import { NextFunction, Request, Response } from "express";
import { verifyToken } from '../utils/jwt'

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401)
            .json({error: 'Access denied. No token'})
    }

    try {
        const decoded: any = verifyToken(token);
        req.body.user = decoded;
        next()
    } catch (error) {
        return res.status(401)
            .json({msg: 'Access denied. Invalid token' + error})
    }

}