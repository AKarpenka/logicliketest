/**
 * Кастомные классы ошибок для типизированной обработки
 */

export enum ErrorCode {
  USER_ALREADY_VOTED = 'USER_ALREADY_VOTED',
  IDEA_NOT_FOUND = 'IDEA_NOT_FOUND',
  VOTE_LIMIT_REACHED = 'VOTE_LIMIT_REACHED',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;

  constructor(message: string, code: ErrorCode, statusCode: number) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class TUserAlreadyVotedError extends AppError {
  constructor() {
    super('User has already voted for this idea', ErrorCode.USER_ALREADY_VOTED, 409);
  }
}

export class TIdeaNotFoundError extends AppError {
  constructor() {
    super('Project idea not found', ErrorCode.IDEA_NOT_FOUND, 404);
  }
}

export class TVoteLimitReachedError extends AppError {
  constructor() {
    super('User has reached vote limit (10 votes)', ErrorCode.VOTE_LIMIT_REACHED, 409);
  }
}

/**
 * Helper функция для создания типизированных ошибок
 */
export const createErrors = {
  alreadyVoted: () => new TUserAlreadyVotedError(),
  ideaNotFound: () => new TIdeaNotFoundError(),
  voteLimit: () => new TVoteLimitReachedError(),
  internal: (message = 'Internal server error') => 
    new AppError(message, ErrorCode.INTERNAL_ERROR, 500)
};
