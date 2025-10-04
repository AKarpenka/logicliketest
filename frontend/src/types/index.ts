export interface IProjectIdea {
  id: string;
  title: string;
  description: string;
  votes: number;
}

export interface IVote {
  id: string;
  userId: string;
  projectIdeaId: string;
}

export interface IProjectIdeaWithVoteStatus extends IProjectIdea {
  hasVoted: boolean;
}

///&&&&
export interface IVoteResponse {
  success: boolean;
  message: string;
  vote: IVote;
}

/**
 * Коды ошибок от API
 */
export enum ErrorCode {
  USER_ALREADY_VOTED = 'USER_ALREADY_VOTED',
  IDEA_NOT_FOUND = 'IDEA_NOT_FOUND',
  VOTE_LIMIT_REACHED = 'VOTE_LIMIT_REACHED',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}