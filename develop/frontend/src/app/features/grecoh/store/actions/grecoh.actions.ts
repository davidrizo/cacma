import {Action} from '@ngrx/store';
import {APIRestServerError} from '../../../../core/model/restapi/apirest-server-error';
import {Painting} from '../../model/painting';
import {PaintingVersion} from '../../model/painting-version';
import {UserPaintingVersionScores} from '../../model/user-painting-version-scores';
import {PaintingStatistics} from '../../model/painting-statistics';
import {PaintingVersionScore} from '../../model/painting-version-score';
import {Collaborator} from '../../model/collaborator';
import {Experiment} from '../../model/experiment';
import {Level} from '../../model/level';
import {ExperimentLevelUserQuestionAnswer} from '../../model/experiment-level-user_questions';

export enum GrecohActionTypes {
  ResetGrecohServerError = '[Grecoh] Server error reset',
  GrecohServerError = '[Grecoh] Server error',
  GetPaintings = '[Grecoh] Get paintings',
  GetPaintingsSuccess = '[Grecoh] Get paintings success',
  GetPainting = '[Grecoh] Get painting',
  GetPaintingSuccess = '[Grecoh] Get painting success',
  GetPaintingVersions = '[Grecoh] Get painting versions',
  GetPaintingVersionsSuccess = '[Grecoh] Get painting versions success',
  PostPaintingVersionsScores = '[Grecoh] Post painting version scores',
  PostPaintingVersionsScoresSuccess = '[Grecoh] Post painting version scores success',
  GetPaintingStatistics = '[Grecoh] Get painting statistics',
  GetPaintingStatisticsSuccess = '[Grecoh] Get painting statistics success',
  GetPaintingVersionScores = '[Grecoh] Get painting version scores',
  GetPaintingVersionScoresSuccess = '[Grecoh] Get painting version scores success',
  GetCollaborators = '[Grecoh] Get collaborators',
  GetCollaboratorsSuccess = '[Grecoh] Get collaborators success',
  SelectCollaborator = '[Grecoh] Select collaborator',
  GetLevels = '[Grecoh] Get levels',
  GetLevelsSuccess = '[Grecoh] Get levels success',
  FirstLevel = '[Grecoh] First level',
  PreviousLevel = '[Grecoh] Previous level',
  NextLevel = '[Grecoh] Next level',
  // ChangeLevelIndex = '[Grecoh] Change level',
  ResetScoreResults = '[Grecoh] Reset score results',
  // GetQuestions = '[Grecoh] Get questions',
  // GetQuestionsSuccess = '[Grecoh] Get questions success',
  GetExperiment = '[Grecoh] Get experiment',
  GetExperimentSuccess = '[Grecoh] Get experiment success',
  GetExperimentLevelUserQuestions = '[Grecoh] Get experiment level user',
  GetExperimentLevelUserQuestionsSuccess = '[Grecoh] Get experiment  level user success',
  PostExperimentLevelUserComment = '[Grecoh] Post experiment level user comment',
  PostExperimentLevelUserCommentSuccess = '[Grecoh] Post experiment level user comment success'
}

export class ResetGrecohServerError implements Action {
  public readonly type = GrecohActionTypes.ResetGrecohServerError;
  constructor() {}
}

export class GrecohServerError implements Action {
  public readonly type = GrecohActionTypes.GrecohServerError;
  constructor(public serverError: APIRestServerError) {}
}

export class GetPaintings implements Action {
  public readonly type = GrecohActionTypes.GetPaintings;
  constructor(public levelID: number, public email: string) {}
}

export class GetPaintingsSuccess implements Action {
  public readonly type = GrecohActionTypes.GetPaintingsSuccess;
  constructor(public paintings: Painting[]) {}
}

export class GetPainting implements Action {
  public readonly type = GrecohActionTypes.GetPainting;
  constructor(public id: number) {}
}

export class GetPaintingSuccess implements Action {
  public readonly type = GrecohActionTypes.GetPaintingSuccess;
  constructor(public painting: Painting) {}
}

export class ResetScoreResults implements Action {
  public readonly type = GrecohActionTypes.ResetScoreResults;
  constructor() {}
}


export class GetPaintingVersions implements Action {
  public readonly type = GrecohActionTypes.GetPaintingVersions;
  constructor(public paintingId: number) {}
}

export class GetPaintingVersionsSuccess implements Action {
  public readonly type = GrecohActionTypes.GetPaintingVersionsSuccess;
  constructor(public paintingVersions: PaintingVersion[]) {}
}

