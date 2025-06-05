import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { success } from '../../utils/response';
import { CreateUserSchema, GetUserSchema } from './user.schema';
import { Role } from '../../../generated/prisma';

class UserController {
  getAllUsers = async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.json(success(users, 'Fetched users successfully'));
  };
  getUserProfile = async (req: Request, res: Response) => {
    const user = req.user
    res.json(success(user, 'Fetched user successfully'));
  }
  createNewUser = async (req: Request<any, any, CreateUserSchema>, res: Response) => {
    const { email, name, role } = req.body
    const user = await userService.createNewUser({ email, name, role: role as Role });
    res.json(success(user, 'Fetched user successfully'));
  }
}
export const userController = new UserController(); 