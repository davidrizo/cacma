import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Store} from '@ngrx/store';
import {GrecohState} from '../../store/state/grecoh.state';
import {ShowErrorService} from '../../../../core/services/show-error.service';
import {AuthService} from '../../../../core/services/auth.service';
import {GetPainting, GetPaintingStatistics, GetPaintingVersions, GetPaintingVersionScores} from '../../store/actions/grecoh.actions';
import {
  selectPaintingStatistics,
  selectPaintingVersions,
  selectPaintingVersionScores,
  selectSelectedPainting
} from '../../store/selectors/grecoh.selector';
import {Painting} from '../../model/painting';
import {Observable, Subscription} from 'rxjs';
import {PaintingVersion} from '../../model/painting-version';
import {PaintingStatistics} from '../../model/painting-statistics';
import {PaintingVersionScore} from '../../model/painting-version-score';

@Component({
  selector: 'app-score-statistics',
  templateUrl: './grecoh-score-statistics.component.html',
  styleUrls: ['./grecoh-score-statistics.component.css']
})
export class GrecohScoreStatisticsComponent implements OnInit, OnDestroy {
  paintingID: number;
  painting$: Observable<Painting>;
  paintingVersions$: Observable<PaintingVersion[]>;
  paintingStatistics$: Observable<PaintingStatistics[]>;
  // key = painting_version_id
  paintingVersionsScores: Map<number, PaintingVersionScore[]> = new Map<number, PaintingVersionScore[]>();

  paintingVersionScoresSubscription: Subscription;
  constructor(private route: ActivatedRoute, private store: Store<GrecohState>, private showErrorService: ShowErrorService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.paintingID = +this.route.snapshot.paramMap.get('id'); // + converts the string to number
      this.store.dispatch(new GetPainting(this.paintingID));
      this.store.dispatch(new GetPaintingVersions(this.paintingID));
      this.store.dispatch(new GetPaintingStatistics(this.paintingID));
    });

    this.painting$ = this.store.select(selectSelectedPainting);
    this.paintingVersions$ = this.store.select(selectPaintingVersions);
    this.paintingStatistics$ = this.store.select(selectPaintingStatistics);

    this.paintingVersionScoresSubscription = this.store.select(selectPaintingVersionScores).subscribe(next => {
      if (next) {
        if (next.length > 0) {
          const paintingVersionID = next[0].painting_version_id;
          this.paintingVersionsScores.set(paintingVersionID, next);
        }
      }
    });
  }

  trackByPaintingVersion(index, item: PaintingVersion) {
    return item.id; // unique id corresponding to the item
  }

  getVersionImage(item: PaintingVersion): string {
    return `assets/paintings/${item.painter_slug}/${item.slug}/${item.color_hexa}.jpg`;
  }

  getAverage(statistics: PaintingStatistics[], paintingVersion: PaintingVersion): number {
    const scoreValues = statistics.find(item => item.painting_version_id === paintingVersion.id);
    if (scoreValues) {
      return scoreValues.average;
    } else {
      // TODO error
      return -1;
    }
  }

  getStandardDeviation(statistics: PaintingStatistics[], paintingVersion: PaintingVersion): number {
    const scoreValues = statistics.find(item => item.painting_version_id === paintingVersion.id);
    if (scoreValues) {
      return scoreValues.standard_deviation;
    } else {
      // TODO error
      return -1;
    }
  }

  retrieveScores(paintingVersion: PaintingVersion) {
    this.store.dispatch(new GetPaintingVersionScores(paintingVersion.id));
  }

  ngOnDestroy(): void {
    this.paintingVersionScoresSubscription.unsubscribe();
  }

  getScores(paintingVersion: PaintingVersion): PaintingVersionScore[] {
    return this.paintingVersionsScores.get(paintingVersion.id);
  }
}
