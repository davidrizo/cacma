import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogosComponent} from './components/logos/logos.component';

const routes: Routes = [
  { path: '', component: LogosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogosRoutingModule { }
