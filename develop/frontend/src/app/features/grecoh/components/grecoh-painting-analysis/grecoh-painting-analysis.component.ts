import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {
  GetPainting, GetPaintingAllVersionsScores,
  GetPaintingStatistics,
  GetPaintingVersions,
  GetPaintingVersionScores,
  ResetScoreResults
} from '../../store/actions/grecoh.actions';
import {
  selectPaintingAllVersionsScores,
  selectPaintingStatistics,
  selectPaintingVersions,
  selectPaintingVersionScores,
  selectSelectedPainting
} from '../../store/selectors/grecoh.selector';
import {Store} from '@ngrx/store';
import {GrecohState} from '../../store/state/grecoh.state';
import {Observable, Subscription} from 'rxjs';
import {Painting} from '../../model/painting';
import {PaintingVersionScore} from '../../model/painting-version-score';
import {PaintingVersion} from '../../model/painting-version';
import {PaintingStatistics} from '../../model/painting-statistics';

@Component({
  selector: 'app-grecoh-painting-analysis',
  templateUrl: './grecoh-painting-analysis.component.html',
  styleUrls: ['./grecoh-painting-analysis.component.css']
})
export class GrecohPaintingAnalysisComponent implements OnInit, OnDestroy {
  paintingID: number;
  painting$: Observable<Painting>;
  paintingStatistics$: Observable<PaintingStatistics[]>;
  paintingVersionsSubscription: Subscription;
  paintingVersions: Map<number, PaintingVersion> = new Map<number, PaintingVersion>();
  paintingAllVersionsScores$: Observable<PaintingVersionScore[]>;

  constructor(private route: ActivatedRoute, private store: Store<GrecohState>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.paintingID = +this.route.snapshot.paramMap.get('id'); // + converts the string to number
      this.store.dispatch(new GetPainting(this.paintingID));
      this.store.dispatch(new GetPaintingVersions(this.paintingID));
      this.store.dispatch(new GetPaintingStatistics(this.paintingID));
      this.store.dispatch(new GetPaintingAllVersionsScores(this.paintingID));
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

    this.paintingAllVersionsScores$ = this.store.select(selectPaintingAllVersionsScores);
  }


  ngOnDestroy(): void {
    this.paintingVersionsSubscription.unsubscribe();
  }

  isOriginalVersion(paintingStatisticsItem: PaintingStatistics, painting: Painting) {
    return paintingStatisticsItem.painting_version_id === painting.painting_version_id;
  }
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
}
