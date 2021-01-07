import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Painting} from '../../model/painting';
import {Store} from '@ngrx/store';
import {ShowErrorService} from '../../../../core/services/show-error.service';
import {
  selectCollaborators, selectCurrentLevel,
  selectGrecohServerError,
  selectPaintings,
  selectSelectedCollaborator
} from '../../store/selectors/grecoh.selector';
import {GetCollaborators, GetPaintings, ResetGrecohServerError, SelectCollaborator} from '../../store/actions/grecoh.actions';
import {GrecohState} from '../../store/state/grecoh.state';
import {Collaborator} from '../../model/collaborator';

@Component({
  selector: 'app-grecoh-paintings',
  templateUrl: './grecoh-paintings.component.html',
  styleUrls: ['./grecoh-paintings.component.css']
})
export class GrecohPaintingsComponent implements OnInit, OnDestroy {
  paintings$: Observable<Painting[]>;
  currentLevel$: Observable<number>;
  collaborators$: Observable<Collaborator[]>;
  private serverErrorSubscription: Subscription;
  selectedCollaborator: Collaborator;
  private selectedCollaboratorSubscription: Subscription;

  constructor(private store: Store<GrecohState>, private showErrorService: ShowErrorService) {
  }

  ngOnInit() {
    this.currentLevel$ = this.store.select(selectCurrentLevel);
    this.paintings$ = this.store.select(selectPaintings);
    this.collaborators$ = this.store.select(selectCollaborators);

    //TODO Level
    this.store.dispatch(new GetPaintings(1, 1, 'drizo@gcloud.ua.es')); // TODO Experiment ID 1 = colors
    this.store.dispatch(new GetCollaborators());

    this.serverErrorSubscription = this.store.select(selectGrecohServerError).subscribe(next => {
      if (next) {
        this.showErrorService.warning(next);
        this.store.dispatch(new ResetGrecohServerError());
      }
    });
    this.selectedCollaboratorSubscription = this.store.select(selectSelectedCollaborator).subscribe(next => {
      if (next) {
        this.selectedCollaborator = next;
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
    this.selectedCollaboratorSubscription.unsubscribe();
  }

  onCollaboratorChanged() {
    this.store.dispatch(new SelectCollaborator(this.selectedCollaborator));
  }
}
