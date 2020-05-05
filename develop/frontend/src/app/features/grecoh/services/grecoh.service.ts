import { Injectable } from '@angular/core';
import {ApiRestClientService} from '../../../core/services/api-rest-client.service';
import {Observable} from 'rxjs';
import {Painting} from '../model/painting';
import {PaintingVersion} from '../model/painting-version';
import {PaintingStatistics} from '../model/painting-statistics';
import {UserPaintingVersionScores} from '../model/user-painting-version-scores';
import {PaintingVersionScore} from '../model/painting-version-score';


@Injectable()
export class GrecohService {

  constructor(private apiRestClientService: ApiRestClientService) {
  }

  getPaintings$(): Observable<Painting[]> {
    const url = 'list_paintings.php?_ijt=sav6aq084tdi6va9t83me4f749'; // TODO token - ver también en connect.php los permisos CORS
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

  postPaintingVersionsScores$(userPaintingVersionScores: UserPaintingVersionScores): Observable<boolean> {
    const url = 'insert_painting_version_scores.php';
    return this.apiRestClientService.post$<boolean>(url, userPaintingVersionScores);
  }

  getPaintingStatistics$(paintingId: number): Observable<PaintingStatistics[]> {
    const url = 'list_painting_version_statistics.php?painting_id=' + paintingId;
    return this.apiRestClientService.get$<PaintingStatistics[]>(url);
  }

  getPaintingVersionScores$(paintingVersionID: number): Observable<PaintingVersionScore[]> {
    const url = 'list_painting_version_scores.php?painting_version_id=' + paintingVersionID;
    return this.apiRestClientService.get$<PaintingVersionScore[]>(url);
  }
}