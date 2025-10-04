import { PrismaClient } from '@prisma/client';
import { IProjectIdea } from '../types';

const prisma = new PrismaClient();

export class ProjectIdeaService {
  /**
   * Получает идею по ID
   */
  async getIdeaById(projectIdeaId: string): Promise<IProjectIdea | null> {
    try {
      return await prisma.projectIdea.findUnique({
        where: { id: projectIdeaId }
      });
    } catch (error) {
      console.error('Ошибка при получении идеи по ID:', error);
      
      throw error;
    }
  }
}
