import { Routes } from '@angular/router';

export const empresaHoutes: Routes = [
  { path: '', title: 'Empresa', loadComponent: ()=> import('./empresa-list/empresa-list.component').then((p)=> p.EmpresaListComponent)},
  { path: 'new', title: 'Incluir Empresa', loadComponent: ()=> import('./empresa-form/empresa-form.component').then((p)=> p.EmpresaFormComponent)},
  { path: 'edit/:id', title: 'Editar Empresa', loadComponent: ()=> import('./empresa-form/empresa-form.component').then((p)=> p.EmpresaFormComponent)}
];