export class PostPaintingVersionsScores implements Action {
  public readonly type = GrecohActionTypes.PostPaintingVersionsScores;
  constructor(public userPaintingVersionScores: UserPaintingVersionScores) {}
}

export class PostPaintingVersionsScoresSuccess implements Action {
  public readonly type = GrecohActionTypes.PostPaintingVersionsScoresSuccess;
  constructor(public success: APIRestServerError) {}
}

export class GetPaintingStatistics implements Action {
  public readonly type = GrecohActionTypes.GetPaintingStatistics;
  constructor(public paintingID: number) {}
}

export class GetPaintingStatisticsSuccess implements Action {
  public readonly type = GrecohActionTypes.GetPaintingStatisticsSuccess;
  constructor(public paintingStatistics: PaintingStatistics[]) {}
}

export class GetPaintingVersionScores implements Action {
  public readonly type = GrecohActionTypes.GetPaintingVersionScores;
  constructor(public paintingVersionID: number) {}
}

export class GetPaintingVersionScoresSuccess implements Action {
  public readonly type = GrecohActionTypes.GetPaintingVersionScoresSuccess;
  constructor(public paintingVersionScores: PaintingVersionScore[]) {}
}

export class GetCollaborators implements Action {
  public readonly type = GrecohActionTypes.GetCollaborators;
  constructor() {}
}

export class GetCollaboratorsSuccess implements Action {
  public readonly type = GrecohActionTypes.GetCollaboratorsSuccess;
  constructor(public collaborators: Collaborator[]) {}
}

export class SelectCollaborator implements Action {
  public readonly type = GrecohActionTypes.SelectCollaborator;
  constructor(public collaboratorID: number) {}
}

export class GetExperiment implements Action {
  public readonly type = GrecohActionTypes.GetExperiment;
  constructor(public experimentID: number) {}
}

export class GetExperimentSuccess implements Action {
  public readonly type = GrecohActionTypes.GetExperimentSuccess;
  constructor(public experiment: Experiment) {}
}


export class GetExperimentLevelUserQuestions implements Action {
  public readonly type = GrecohActionTypes.GetExperimentLevelUserQuestions;
  constructor(public levelID: number, public email: string) {}
}

export class GetExperimentLevelUserQuestionsSuccess implements Action {
  public readonly type = GrecohActionTypes.GetExperimentLevelUserQuestionsSuccess;
  constructor(public answers: ExperimentLevelUserQuestionAnswer[]) {}
}


export class GetLevels implements Action {
  public readonly type = GrecohActionTypes.GetLevels;
  constructor(public experimentID: number) {}
}

export class GetLevelsSuccess implements Action {
  public readonly type = GrecohActionTypes.GetLevelsSuccess;
  constructor(public levels: Level[]) {}
}

/*export class ChangeLevelIndex implements Action {
  public readonly type = GrecohActionTypes.ChangeLevelIndex;
  constructor(public levelIndex: number) {}
}*/

export class FirstLevel implements Action {
  public readonly type = GrecohActionTypes.FirstLevel;
  constructor() {}
}

export class PreviousLevel implements Action {
  public readonly type = GrecohActionTypes.PreviousLevel;
  constructor() {}
}

export class NextLevel implements Action {
  public readonly type = GrecohActionTypes.NextLevel;
  constructor() {}
}

export class PostExperimentLevelUserComment implements Action {
  public readonly type = GrecohActionTypes.PostExperimentLevelUserComment;
  constructor(public answers: ExperimentLevelUserQuestionAnswer[]) {}
}

export class PostExperimentLevelUserCommentSuccess implements Action {
  public readonly type = GrecohActionTypes.PostExperimentLevelUserCommentSuccess;
  constructor(public success: APIRestServerError) {}
}

export type GrecohActions =
  GrecohServerError | ResetGrecohServerError |
  GetPaintings | GetPaintingsSuccess |
  GetPainting | GetPaintingSuccess |
  GetPaintingVersions | GetPaintingVersionsSuccess |
  PostPaintingVersionsScores | PostPaintingVersionsScoresSuccess |
  GetPaintingStatistics | GetPaintingStatisticsSuccess |
  GetPaintingVersionScores | GetPaintingVersionScoresSuccess | ResetScoreResults |
  GetCollaborators | GetCollaboratorsSuccess |
  SelectCollaborator |
  GetLevels | GetLevelsSuccess | FirstLevel | PreviousLevel | NextLevel | // ChangeLevelIndex |
  GetExperiment | GetExperimentSuccess |
  GetExperimentLevelUserQuestions | GetExperimentLevelUserQuestionsSuccess |
  PostExperimentLevelUserComment | PostExperimentLevelUserCommentSuccess
  ;


