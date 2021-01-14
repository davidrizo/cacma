import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Painting} from '../../model/painting';
import {Store} from '@ngrx/store';
import {ShowErrorService} from '../../../../core/services/show-error.service';
import {
  selectCollaborators, selectCurrentLevel,
  selectGrecohServerError,
  selectPaintings,
  selectSelectedCollaboratorID
} from '../../store/selectors/grecoh.selector';
import {GetCollaborators, GetPaintings, ResetGrecohServerError, SelectCollaborator} from '../../store/actions/grecoh.actions';
import {GrecohState, initialSemanticRepresentationState} from '../../store/state/grecoh.state';
import {Collaborator} from '../../model/collaborator';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-grecoh-paintings',
  templateUrl: './grecoh-paintings.component.html',
  styleUrls: ['./grecoh-paintings.component.css'],
})
export class GrecohPaintingsComponent implements OnInit, OnDestroy {
  paintings$: Observable<Painting[]>;
  currentLevel$: Observable<number>;
  collaborators: Collaborator[];
  private serverErrorSubscription: Subscription;
  allPaintingsEvaluated$: Observable<boolean>;
  formCollaborators: FormGroup;
  collaboratorsSubscription: Subscription;
  selectedCollaboratorSubscription: Subscription;
  selectedCollaboratorID: number; // must be a number

  constructor(private store: Store<GrecohState>, private showErrorService: ShowErrorService, private formBuilder: FormBuilder) {
    this.collaborators = [
      {
        id: initialSemanticRepresentationState.selectedCollaboratorID,
        name: 'Ninguno',
        email: null
      }
    ];
    this.selectedCollaboratorID = this.collaborators[0].id;
    this.formCollaborators = this.formBuilder.group({
      collaborators: ['']
    });
  }

  ngOnInit() {
    this.currentLevel$ = this.store.select(selectCurrentLevel);
    this.paintings$ = this.store.select(selectPaintings);
    this.collaboratorsSubscription = this.store.select(selectCollaborators).subscribe(value => {
      if (value && this.collaborators.length === 1) { // don't initialize twice on reload
        this.collaborators = this.collaborators.concat(value);
        this.formCollaborators.controls.collaborators.patchValue(-1);
      }
    });

    // TODO Level
    this.store.dispatch(new GetPaintings(1, 1, 'drizo@gcloud.ua.es')); // TODO Experiment ID 1 = colors
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
  }

  onCollaboratorChanged($event) {
    this.store.dispatch(new SelectCollaborator($event));
  }
}
