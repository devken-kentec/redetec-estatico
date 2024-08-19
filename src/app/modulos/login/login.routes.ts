import { Routes } from '@angular/router';

export const loginHoutes: Routes = [
  { path: '', title: 'Login', loadComponent: ()=> import('./login-form/login-form.component').then((p)=> p.LoginFormComponent)},
];
