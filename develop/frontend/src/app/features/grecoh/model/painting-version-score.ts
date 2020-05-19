import {PaintingVersion} from './painting-version';

export interface PaintingVersionScore {
  paintingVersion?: PaintingVersion; // used in the interface greco-painting.component
  painting_version_id: number;
  value?: number;
  comments?: string;
  email?: string;
}
