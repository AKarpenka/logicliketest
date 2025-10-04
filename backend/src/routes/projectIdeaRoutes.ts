import { Router } from 'express';
import { VoteService } from '../services/voteService';
import { PrismaClient } from '@prisma/client';
import { createErrors } from '../utils/errors';

const prisma = new PrismaClient();

const router = Router();
const voteService = new VoteService();

/**
 * Получает идеи с информацией о голосовании
 */
router.get('/with-vote-status', async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw createErrors.internal('User registration failed');
    }

    const [ideas, userVotes] = await Promise.all([
      prisma.projectIdea.findMany({
        orderBy: { votes: 'desc' }
      }),
      prisma.vote.findMany({
        where: { userId: user.id },
        select: { projectIdeaId: true }
      })
    ]);

    const votedIdeaIds = new Set(userVotes.map(vote => vote.projectIdeaId));

    const ideasWithVoteStatus = ideas.map(idea => ({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      votes: idea.votes,
      hasVoted: votedIdeaIds.has(idea.id)
    }));

    const responseData = {
      ideas: ideasWithVoteStatus,
      userId: user.id,
      userVoteCount: user.countVotes
    };

    return res.json(responseData);
  } catch (error) {
    return next(error);
  }
});

/**
 * Голосует за идею
 */
router.post('/:id/vote', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      throw createErrors.internal('User registration failed');
    }

    const vote = await voteService.voteForIdea(user.id, id);

    return res.json({
      success: true,
      message: 'Vote recorded successfully',
      vote
    });
  } catch (error) {
    return next(error); // Передаем ошибку в errorHandler middleware
  }
});

export default router;
