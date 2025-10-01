import { useState, useEffect, useCallback } from 'react';
import { IProjectIdea } from '../types';
import { projectIdeasApi } from '../services/projectIdeasApi';

interface IUseProjectIdeasReturn {
  ideas: IProjectIdea[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProjectIdeas = (): IUseProjectIdeasReturn => {
  const [ideas, setIdeas] = useState<IProjectIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIdeas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await projectIdeasApi.getAllIdeas();
      
      setIdeas(data);
    } catch (err) {
      setError('Ошибка загрузки идей проекта');
      
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  return {
    ideas,
    loading,
    error,
    refetch: fetchIdeas
  };
};
