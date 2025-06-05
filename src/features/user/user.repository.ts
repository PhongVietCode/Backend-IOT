import { Role } from '../../../generated/prisma';
import { orm } from '../../utils/orm';

class UserRepository {
  async findAll() {
    return orm.user.findMany();
  }
  async findByEmail(email: string) {
    return orm.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findByUUID(uuid: string) {
    return orm.user.findUnique({
      where: {
        uuid,
      },
    });
  }
  async createNewUser({email, role, name}:{email: string, role: Role, name: string}) {
    return orm.user.create({
      data: {
        email,
        role,
        name,
      },
    });
  }
  
}
export const userRepository = new UserRepository(); 