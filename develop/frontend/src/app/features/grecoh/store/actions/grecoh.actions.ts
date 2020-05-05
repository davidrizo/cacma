import {Action} from '@ngrx/store';
import {APIRestServerError} from '../../../../core/model/restapi/apirest-server-error';
import {Painting} from '../../model/painting';
import {PaintingVersion} from '../../model/painting-version';
import {UserPaintingVersionScores} from '../../model/user-painting-version-scores';
import {PaintingStatistics} from '../../model/painting-statistics';
import {PaintingVersionScore} from '../../model/painting-version-score';

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
  constructor() {}
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
  constructor(public success: boolean) {}
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

export type GrecohActions =
  GrecohServerError | ResetGrecohServerError |
  GetPaintings | GetPaintingsSuccess |
  GetPainting | GetPaintingSuccess |
  GetPaintingVersions | GetPaintingVersionsSuccess |
  PostPaintingVersionsScores | PostPaintingVersionsScoresSuccess |
  GetPaintingStatistics | GetPaintingStatisticsSuccess |
  GetPaintingVersionScores | GetPaintingVersionScoresSuccess;

