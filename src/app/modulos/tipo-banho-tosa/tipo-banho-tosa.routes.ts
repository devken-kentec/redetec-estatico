import { Routes } from '@angular/router';

export const tipoBanhoTosaHoutes: Routes = [
  { path: '', title: 'Banho Tosa', loadComponent: ()=> import('./tipo-banho-tosa-list/tipo-banho-tosa-list.component').then((p)=> p.TipoBanhoTosaListComponent)},
  { path: 'new', title: 'Incluir Tipo de Banho é Tosa', loadComponent: ()=> import('./tipo-banho-tosa-form/tipo-banho-tosa-form.component').then((p)=> p.TipoBanhoTosaFormComponent)},
  { path: 'edit/:id', title: 'Editar Tipo Banho é Tosa', loadComponent: ()=> import('./tipo-banho-tosa-form/tipo-banho-tosa-form.component').then((p)=> p.TipoBanhoTosaFormComponent)}
];
