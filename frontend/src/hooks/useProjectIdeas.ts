import { useState, useEffect, useCallback } from 'react';
import { projectIdeasApi, RequestAbortedError } from '../services/projectIdeasApi';
import { IProjectIdeaWithVoteStatus } from '../types';

export interface IUseProjectIdeasReturn {
  ideas: IProjectIdeaWithVoteStatus[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateIdeaVotes: (ideaId: string) => void;
  userVoteCount: number;
}

/**
 * Хук для работы с проектными идеями
 */
export const useProjectIdeas = (): IUseProjectIdeasReturn => {
  const [ideas, setIdeas] = useState<IProjectIdeaWithVoteStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVoteCount, setUserVoteCount] = useState<number>(0);

  const getIdeas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // возможность отмены запроса
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const data = await projectIdeasApi.getAllIdeasWithVoteStatus(controller.signal);

      clearTimeout(timeoutId);
      setIdeas(data.ideas);
      setUserVoteCount(data.userVoteCount);
    } catch (err) {
      if (err instanceof RequestAbortedError) {
        setError('Превышено время ожидания загрузки');
      } else {
        setError('Ошибка загрузки идей проекта');
      }

      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);


  const updateIdeaVotes = useCallback((ideaId: string) => {
    setIdeas(prevIdeas => {
      const ideaIndex = prevIdeas.findIndex(idea => idea.id === ideaId);
      
      if (ideaIndex === -1) {
        return prevIdeas;
      }

      const newIdeas = [...prevIdeas];
      newIdeas[ideaIndex] = {
        ...newIdeas[ideaIndex],
        votes: newIdeas[ideaIndex].votes + 1,
        hasVoted: true
      };

      return newIdeas;
    });

    setUserVoteCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    getIdeas();
  }, [getIdeas]);

  return {
    ideas,
    loading,
    error,
    refetch: getIdeas,
    updateIdeaVotes,
    userVoteCount
  };
};
