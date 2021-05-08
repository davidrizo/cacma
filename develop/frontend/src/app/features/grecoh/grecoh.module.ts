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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GrecohScoreStatisticsComponent } from './components/score-statistics/grecoh-score-statistics.component';
import {
  NgbCarouselModule,
  NgbModule,
  NgbNavModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from '../../shared/layout/layout.module';
import {RouterModule} from '@angular/router';
import {Ng5SliderModule} from 'ng5-slider';
import { GrecohPaintingAnalysisComponent } from './components/grecoh-painting-analysis/grecoh-painting-analysis.component';
import {BoxplotComponent} from './components/grecoh-painting-analysis-graph/boxplot.component';
import { ChartModule } from 'angular2-chartjs';
import 'chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js';
import { QuestionsAnalysisComponent } from './components/questions-analysis/questions-analysis.component';

@NgModule({
  declarations:
    [GrecohComponent, GrecohAdminComponent, GrecohPaintingsComponent, GrecohPaintingComponent, GrecohScoreStatisticsComponent,
      GrecohPaintingAnalysisComponent, BoxplotComponent, QuestionsAnalysisComponent],
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
        LayoutModule,
        RouterModule,
        ReactiveFormsModule,
        Ng5SliderModule,
        ChartModule
    ],
  exports: [
  ],
  providers: [
    GrecohService
  ]
})
export class GrecohModule { }
