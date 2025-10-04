import { PrismaClient } from '@prisma/client';
import { IVote } from '../types';
import { ProjectIdeaService } from './projectIdeaService';
import { createErrors } from '../utils/errors';

const prisma = new PrismaClient();

export class VoteService {
  private readonly projectIdeaService = new ProjectIdeaService();

  /**
   * Голосование за идею
   */
  async voteForIdea(userId: string, projectIdeaId: string): Promise<IVote> {
    try {
      const existingVote = await prisma.vote.findUnique({
        where: {
          userId_projectIdeaId: {
            userId,
            projectIdeaId
          }
        }
      });

      if (existingVote) {
        throw createErrors.alreadyVoted();
      }

      const idea = await this.projectIdeaService.getIdeaById(projectIdeaId);

      if (!idea) {
        throw createErrors.ideaNotFound();
      }

      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw createErrors.internal('User registration failed');
      }

      if (user.countVotes >= 10) {
        throw createErrors.voteLimit();
      }

      return await prisma.$transaction(async (tx) => {
        const newVote = await tx.vote.create({
          data: { userId, projectIdeaId }
        });

        await tx.user.update({
          where: { id: userId },
          data: { countVotes: { increment: 1 } }
        });

        await tx.projectIdea.update({
          where: { id: projectIdeaId },
          data: { votes: { increment: 1 } }
        });

        console.log(`Пользователь ${userId} проголосовал за идею ${projectIdeaId}`);
        
        return newVote;
      });
    } catch (error) {
      throw error;
    }
  }
}
