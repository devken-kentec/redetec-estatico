import { Routes } from '@angular/router';

export const animalHoutes: Routes = [
  { path: '', title: 'Animal', loadComponent: ()=> import('./animal-list/animal-list.component').then((p)=> p.AnimalListComponent)},
  { path: 'new', title: 'Incluir Animal', loadComponent: ()=> import('./animal-form/animal-form.component').then((p)=> p.AnimalFormComponent)},
  { path: 'edit/:id', title: 'Editar Animal', loadComponent: ()=> import('./animal-form/animal-form.component').then((p)=> p.AnimalFormComponent)}
];
