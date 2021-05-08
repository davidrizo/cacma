import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Painting} from '../../model/painting';
import {selectPaintings} from '../../store/selectors/grecoh.selector';
import {Store} from '@ngrx/store';
import {GrecohState} from '../../store/state/grecoh.state';
import {GetAllPaintings, GetExperiment} from '../../store/actions/grecoh.actions';
import {Level} from '../../model/level';

@Component({
  selector: 'app-grecoh-admin',
  templateUrl: './grecoh-admin.component.html',
  styleUrls: ['./grecoh-admin.component.css']
})
export class GrecohAdminComponent implements OnInit {
  paintings$: Observable<Painting[]>;

  constructor(private store: Store<GrecohState>) {
    this.store.dispatch(new GetAllPaintings()); // TODO Experiments
  }

  ngOnInit() {
    this.paintings$ = this.store.select(selectPaintings);
  }

  trackByPainting(index, item: Painting) {
    return item.id; // unique id corresponding to the item
  }

  trackByLevel(index, item: Level) {
    return item.id; // unique id corresponding to the item
  }

}
