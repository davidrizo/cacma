import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Painting} from '../../model/painting';
import {Store} from '@ngrx/store';
import {ShowErrorService} from '../../../../core/services/show-error.service';
import {selectGrecohServerError, selectPaintings} from '../../store/selectors/grecoh.selector';
import {GetPaintings, ResetGrecohServerError} from '../../store/actions/grecoh.actions';
import {GrecohState} from '../../store/state/grecoh.state';

@Component({
  selector: 'app-grecoh-paintings',
  templateUrl: './grecoh-paintings.component.html',
  styleUrls: ['./grecoh-paintings.component.css']
})
export class GrecohPaintingsComponent implements OnInit, OnDestroy {
  paintings$: Observable<Painting[]>;
  private serverErrorSubscription: Subscription;
  constructor(private store: Store<GrecohState>, private showErrorService: ShowErrorService) {
  }

  ngOnInit() {
    this.paintings$ = this.store.select(selectPaintings);

    this.store.dispatch(new GetPaintings());

    this.serverErrorSubscription = this.store.select(selectGrecohServerError).subscribe(next => {
      if (next) {
        this.showErrorService.warning(next);
        this.store.dispatch(new ResetGrecohServerError());
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
  }

}
