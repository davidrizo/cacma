import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Store} from '@ngrx/store';
import {GrecohState} from '../../store/state/grecoh.state';
import {ShowErrorService} from '../../../../core/services/show-error.service';
import {AuthService} from '../../../../auth/auth.service';
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
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-score-statistics',
  templateUrl: './grecoh-score-statistics.component.html',
  styleUrls: ['./grecoh-score-statistics.component.css']
})
export class GrecohScoreStatisticsComponent implements OnInit, OnDestroy {
  paintingID: number;
  painting$: Observable<Painting>;
  paintingStatistics$: Observable<PaintingStatistics[]>;
  // key = painting_version_id
  paintingVersions: Map<number, PaintingVersion> = new Map<number, PaintingVersion>();
  paintingVersionScores$: Observable<PaintingVersionScore[]>;
  paintingVersionsSubscription: Subscription;
  constructor(private route: ActivatedRoute, private store: Store<GrecohState>, private showErrorService: ShowErrorService, private modalService: NgbModal) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.paintingID = +this.route.snapshot.paramMap.get('id'); // + converts the string to number
      this.store.dispatch(new GetPainting(this.paintingID));
      this.store.dispatch(new GetPaintingVersions(this.paintingID));
      this.store.dispatch(new GetPaintingStatistics(this.paintingID));
    });

    this.painting$ = this.store.select(selectSelectedPainting);
    this.paintingStatistics$ = this.store.select(selectPaintingStatistics);

    this.paintingVersionsSubscription = this.store.select(selectPaintingVersions).subscribe(next => {
      if (next && next.length > 0) {
        next.forEach(version => {
          this.paintingVersions.set(version.id, version);
        });
      }
    });

    this.paintingVersionScores$ = this.store.select(selectPaintingVersionScores);
  }

  /*trackByPaintingVersion(index, item: PaintingVersion) {
    return item.id; // unique id corresponding to the item
  }*/

  trackByPaintingStatistics(index, item: PaintingStatistics) {
    return item.painting_version_id; // unique id corresponding to the item
  }

  trackByPaintingScore(index, item: PaintingVersionScore) {
    return item.painting_version_id; // unique id corresponding to the item
  }

  /*getVersionImage(item: PaintingVersion): string {
    return `assets/paintings/${item.painter_slug}/${item.slug}/${item.color_hexa}.jpg`;
  }*/

  getVersionImage(item: PaintingStatistics): string {
    const version = this.paintingVersions.get(item.painting_version_id);
    if (version) {
      return `assets/paintings/${version.painter_slug}/${version.slug}/${version.color_hexa}.jpg`;
    } else {
      return '';
    }
  }

  /*getAverage(statistics: PaintingStatistics[], paintingVersion: PaintingVersion): number {
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
  }*/

  showComments(statistics: PaintingStatistics, contenidoDialogoModal) {
    this.store.dispatch(new GetPaintingVersionScores(statistics.painting_version_id));

    this.modalService.open(contenidoDialogoModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  ngOnDestroy(): void {
    this.paintingVersionsSubscription.unsubscribe();
  }

  getComments(score: PaintingVersionScore): string {
    if (score.comments && score.comments.length > 2) {
      return score.comments;
    } else {
      return 'Sin comentarios';
    }
  }
}
