import { IProjectIdea } from '../types';
import { API_BASE_URL } from './constants';

export const projectIdeasApi = {
  async getAllIdeas(): Promise<IProjectIdea[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/project-ideas`);

      if (!response.ok) {
        throw new Error('Failed to fetch project ideas');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching project ideas:', error);
      
      throw error;
    }
  }
};
