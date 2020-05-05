import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogosRoutingModule } from './logos-routing.module';
import { LogosComponent } from './components/logos/logos.component';


@NgModule({
  declarations: [LogosComponent],
  imports: [
    CommonModule,
    LogosRoutingModule
  ]
})
export class LogosModule { }
