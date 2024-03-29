import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Store} from '@ngrx/store';
import {GrecohState} from '../../store/state/grecoh.state';
import {ShowErrorService} from '../../../../core/services/show-error.service';
import {
  GetPainting,
  GetPaintingStatistics,
  GetPaintingVersions,
  GetPaintingVersionScores,
  ResetPaintingVersionsScores
} from '../../store/actions/grecoh.actions';
import {
  selectCurrentLevel,
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
import {Options} from 'ng5-slider';
import {AuthService} from '../../../../auth/auth.service';
import {UserPaintingVersionScores} from '../../model/user-painting-version-scores';

@Component({
  selector: 'app-score-statistics',
  templateUrl: './grecoh-score-statistics.component.html',
  styleUrls: ['./grecoh-score-statistics.component.css']
})
export class GrecohScoreStatisticsComponent implements OnInit, OnDestroy {
  paintingID: number;
 // currentLevelIndex$: Observable<number>;
  painting$: Observable<Painting>;
  paintingStatistics$: Observable<PaintingStatistics[]>;
  // key = painting_version_id
  paintingVersions: Map<number, PaintingVersion> = new Map<number, PaintingVersion>();
  paintingVersionScores$: Observable<PaintingVersionScore[]>;
  paintingVersionsSubscription: Subscription;
  imagesWidth = 30;
  sliderOptions: Options = {
    floor: 10,
    ceil: 100,
    hidePointerLabels: true,
    hideLimitLabels: true
  };
  onlyImages = false;
  private authSubscription: Subscription;
  private userEMail: any;

  constructor(private route: ActivatedRoute, private store: Store<GrecohState>,
              private showErrorService: ShowErrorService, private modalService: NgbModal,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.paintingID = +this.route.snapshot.paramMap.get('id'); // + converts the string to number
      this.store.dispatch(new GetPainting(this.paintingID));
      this.store.dispatch(new GetPaintingVersions(this.paintingID));
      this.store.dispatch(new GetPaintingStatistics(this.paintingID));
    });

    this.painting$ = this.store.select(selectSelectedPainting);
    this.paintingStatistics$ = this.store.select(selectPaintingStatistics);
   // this.currentLevelIndex$ = this.store.select(selectCurrentLevelIndex);

    this.paintingVersionsSubscription = this.store.select(selectPaintingVersions).subscribe(next => {
      if (next && next.length > 0) {
        next.forEach(version => {
          this.paintingVersions.set(version.id, version);
        });
      }
    });

    this.paintingVersionScores$ = this.store.select(selectPaintingVersionScores);

    this.authSubscription = this.authService.userProfile$.subscribe(next => {
      if (next) {
        this.userEMail = next.email;
      }
    });
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

  getSchemeImage(painting: Painting): string {
    return `assets/paintings/${painting.painter_slug}/${painting.slug}/scheme.jpg`;
  }

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
    this.authSubscription.unsubscribe();
  }

  getComments(score: PaintingVersionScore): string {
    if (score.comments && score.comments.length > 2) {
      return score.comments;
    } else {
      return 'Sin comentarios';
    }
  }

  isOriginalVersion(paintingStatisticsItem: PaintingStatistics, painting: Painting) {
    return paintingStatisticsItem.painting_version_id === painting.painting_version_id;
  }


  isMarioDavid() {
    return this.userEMail.startsWith('mariorodriguez') || this.userEMail.startsWith('david.rizo');
  }

  reset() {
    const userPaintingVersionScore: UserPaintingVersionScores = {
      painting_id: this.paintingID,
      email: this.userEMail
    };
    this.store.dispatch(new ResetPaintingVersionsScores(userPaintingVersionScore));
  }
}
