import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../errors/AppError";
import jwt from 'jsonwebtoken';
import { envService } from "../constants/appConstants";
import { userService } from "../features/user/user.service";
import { JWTPayload } from "../types";
export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization') || req.cookies.accessToken
       
        if (!authHeader) {
            throw new UnauthorizedError()
        }
        const token = authHeader.replace('Bearer ', '')
        const decodedPayload: JWTPayload = jwt.verify(token, envService.JWT.SECRET) as JWTPayload

        const user = await userService.getUserByUUID(decodedPayload.userUUID)
        if (!user) {
            throw new BadRequestError("Không tìm thấy người dùng")
        }
        req.user = user
        next()
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            throw new UnauthorizedError("Token hết hạn")
        }
        throw new BadRequestError("Token không hợp lệ")
    }
}