export interface IUser {
  id: string;
  user_ip: string;
  countVotes: number;
}

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
