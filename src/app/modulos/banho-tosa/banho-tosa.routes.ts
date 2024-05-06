import { Routes } from '@angular/router';

export const banhoTosaHoutes: Routes = [
  { path: '', title: 'Banho Tosa', loadComponent: ()=> import('./banho-tosa-list/banho-tosa-list.component').then((p)=> p.BanhoTosaListComponent)},
  { path: 'new', title: 'Incluir Banho é Tosa', loadComponent: ()=> import('./banho-tosa-form/banho-tosa-form.component').then((p)=> p.BanhoTosaFormComponent)},
  { path: 'edit/:id', title: 'Editar Banho é Tosa', loadComponent: ()=> import('./banho-tosa-form/banho-tosa-form.component').then((p)=> p.BanhoTosaFormComponent)}
];
