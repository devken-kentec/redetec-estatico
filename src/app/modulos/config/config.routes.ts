import { Routes } from '@angular/router';

export const configHoutes: Routes = [
  { path: '', title: 'Config', loadComponent: ()=> import('./acesso-list/acesso-list.component').then((p)=> p.AcessoListComponent)},
  { path: 'new', title: 'Incluir Acesso', loadComponent: ()=> import('./acesso-form/acesso-form.component').then((p)=> p.AcessoFormComponent)},
  { path: 'edit/:id', title: 'Editar Acesso', loadComponent: ()=> import('./acesso-form/acesso-form.component').then((p)=> p.AcessoFormComponent)}
];
