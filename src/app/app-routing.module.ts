import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication/authentication.guard';

import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'home', pathMatch: 'full',
  // },
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    children: [
      { path: 'home', component: UserHomepageComponent, canActivate: [AuthenticationGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
