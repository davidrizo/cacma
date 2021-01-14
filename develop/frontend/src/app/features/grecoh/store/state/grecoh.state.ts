import {APIRestServerError} from '../../../../core/model/restapi/apirest-server-error';
import {Painting} from '../../model/painting';
import {PaintingVersion} from '../../model/painting-version';
import {PaintingStatistics} from '../../model/painting-statistics';
import {PaintingVersionScore} from '../../model/painting-version-score';
import {Collaborator} from '../../model/collaborator';
import {Question} from '../../model/question';

export const EMPTY_COLLABORATOR_ID = -1;

export interface GrecohState {
  paintings: Painting[];
  selectedPainting: Painting;
  paintingVersions: PaintingVersion[];
  apiRestServerError: APIRestServerError;
  paintingStatistics: PaintingStatistics[];
  paintingVersionScores: PaintingVersionScore[];
  collaborators: Collaborator[];
  selectedCollaboratorID: number;
  questions: Question[];
  postScoresResult: APIRestServerError;
  currentLevel: number;
}

export const initialSemanticRepresentationState: GrecohState = {
  paintings: null,
  apiRestServerError: null,
  selectedPainting: null,
  paintingVersions: null,
  paintingStatistics: null,
  postScoresResult: null,
  paintingVersionScores: null,
  collaborators: null,
  selectedCollaboratorID: -1,
  questions: null,
  currentLevel: 1
};

export function getInitialState(): GrecohState {
  return initialSemanticRepresentationState;
}


