import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { VarifyEmailComponent } from './components/varify-email/varify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { BookingComponent } from './components/booking/booking.component';

import { AddProductComponent } from './components/add-product/add-product.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { authGuard } from './guard/auth/auth.guard';
import { roleGuard } from './guard/role/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'varify-email', component: VarifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'booking', component: BookingComponent },
  {
    path: 'add-product',
    loadComponent: () => import('./components/add-product/add-product.component').then(m => m.AddProductComponent),
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'edit-product/:id',
    loadComponent: () => import('./components/add-product/add-product.component').then(m => m.AddProductComponent),
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  }
];
