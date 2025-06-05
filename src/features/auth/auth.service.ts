import { Card, Permission } from '../../../generated/prisma';
import { envService } from '../../constants/appConstants';
import { UnauthorizedError } from '../../errors/AppError';
import { JWTPayload } from '../../types';
import { userRepository } from '../user/user.repository';
import { userService } from '../user/user.service';
import jwt from 'jsonwebtoken';

class AuthService {
  async login({email, password}:{email: string, password: string}){
    const user = await userRepository.findByEmail(email)
    const isPasswordMatched = password === '123';
    if(!user || !isPasswordMatched){
      throw new UnauthorizedError("Invalid credential")
    }
    const payload :JWTPayload = {
      userUUID: user.uuid
    }
    const token = jwt.sign(payload, envService.JWT.SECRET, {
      expiresIn: '3h'
    })
    return token
  }
}
export const authService = new AuthService(); 