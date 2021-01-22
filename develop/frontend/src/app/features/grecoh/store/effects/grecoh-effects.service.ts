import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  GetCollaborators,
  GetCollaboratorsSuccess,
  GetExperimentLevelUser,
  GetExperimentLevelUserSuccess,
  GetExperimentSuccess,
  GetPainting,
  GetPaintings,
  GetPaintingsSuccess,
  GetPaintingStatistics,
  GetPaintingStatisticsSuccess,
  GetPaintingSuccess,
  GetPaintingVersions,
  GetPaintingVersionScores,
  GetPaintingVersionScoresSuccess,
  GetPaintingVersionsSuccess,
  GetQuestions,
  GetQuestionsSuccess,
  GrecohActionTypes,
  GrecohServerError,
  PostExperimentLevelUserComment,
  PostExperimentLevelUserCommentSuccess,
  PostPaintingVersionsScores,
  PostPaintingVersionsScoresSuccess
} from '../actions/grecoh.actions';
import {GrecohService} from '../../services/grecoh.service';
import {Action} from '@ngrx/store';
import {Painting} from '../../model/painting';
import {PaintingVersion} from '../../model/painting-version';
import {PaintingStatistics} from '../../model/painting-statistics';
import {PaintingVersionScore} from '../../model/painting-version-score';
import {APIRestServerError} from '../../../../core/model/restapi/apirest-server-error';
import {Collaborator} from '../../model/collaborator';
import {Question} from '../../model/question';
import {Experiment} from '../../model/experiment';
import {ExperimentLevelUser} from '../../model/experiment-level-user';

@Injectable()
export class GrecohEffects {
  constructor(
    private grecohService: GrecohService,
    private actions$: Actions,
  ) {}

  @Effect()
  getPaintings$: Observable<Action> = this.actions$.pipe(
    ofType<GetPaintings>(GrecohActionTypes.GetPaintings),
    switchMap((action: GetPaintings) =>
      this.grecohService.getPaintings$(action.experimentID, action.level, action.email).pipe(
    switchMap((paintings: Painting[]) => of(new GetPaintingsSuccess(paintings))),
        catchError(err => of(new GrecohServerError((err)))
      ))));

  @Effect()
  getPainting$: Observable<Action> = this.actions$.pipe(
    ofType<GetPainting>(GrecohActionTypes.GetPainting),
    switchMap((action: GetPainting) =>
      this.grecohService.getPainting$(action.id).pipe(
        switchMap((painting: Painting) => of(new GetPaintingSuccess(painting))),
        catchError(err => of(new GrecohServerError(err)))
      )));

  @Effect()
  getPaintingVersions$: Observable<Action> = this.actions$.pipe(
    ofType<GetPaintingVersions>(GrecohActionTypes.GetPaintingVersions),
    switchMap((action: GetPaintingVersions) =>
      this.grecohService.getPaintingVersions$(action.paintingId).pipe(
        switchMap((paintingVersions: PaintingVersion[]) => of(new GetPaintingVersionsSuccess(paintingVersions))),
        catchError(err => of(new GrecohServerError(err)))
      )));

  @Effect()
  postPaintingVersionsScores$: Observable<Action> = this.actions$.pipe(
    ofType<PostPaintingVersionsScores>(GrecohActionTypes.PostPaintingVersionsScores),
    switchMap((action: PostPaintingVersionsScores) =>
      this.grecohService.postPaintingVersionsScores$(action.userPaintingVersionScores).pipe(
        switchMap((result: APIRestServerError) => of(new PostPaintingVersionsScoresSuccess(result))),
        catchError(err => of(new GrecohServerError(err)))
      )));

  @Effect()
  getPaintingStatistics$: Observable<Action> = this.actions$.pipe(
    ofType<GetPaintingStatistics>(GrecohActionTypes.GetPaintingStatistics),
    switchMap((action: GetPaintingStatistics) =>
      this.grecohService.getPaintingStatistics$(action.paintingID).pipe(
        switchMap((paintingStatistics: PaintingStatistics[]) => of(new GetPaintingStatisticsSuccess(paintingStatistics))),
        catchError(err => of(new GrecohServerError(err)))
      )));

  @Effect()
  getPaintingVersionScore$: Observable<Action> = this.actions$.pipe(
    ofType<GetPaintingVersionScores>(GrecohActionTypes.GetPaintingVersionScores),
    switchMap((action: GetPaintingVersionScores) =>
      this.grecohService.getPaintingVersionScores$(action.paintingVersionID).pipe(
        switchMap((paintingVersionScores: PaintingVersionScore[]) => of(new GetPaintingVersionScoresSuccess(paintingVersionScores))),
        catchError(err => of(new GrecohServerError(err)))
      )));

  @Effect()
  getCollaborators$: Observable<Action> = this.actions$.pipe(
    ofType<GetCollaborators>(GrecohActionTypes.GetCollaborators),
    switchMap((action: GetCollaborators) =>
      this.grecohService.getCollaborators$().pipe(
        switchMap((collaborators: Collaborator[]) => of(new GetCollaboratorsSuccess(collaborators))),
        catchError(err => of(new GrecohServerError(err)))
      )));

  @Effect()
  getQuestions$: Observable<Action> = this.actions$.pipe(
    ofType<GetQuestions>(GrecohActionTypes.GetQuestions),
    switchMap((action: GetQuestions) =>
      this.grecohService.getQuestions$(action.experimentID).pipe(
        switchMap((questions: Question[]) => of(new GetQuestionsSuccess(questions))),
        catchError(err => of(new GrecohServerError((err)))
        ))));

  @Effect()
  getExperiment$: Observable<Action> = this.actions$.pipe(
    ofType<GetQuestions>(GrecohActionTypes.GetExperiment),
    switchMap((action: GetQuestions) =>
      this.grecohService.getExperiment$(action.experimentID).pipe(
        switchMap((experiment: Experiment) => of(new GetExperimentSuccess(experiment))),
        catchError(err => of(new GrecohServerError((err)))
        ))));

  @Effect()
  getExperimentLevelUser$: Observable<Action> = this.actions$.pipe(
    ofType<GetExperimentLevelUser>(GrecohActionTypes.GetExperimentLevelUser),
    switchMap((action: GetExperimentLevelUser) =>
      this.grecohService.getCommentsExperimentUserLevel$(action.experimentID, action.level, action.email).pipe(
        switchMap((experimentLevelUser: ExperimentLevelUser) => of(new GetExperimentLevelUserSuccess(experimentLevelUser))),
        catchError(err => of(new GrecohServerError((err)))
        ))));

  @Effect()
  postCommentsExperimentUserLevel$: Observable<Action> = this.actions$.pipe(
    ofType<PostExperimentLevelUserComment>(GrecohActionTypes.PostExperimentLevelUserComment),
    switchMap((action: PostExperimentLevelUserComment) =>
      this.grecohService.postCommentsExperimentUserLevel$(action.experimentLevelUser).pipe(
        switchMap((result: APIRestServerError) => of(new PostExperimentLevelUserCommentSuccess(result))),
        catchError(err => of(new GrecohServerError(err)))
      )));

}
