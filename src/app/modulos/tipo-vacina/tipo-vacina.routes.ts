import { Routes } from '@angular/router';
import { TipoVacinaListComponent } from './tipo-vacina-list/tipo-vacina-list.component';

export const tipoVacinaHoutes: Routes =[

    {path: '', title: 'Tipo Vacina', loadComponent: () =>import('./tipo-vacina-list/tipo-vacina-list.component').then((p)=> p.TipoVacinaListComponent)},
    {path: 'new', title: 'Incluir Tipo de Vacina', loadComponent: ()=> import('./tipo-vacina-form/tipo-vacina-form.component').then((p)=> p.TipoVacinaFormComponent)},
    {path: 'edit/id', title: 'Editar Tipo de Vacina', loadComponent: ()=> import('./tipo-vacina-form/tipo-vacina-form.component').then((p)=> p.TipoVacinaFormComponent)}

]