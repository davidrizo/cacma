import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Painting} from '../../model/painting';
import {Store} from '@ngrx/store';
import {ShowErrorService} from '../../../../core/services/show-error.service';
import {
  selectAllLevelPaintingsScored,
  selectCollaborators, selectCurrentExperiment, selectCurrentLevel, selectCurrentLevelEmpty, selectExperimentLevelUser,
  selectGrecohServerError,
  selectPaintings,
  selectSelectedCollaboratorID
} from '../../store/selectors/grecoh.selector';
import {
  ChangeLevel,
  GetCollaborators,
  GetExperiment, GetExperimentLevelUser,
  GetPaintings, PostExperimentLevelUserComment,
  ResetGrecohServerError,
  SelectCollaborator
} from '../../store/actions/grecoh.actions';
import {GrecohState, initialSemanticRepresentationState} from '../../store/state/grecoh.state';
import {Collaborator} from '../../model/collaborator';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Experiment} from '../../model/experiment';
import {ExperimentLevelUser} from '../../model/experiment-level-user';
import {AuthService} from '../../../../auth/auth.service';

@Component({
  selector: 'app-grecoh-paintings',
  templateUrl: './grecoh-paintings.component.html',
  styleUrls: ['./grecoh-paintings.component.css'],
})
export class GrecohPaintingsComponent implements OnInit, OnDestroy {
  currentExperimentID = 1; // TODO Del filtro de tipo de experimento
  paintings$: Observable<Painting[]>;
  currentLevel: number;
  allLevelPaintingsScored$: Observable<boolean>;
  collaborators: Collaborator[];
  private serverErrorSubscription: Subscription;
  collaboratorsSubscription: Subscription;
  selectedCollaboratorSubscription: Subscription;
  selectedCollaboratorID: number; // must be a number
  currentLevelSubscription: Subscription;
  currentLevelEmpty$: Observable<boolean>;
  currentExperiment$: Observable<Experiment>;
  experimentLevelUserSubscription: Subscription;
  formUserLevelComments: FormGroup;
  private emailSubscription: Subscription;
  private email: string;
  hasComments: boolean;

  constructor(private store: Store<GrecohState>, private showErrorService: ShowErrorService, private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.collaborators = [
      {
        id: initialSemanticRepresentationState.selectedCollaboratorID,
        name: 'Ninguno',
        email: null
      }
    ];
    this.selectedCollaboratorID = this.collaborators[0].id;

    this.formUserLevelComments = this.formBuilder.group({
      comments: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetExperiment(this.currentExperimentID));
    this.currentExperiment$ = this.store.select(selectCurrentExperiment);

    this.paintings$ = this.store.select(selectPaintings);
    this.allLevelPaintingsScored$ = this.store.select(selectAllLevelPaintingsScored);
    this.collaboratorsSubscription = this.store.select(selectCollaborators).subscribe(value => {
      if (value && this.collaborators.length === 1) { // don't initialize twice on reload
        this.collaborators = this.collaborators.concat(value);
      }
    });

    this.emailSubscription = this.authService.userProfile$.subscribe(next => {
      if (next) {
        this.email = next.email;
        this.dispatchPaintingsAndExperimentLevelUser();
      }
    });

    this.currentLevelSubscription = this.store.select(selectCurrentLevel).subscribe(next => {
      if (next) {
        this.currentLevel = next;
        this.dispatchPaintingsAndExperimentLevelUser();
      }
    });
    this.store.dispatch(new GetCollaborators());

    this.serverErrorSubscription = this.store.select(selectGrecohServerError).subscribe(next => {
      if (next) {
        this.showErrorService.warning(next);
        this.store.dispatch(new ResetGrecohServerError());
      }
    });
    this.selectedCollaboratorSubscription = this.store.select(selectSelectedCollaboratorID).subscribe(next => {
      if (next) {
        this.selectedCollaboratorID = next;
      }
    });
    this.currentLevelEmpty$ = this.store.select(selectCurrentLevelEmpty);

    this.experimentLevelUserSubscription = this.store.select(selectExperimentLevelUser).subscribe(next => {
      this.hasComments = false;
      if (next) {
        this.formUserLevelComments.controls.comments.setValue(next.comments);
        this.hasComments = next.comments.trim().length > 0;
      } else {
        this.formUserLevelComments.controls.comments.setValue('');
      }
    });
  }

  trackByPainting(index, item: Painting) {
    return item.id; // unique id corresponding to the item
  }

  getGrayscaleImage(item: Painting): string {
    return `assets/paintings/${item.painter_slug}/${item.slug}/grayscale.jpg`;
  }

  ngOnDestroy(): void {
    this.serverErrorSubscription.unsubscribe();
    this.collaboratorsSubscription.unsubscribe();
    this.selectedCollaboratorSubscription.unsubscribe();
    this.currentLevelSubscription.unsubscribe();
    this.experimentLevelUserSubscription.unsubscribe();
    this.emailSubscription.unsubscribe();
  }

  onCollaboratorChanged($event) {
    this.store.dispatch(new SelectCollaborator($event));
  }

  prevLevel() {
    this.store.dispatch(new ChangeLevel(this.currentLevel - 1));
  }

  nextLevel() {
    this.store.dispatch(new ChangeLevel(this.currentLevel + 1));
  }

  isFirstLevel() {
    return this.currentLevel === 1;
  }

  firstLevel() {
    this.store.dispatch(new ChangeLevel(1));
  }

  sendComments() {
    const experimentLevelUser: ExperimentLevelUser = {
      experiment_id: this.currentExperimentID,
      level: this.currentLevel,
      email: this.email,
      comments: this.formUserLevelComments.controls.comments.value
    };

    this.store.dispatch(new PostExperimentLevelUserComment(experimentLevelUser));
  }

  private dispatchPaintingsAndExperimentLevelUser() {
    if (this.email && this.currentLevel && this.currentExperimentID) {
      this.store.dispatch(new GetPaintings(this.currentExperimentID, this.currentLevel, this.email));
      this.store.dispatch(new GetExperimentLevelUser(this.currentExperimentID, this.currentLevel, this.email));
    }
  }
}
