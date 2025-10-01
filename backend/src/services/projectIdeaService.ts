import { PrismaClient } from '@prisma/client';
import { IProjectIdea } from '../types';

const prisma = new PrismaClient();

export class ProjectIdeaService {
  async getAllIdeas(): Promise<IProjectIdea[]> {
    return await prisma.projectIdea.findMany({
      orderBy: { votes: 'desc' }
    });
  }
}
