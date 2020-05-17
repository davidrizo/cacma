import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ProfileComponent} from './core/components/profile/profile.component';
import {AuthGuard} from './shared/auth/services/auth.guard';
import {GrecohComponent} from './features/grecoh/components/grecoh/grecoh.component';
import {HomeComponent} from './core/components/home/home.component';

const routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'grecoh',
    loadChildren: () => import('./features/grecoh/grecoh.module').then(m => m.GrecohModule)
  },
  {
    path: 'logos',
    loadChildren: () => import('./features/logos/logos.module').then(m => m.LogosModule),
    canActivate: [AuthGuard]
  },
  {
    path: '', component: HomeComponent
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }) // to allow reloading in production
      // see https://stackoverflow.com/questions/52416210/angular-static-base-url-and-routing-with-hash-is-true#
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
