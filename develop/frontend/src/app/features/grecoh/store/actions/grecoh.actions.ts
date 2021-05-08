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
import {AnswerExperiment} from '../../model/payload/answer-experiment';

export enum GrecohActionTypes {
  ResetGrecohServerError = '[Grecoh] Server error reset',
  GrecohServerError = '[Grecoh] Server error',
  GetAllPaintings = '[Grecoh] Get all paintings',
  GetAllPaintingsSuccess = '[Grecoh] Get all paintings success',
  GetLevelPaintings = '[Grecoh] Get level paintings',
  GetLevelPaintingsSuccess = '[Grecoh] Get level paintings success',
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
  GetPaintingAllVersionsScores = '[Grecoh] Get all painting versions scores',
  GetPaintingAllVersionsScoresSuccess = '[Grecoh] Get all painting versions scores success',
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
  PostExperimentLevelUserCommentSuccess = '[Grecoh] Post experiment level user comment success',
  GetAnswersExperiment = '[Grecoh] Get answer experiment',
  GetAnswersExperimentSuccess = '[Grecoh] Get answer experiment success',
  ChangeAnswerCoherence = '[Grecoh] Change coherence',
  ChangeAnswerCoherenceSuccess = '[Grecoh] Change coherence success'
}

export class ResetGrecohServerError implements Action {
  public readonly type = GrecohActionTypes.ResetGrecohServerError;
  constructor() {}
}

export class GrecohServerError implements Action {
  public readonly type = GrecohActionTypes.GrecohServerError;
  constructor(public serverError: APIRestServerError) {}
}

export class GetLevelPaintings implements Action {
  public readonly type = GrecohActionTypes.GetLevelPaintings;
  constructor(public levelID: number, public email: string) {}
}

export class GetLevelPaintingsSuccess implements Action {
  public readonly type = GrecohActionTypes.GetLevelPaintingsSuccess;
  constructor(public paintings: Painting[]) {}
}

export class GetAllPaintings implements Action {
  public readonly type = GrecohActionTypes.GetAllPaintings;
  constructor() {}
}

export class GetAllPaintingsSuccess implements Action {
  public readonly type = GrecohActionTypes.GetAllPaintingsSuccess;
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


export class GetPaintingAllVersionsScores implements Action {
  public readonly type = GrecohActionTypes.GetPaintingAllVersionsScores;
  constructor(public paintingID: number, public coherence: string) {}
}

export class GetPaintingAllVersionsScoresSuccess implements Action {
  public readonly type = GrecohActionTypes.GetPaintingAllVersionsScoresSuccess;
  constructor(public paintingVersionsScores: PaintingVersionScore[]) {}
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


export class GetAnswersExperiment implements Action {
  public readonly type = GrecohActionTypes.GetAnswersExperiment;
  constructor(public experimentID: number) {}
}

export class GetAnswersExperimentSuccess implements Action {
  public readonly type = GrecohActionTypes.GetAnswersExperimentSuccess;
  constructor(public answers: AnswerExperiment[]) {}
}

export class ChangeAnswerCoherence implements Action {
  public readonly type = GrecohActionTypes.ChangeAnswerCoherence;
  constructor(public questionID: number, public email: string, public coherence: string) {}
}

export class ChangeAnswerCoherenceSuccess implements Action {
  public readonly type = GrecohActionTypes.ChangeAnswerCoherenceSuccess;
  constructor(public answerChanged: AnswerExperiment) {}
}

export type GrecohActions =
  GrecohServerError | ResetGrecohServerError |
  GetAllPaintings | GetAllPaintingsSuccess |
  GetLevelPaintings | GetLevelPaintingsSuccess |
  GetPainting | GetPaintingSuccess |
  GetPaintingVersions | GetPaintingVersionsSuccess |
  PostPaintingVersionsScores | PostPaintingVersionsScoresSuccess |
  GetPaintingStatistics | GetPaintingStatisticsSuccess |
  GetPaintingVersionScores | GetPaintingVersionScoresSuccess | ResetScoreResults |
  GetPaintingAllVersionsScores | GetPaintingAllVersionsScoresSuccess |
  GetCollaborators | GetCollaboratorsSuccess |
  SelectCollaborator |
  GetLevels | GetLevelsSuccess | FirstLevel | PreviousLevel | NextLevel | // ChangeLevelIndex |
  GetExperiment | GetExperimentSuccess |
  GetExperimentLevelUserQuestions | GetExperimentLevelUserQuestionsSuccess |
  PostExperimentLevelUserComment | PostExperimentLevelUserCommentSuccess |
  GetAnswersExperiment | GetAnswersExperimentSuccess |
  ChangeAnswerCoherence | ChangeAnswerCoherenceSuccess
  ;


