import {APIRestServerError} from '../../../../core/model/restapi/apirest-server-error';
import {Painting} from '../../model/painting';
import {PaintingVersion} from '../../model/painting-version';
import {PaintingStatistics} from '../../model/painting-statistics';
import {PaintingVersionScore} from '../../model/painting-version-score';
import {Collaborator} from '../../model/collaborator';
import {Experiment} from '../../model/experiment';
import {Level} from '../../model/level';
import {ExperimentLevelUserQuestionAnswer} from '../../model/experiment-level-user_questions';

export const EMPTY_COLLABORATOR_ID = -1;

export interface GrecohState {
  currentExperiment: Experiment;
  paintings: Painting[];
  selectedPainting: Painting;
  paintingVersions: PaintingVersion[];
  apiRestServerError: APIRestServerError;
  paintingStatistics: PaintingStatistics[];
  paintingVersionScores: PaintingVersionScore[];
  collaborators: Collaborator[];
  selectedCollaboratorID: number;
  postScoresResult: APIRestServerError;
  currentLevelIndex: number;
  currentLevel: Level;
  levels: Level[];
  levelsCompleted: boolean;
  allLevelPaintingsScored: boolean;
  questionsUserAnswers: ExperimentLevelUserQuestionAnswer[];
  postExperimentLevelUserCommentsResult: APIRestServerError;
}

export const initialSemanticRepresentationState: GrecohState = {
  currentExperiment: null,
  paintings: null,
  apiRestServerError: null,
  selectedPainting: null,
  paintingVersions: null,
  paintingStatistics: null,
  postScoresResult: null,
  paintingVersionScores: null,
  collaborators: null,
  selectedCollaboratorID: -1,
  currentLevelIndex: null,
  currentLevel: null,
  levels: null,
  levelsCompleted: false,
  allLevelPaintingsScored: null,
  questionsUserAnswers: null,
  postExperimentLevelUserCommentsResult: null
};

export function getInitialState(): GrecohState {
  return initialSemanticRepresentationState;
}


