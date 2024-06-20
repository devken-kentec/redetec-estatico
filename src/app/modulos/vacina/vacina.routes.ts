import { Routes } from '@angular/router';

export const vacinaHoutes: Routes = [
    { path: '', title: 'Vacina', loadComponent: ()=> import('./vacina-list/vacina-list.component').then((p)=> p.VacinaListComponent)},
    { path: 'new', title: 'Incluir Vacina', loadComponent: ()=> import('./vacina-form/vacina-form.component').then((p)=> p.VacinaFormComponent)},
    { path: 'edit/:id', title: 'Editar Vacina', loadComponent: ()=> import('./vacina-form/vacina-form.component').then((p)=> p.VacinaFormComponent)}
];
