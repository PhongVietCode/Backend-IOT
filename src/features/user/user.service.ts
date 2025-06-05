import { Role } from '../../../generated/prisma';
import { BadRequestError } from '../../errors/AppError';
import { userRepository } from './user.repository';

class UserService {
  async getAllUsers() {
    return userRepository.findAll();
  }
  async getUserByEmail(email: string) {
    return userRepository.findByEmail(email)
  }
  async getUserByUUID(uuid: string) {
    return userRepository.findByUUID(uuid)
  }
  async createNewUser({ email, role, name }: { email: string, role: Role, name: string }) {
    const exisitingUser = await userRepository.findByEmail(email);
    if(exisitingUser){
      throw new BadRequestError("User email has been registered")
    }
    return userRepository.createNewUser({ email, role, name })
  }
}
export const userService = new UserService(); 