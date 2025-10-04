import { API_BASE_URL } from './constants';
import { IIdeasWithVoteStatusResponse } from './types';
import { IVoteResponse } from '../types';

export class RequestAbortedError extends Error {
  readonly name = 'RequestAbortedError';
  
  constructor(message: string = 'Request was aborted') {
    super(message);

    this.name = 'RequestAbortedError';
  }
}

export class ApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  
  constructor(message: string, status: number, statusText?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText || '';
  }
}

export const projectIdeasApi = {
  /**
   * Получает все идеи со статусом голосования для пользователя
   */
  async getAllIdeasWithVoteStatus(signal?: AbortSignal): Promise<IIdeasWithVoteStatusResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/project-ideas/with-vote-status`, {
        signal
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project ideas with vote status');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new RequestAbortedError();
      }

      console.error('Error fetching project ideas with vote status:', error);

      throw error;
    }
  },

  /**
   * Голосует за идею
   */
  async voteForIdea(ideaId: string): Promise<IVoteResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(`${API_BASE_URL}/project-ideas/${ideaId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        
        // Создаем ошибку с информацией о статусе и коде
        const apiError = new ApiError(
          errorData.error || 'Failed to vote',
          response.status,
          response.statusText
        );
        
        // Добавляем код ошибки если он есть
        if (errorData.code) {
          (apiError as ApiError & { code?: string }).code = errorData.code;
        }
        
        throw apiError;
      }

      return await response.json();
    } catch (error) {
      console.error('Error voting for idea:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new RequestAbortedError('Превышено время ожидания голосования');
      }
      
      throw error;
    }
  }
};
