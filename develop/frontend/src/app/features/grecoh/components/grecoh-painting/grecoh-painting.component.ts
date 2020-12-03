import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {
  GetPainting,
  GetPaintingVersions,
  PostPaintingVersionsScores,
  ResetGrecohServerError,
  ResetScoreResults
} from '../../store/actions/grecoh.actions';
import {Store} from '@ngrx/store';
import {GrecohState} from '../../store/state/grecoh.state';
import {ShowErrorService} from '../../../../core/services/show-error.service';
import {Observable, Subscription} from 'rxjs';
import {Painting} from '../../model/painting';
import {PaintingVersion} from '../../model/painting-version';
import {
  selectGrecohServerError,
  selectPaintingVersions,
  selectPostScoresResult, selectSelectedCollaborator,
  selectSelectedPainting
} from '../../store/selectors/grecoh.selector';
import {AuthService} from '../../../../auth/auth.service';
import {PaintingVersionScore} from '../../model/painting-version-score';

import {UserPaintingVersionScores} from '../../model/user-painting-version-scores';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Collaborator} from '../../model/collaborator';

@Component({
  selector: 'app-grecoh-painting',
  templateUrl: './grecoh-painting.component.html',
  styleUrls: ['./grecoh-painting.component.css']
})
export class GrecohPaintingComponent implements OnInit, OnDestroy {
  paintingID: number;
  painting$: Observable<Painting>;
  paintingVersionsSubscription: Subscription;
  scores: PaintingVersionScore[];
  activePaintingVersionId: number;
  authSubscription: Subscription;
  insertionSubscription: Subscription;
  userEMail: string;
  serverErrorSubscription: Subscription;
  comentariosVersionSeleccionada: string;

  selectedCollaborator: Collaborator;
  private selectedCollaboratorSubscription: Subscription;



