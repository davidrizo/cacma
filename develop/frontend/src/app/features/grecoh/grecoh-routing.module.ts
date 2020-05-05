import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrecohComponent} from './components/grecoh/grecoh.component';
import {GrecohAdminComponent} from './components/grecoh-admin/grecoh-admin.component';
import {GrecohPaintingsComponent} from './components/grecoh-paintings/grecoh-paintings.component';
import {GrecohPaintingComponent} from './components/grecoh-painting/grecoh-painting.component';
import {GrecohScoreStatisticsComponent} from './components/score-statistics/grecoh-score-statistics.component';


const routes: Routes = [
  { path: 'home', component: GrecohComponent },
  { path: 'paintings', component: GrecohPaintingsComponent },
  { path: 'painting/:id', component: GrecohPaintingComponent },
  { path: 'statistics/:id', component: GrecohScoreStatisticsComponent },
  { path: 'admin', component: GrecohAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrecohRoutingModule { }
