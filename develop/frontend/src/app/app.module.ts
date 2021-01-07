import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {ToastrModule} from 'ngx-toastr';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './core/components/home/home.component';
import {ProfileComponent} from './core/components/profile/profile.component';
import {LayoutModule} from './shared/layout/layout.module';
import {GrecohModule} from './features/grecoh/grecoh.module';
import {CallbackComponent} from './core/components/callback/callback.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

// the second parameter 'es-ES' is optional
registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ProfileComponent, CallbackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    // BrowserAnimationsModule, // ya no es necesario para ToastrModule - se usa npm install @angular/animations --save
    NoopAnimationsModule, // ya no es necesario para ToastrModule - se usa npm install @angular/animations --save
    ToastrModule.forRoot(), // ToastrModule added
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    StoreModule.forRoot({
      /* an empty object here  */
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional) - for ngrx in Chrome debugger
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
    NgbCollapseModule,
    LayoutModule,
    GrecohModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