  constructor(private router: Router, private route: ActivatedRoute, private store: Store<GrecohState>,
              private showErrorService: ShowErrorService,
              private authService: AuthService,
              private modalService: NgbModal) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.paintingID = +this.route.snapshot.paramMap.get('id'); // + converts the string to number
      this.store.dispatch(new ResetScoreResults());
      this.store.dispatch(new GetPainting(this.paintingID));
      this.store.dispatch(new GetPaintingVersions(this.paintingID));
    });

    this.painting$ = this.store.select(selectSelectedPainting);
    this.paintingVersionsSubscription = this.store.select(selectPaintingVersions).subscribe(next => {
      if (next) {
        this.scores = [];
        next.forEach(paintingVersion => {
          this.scores.push({
            paintingVersion,
            painting_version_id: paintingVersion.id
          });

          // preload images to avoid flicker
          const image = new Image();
          image.src = this.getVersionImage(paintingVersion);
          console.log('loaded: ' + image.src);
        });
        this.activePaintingVersionId = this.scores[0].painting_version_id;
      }
    });

    this.serverErrorSubscription = this.store.select(selectGrecohServerError).subscribe(next => {
      if (next) {
        this.showErrorService.warning(next);
        this.store.dispatch(new ResetGrecohServerError());
      }
    });

    this.authSubscription = this.authService.userProfile$.subscribe(next => {
      if (next) {
        this.userEMail = next.email;
      }
    });

    // when receive a successful post redirect
    this.insertionSubscription = this.store.select(selectPostScoresResult).subscribe(next => {
      if (next) {
        if (next.status === 200) {
          // console.log('Redirecciono con painting ID=' + this.paintingID);
          this.router.navigate(['/grecoh/statistics', this.paintingID]);
        } else {
          this.showErrorService.warning(next);
        }
      }
    });

    this.selectedCollaboratorSubscription = this.store.select(selectSelectedCollaborator).subscribe(next => {
      if (next) {
        this.selectedCollaborator = next;
      }
    });

  }

  trackByPaintingVersionFn(index, item: PaintingVersionScore) {
    return item.painting_version_id; // unique id corresponding to the item
  }

  getVersionImage(item: PaintingVersion): string {
    return `assets/paintings/${item.painter_slug}/${item.slug}/${item.color_hexa}.jpg`;
  }

  getColor(item: PaintingVersion): string {
    return `#${item.color_hexa}`;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.serverErrorSubscription.unsubscribe();
    this.insertionSubscription.unsubscribe();
    this.paintingVersionsSubscription.unsubscribe();
    this.selectedCollaboratorSubscription.unsubscribe();
  }

  /*getScore(paintingVersion: PaintingVersion): number {
    const score: PaintingVersionScore = this.mapPunctionations.get(paintingVersion.id);
    if (!score) {
      return 0;
    } else {
      return score.value;
    }
  }

  getComments(paintingVersion: PaintingVersion): string {
    console.log('get ' + paintingVersion.id);
    const score: PaintingVersionScore = this.mapPunctionations.get(paintingVersion.id);

    if (!score || !score.comments) {
      return '';
    } else {
      return score.comments;
    }
  }

  setScore(paintingVersion: PaintingVersion, scoreValue: number) {
    const previousScore: PaintingVersionScore = this.mapPunctionations.get(paintingVersion.painting_id);
    let newScore: PaintingVersionScore;

    if (!previousScore) {
      newScore = {
        painting_version_id: paintingVersion.id,
        value: scoreValue,
      };
    } else {
      newScore = {
        painting_version_id: paintingVersion.id,
        value: scoreValue,
        comments: previousScore.comments
      };
    }
    this.mapPunctionations.set(paintingVersion.id, newScore);
  }

  setComments(paintingVersion: PaintingVersion, event: any) {
    console.log('set ' + paintingVersion.id);
    const comments = event;

    const previousScore: PaintingVersionScore = this.mapPunctionations.get(paintingVersion.painting_id);
    let newScore: PaintingVersionScore;

    if (!previousScore) {
      newScore = {
        painting_version_id: paintingVersion.id,
        comments,
      };
    } else {
      newScore = {
        painting_version_id: paintingVersion.id,
        value: previousScore.value,
        comments
      };
    }
    this.mapPunctionations.set(paintingVersion.id, newScore);
  }*/

  isAllScoresAnswered() {
    if (this.scores) {
      let cont = 0;
      this.scores.forEach(score => {
        if (score.value) {
          cont++;
        }
      });
      return cont >= this.scores.length;
    } else {
      return false;
    }
  }

  sendScores() {
    // avoid sending the PaintingVersion
    const sc: PaintingVersionScore[] = [];
    this.scores.forEach(score => {
      sc.push({
        painting_version_id: score.painting_version_id,
        comments: score.comments,
        value: score.value,
        collaborator_id: this.selectedCollaborator != null ? this.selectedCollaborator.id : null
      });
    });

    const userPaintingVersionScore: UserPaintingVersionScores = {
      painting_id: this.paintingID,
      scores: sc,
      email: this.userEMail
    };
    this.store.dispatch(new PostPaintingVersionsScores(userPaintingVersionScore));
  }

  getBorderStyle(colorHexa: string) {
    return {
      color: '#' + colorHexa
    };
  }

  findCurrentScore(): PaintingVersionScore {
    if (!this.scores) {
      return undefined;
    } else {
      return this.scores.find(sc => sc.painting_version_id === this.activePaintingVersionId);
    }
  }

  getRate(): number {
    const score = this.findCurrentScore();
    if (!score) {
      return 0;
    } else {
      return score.value;
    }
  }

  onRateChange($event: number) {
    const score = this.findCurrentScore();
    if (!score) {
      console.log('Cannot find painting_version_id: ' + this.activePaintingVersionId);
    } else {
      score.value = $event;
    }
  }

  getComemnts(): string {
    const score = this.findCurrentScore();
    if (!score) {
      return '';
    } else {
      return score.comments;
    }
  }

  showComments(content, ) {
    this.comentariosVersionSeleccionada = this.getComemnts();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const score = this.findCurrentScore();
      if (!score) {
        console.log('Cannot find painting_version_id: ' + this.activePaintingVersionId);
      } else {
        score.comments = this.comentariosVersionSeleccionada;
      }
    }, (reason) => {
      // cancelled
    });
  }

}
