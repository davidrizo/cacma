import { Injectable } from '@angular/core';
import {ApiRestClientService} from '../../../core/services/api-rest-client.service';
import {Observable} from 'rxjs';
import {Painting} from '../model/painting';
import {PaintingVersion} from '../model/painting-version';
import {PaintingStatistics} from '../model/painting-statistics';
import {UserPaintingVersionScores} from '../model/user-painting-version-scores';
import {PaintingVersionScore} from '../model/painting-version-score';
import {APIRestServerError} from '../../../core/model/restapi/apirest-server-error';
import {Collaborator} from '../model/collaborator';
import {Experiment} from '../model/experiment';
import {Level} from '../model/level';
import {ExperimentLevelUserQuestionAnswer} from '../model/experiment-level-user_questions';


@Injectable()
export class GrecohService {

  constructor(private apiRestClientService: ApiRestClientService) {
  }

  getPaintings$(levelID: number, email: string): Observable<Painting[]> {
    // TODO token - ver también en connect.php los permisos CORS
    let url = `list_paintings.php?_ijt=sav6aq084tdi6va9t83me4f749&&level_id=${levelID}`;
    if (email) {
      url += `&email=${email}`;
    }
    return this.apiRestClientService.get$<Painting[]>(url);
  }

  getPainting$(id: number): Observable<Painting> {
    const url = 'get_painting.php?id=' + id;
    return this.apiRestClientService.get$<Painting>(url);
  }

  getPaintingVersions$(paintingId: number): Observable<PaintingVersion[]> {
    const url = 'list_painting_versions.php?painting_id=' + paintingId;
    return this.apiRestClientService.get$<PaintingVersion[]>(url);
  }

  postPaintingVersionsScores$(userPaintingVersionScores: UserPaintingVersionScores): Observable<APIRestServerError> {
    let url = 'insert_painting_version_scores.php';
    // console.log(JSON.stringify(userPaintingVersionScores));
    // return this.apiRestClientService.post$<APIRestServerError>(url, userPaintingVersionScores);
    // No me funciona, incluso activando CORS
    url += '?jsondata=' + encodeURIComponent(JSON.stringify(userPaintingVersionScores));
    return this.apiRestClientService.get$<APIRestServerError>(url);
  }

  getPaintingStatistics$(paintingId: number): Observable<PaintingStatistics[]> {
    const url = 'list_painting_version_statistics.php?painting_id=' + paintingId;
    return this.apiRestClientService.get$<PaintingStatistics[]>(url);
  }

  getPaintingVersionScores$(paintingVersionID: number): Observable<PaintingVersionScore[]> {
    const url = 'list_painting_version_scores.php?painting_version_id=' + paintingVersionID;
    return this.apiRestClientService.get$<PaintingVersionScore[]>(url);
  }

  getCollaborators$(): Observable<Collaborator[]> {
    const url = 'list_collaborators.php';
    return this.apiRestClientService.get$<Collaborator[]>(url);
  }

  getLevels$(experimentID: number): Observable<Level[]> {
    const url = 'list_levels.php?experiment_id=' + experimentID;
    return this.apiRestClientService.get$<Level[]>(url);
  }

  getExperiment$(experimentID: number): Observable<Experiment> {
    const url = 'get_experiment.php?id=' + experimentID;
    return this.apiRestClientService.get$<Experiment>(url);
  }

  getCommentsExperimentUserLevel$(levelID: number, email: string): Observable<ExperimentLevelUserQuestionAnswer[]> {
    const url = `get_answers_experiment_level_questions.php?level_id=${levelID}&email=${email}`;
    return this.apiRestClientService.get$<ExperimentLevelUserQuestionAnswer[]>(url);
  }

  postCommentsExperimentUserLevel$(answers: ExperimentLevelUserQuestionAnswer[]): Observable<APIRestServerError> {
    let url = 'change_experiment_level_user_question_answer.php';
    // console.log(JSON.stringify(userPaintingVersionScores));
    // return this.apiRestClientService.post$<APIRestServerError>(url, userPaintingVersionScores);
    // No me funciona, incluso activando CORS
    url += '?jsondata=' + encodeURIComponent(JSON.stringify(answers));
    return this.apiRestClientService.get$<APIRestServerError>(url);
  }
}
