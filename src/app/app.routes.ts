import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProfileResolver } from './profile/profile.resolver';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: { userProfile: ProfileResolver },
  },
  { path: 'login', component: LoginComponent },
];
