import { Request, Response } from "express";
import { LoginSchema } from "./auth.schema";
import { authService } from "./auth.service";
import { success } from "../../utils/response";

class AuthController {
    login = async (req: Request<any, any, LoginSchema>, res: Response) => {
        const token = await authService.login(req.body);
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3 * 60 * 60 * 1000,
            sameSite: 'strict'
        })
        res.json(success(token, "Login successfully"))
    }
}
export const authController = new AuthController(); 
