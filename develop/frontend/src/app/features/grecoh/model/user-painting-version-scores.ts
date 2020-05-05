import {PaintingVersionScore} from './painting-version-score';

export interface UserPaintingVersionScores {
  email: string;
  painting_id: number;
  scores: PaintingVersionScore[];
}
