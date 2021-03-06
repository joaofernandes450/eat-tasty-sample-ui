import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication/authentication.guard';

import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { FoodInfoComponent } from './components/food-info/food-info.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'app',
    children: [
      { path: 'home', component: UserHomepageComponent, canActivate: [AuthenticationGuard] },
      { path: 'food/:type', component: FoodInfoComponent, canActivate: [AuthenticationGuard] },
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthenticationGuard] },
      { path: 'order', component: OrderComponent, canActivate: [AuthenticationGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
