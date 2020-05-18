import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ProfileComponent} from './core/components/profile/profile.component';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './core/components/home/home.component';
import {CallbackComponent} from './core/components/callback/callback.component';

const routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent
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
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false })
      // If useHash = true it allows the reload in production:
      // see https://stackoverflow.com/questions/52416210/angular-static-base-url-and-routing-with-hash-is-true#
      // However, it makes 0auth to fail :(
    ],
    providers: [
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
