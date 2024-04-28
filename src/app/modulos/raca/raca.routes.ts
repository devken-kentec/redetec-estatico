import { RacaFormComponent } from './raca-form/raca-form.component';
import { Routes } from '@angular/router';
import { RacaListComponent } from './raca-list/raca-list.component';

export const racaHoutes: Routes = [
  // { path: '', title: 'Listagem de Raças', component: RacaListComponent},
  // { path: 'new', title: 'Cadastro de Raças', component: RacaFormComponent},
  { path: '', title: 'Listagem de Raças', loadComponent: ()=> import('./raca-list/raca-list.component').then((p)=> p.RacaListComponent)},
  { path: 'new', title: 'Cadastrar Raça', loadComponent: ()=> import('./raca-form/raca-form.component').then((p)=> p.RacaFormComponent)},
  { path: 'edit/:id', title: 'Editar Raça', loadComponent: ()=> import('./raca-form/raca-form.component').then((p)=> p.RacaFormComponent)}
];
