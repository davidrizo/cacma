import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrecohRoutingModule } from './grecoh-routing.module';
import {GrecohComponent} from './components/grecoh/grecoh.component';
import {GrecohAdminComponent} from './components/grecoh-admin/grecoh-admin.component';
import { GrecohPaintingsComponent } from './components/grecoh-paintings/grecoh-paintings.component';
import {GrecohService} from './services/grecoh.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {grecohReducers} from './store/reducers/grecoh.reducers';
import {GrecohEffects} from './store/effects/grecoh-effects.service';
import {GrecohPaintingComponent } from './components/grecoh-painting/grecoh-painting.component';
import {FormsModule} from '@angular/forms';
import { GrecohScoreStatisticsComponent } from './components/score-statistics/grecoh-score-statistics.component';
import {
  NgbCarouselModule,
  NgbModule,
  NgbNavModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations:
    [GrecohComponent, GrecohAdminComponent, GrecohPaintingsComponent, GrecohPaintingComponent, GrecohScoreStatisticsComponent],
  imports: [
    CommonModule,
    GrecohRoutingModule,
    StoreModule.forFeature('grecoh', grecohReducers),
    EffectsModule.forFeature([GrecohEffects]),
    NgbModule,
    NgbRatingModule,
    NgbCarouselModule,
    NgbNavModule,
    FormsModule,
  ],
  exports: [
  ],
  providers: [
    GrecohService
  ]
})
export class GrecohModule { }