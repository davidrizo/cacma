import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import {FooterComponent} from './shared/layout/components/footer/footer.component';
import {NavBarComponent} from './shared/layout/components/nav-bar/nav-bar.component';
import {ProfileComponent} from './core/components/profile/profile.component';
import {LayoutModule} from './shared/layout/layout.module';
import {AuthModule} from './shared/auth/auth.module';
import {GrecohModule} from './features/grecoh/grecoh.module';

// the second parameter 'es-ES' is optional
registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    StoreModule.forRoot({
      /* an empty object here  */
    }),
    EffectsModule.forRoot([]),
    NgbCollapseModule,
    LayoutModule,
    AuthModule,
    GrecohModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
