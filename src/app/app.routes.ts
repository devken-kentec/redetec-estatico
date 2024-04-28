import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadChildren: ()=> import('./modulos/home/home.routes').then((p) => p.homeHoutes)},
  { path: 'raca', loadChildren: ()=> import('./modulos/raca/raca.routes').then((p) => p.racaHoutes)},
  { path: 'animal', loadChildren: ()=> import('./modulos/aninmal/animal.routes').then((p) => p.animalHoutes)}
];
