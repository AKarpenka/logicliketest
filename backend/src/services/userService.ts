import { PrismaClient } from '@prisma/client';
import { IUser } from '../types';

const prisma = new PrismaClient();

export class UserService {
  /**
   * Создает или получает пользователя по IP
   */
  async createOrGetUser(encryptedIP: string): Promise<IUser> {
    try {
      let user = await prisma.user.findUnique({
        where: { user_ip: encryptedIP }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            user_ip: encryptedIP,
            countVotes: 0
          }
        });
      }

      return user;
    } catch (error) {
      console.error('Ошибка при создании/получении пользователя:', error);
      
      throw error;
    }
  }

}
