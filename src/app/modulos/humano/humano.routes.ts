import { Routes } from '@angular/router';

export const humanoHoutes: Routes = [
  { path: '', title: 'Empresa', loadComponent: ()=> import('./humano-list/humano-list.component').then((p)=> p.HumanoListComponent)},
  { path: 'new', title: 'Incluir Humano', loadComponent: ()=> import('./humano-form/humano-form.component').then((p)=> p.HumanoFormComponent)},
  { path: 'edit/:id', title: 'Editar Humano', loadComponent: ()=> import('./humano-form/humano-form.component').then((p)=> p.HumanoFormComponent)}
];
