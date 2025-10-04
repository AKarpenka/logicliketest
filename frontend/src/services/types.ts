import { IProjectIdeaWithVoteStatus } from "@/types";

export interface IIdeasWithVoteStatusResponse {
    ideas: IProjectIdeaWithVoteStatus[];
    userId: string;
    userVoteCount: number;
}