import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadChildren: ()=> import('./modulos/home/home.routes').then((p) => p.homeHoutes)},
  { path: 'empresa', loadChildren: ()=> import('./modulos/empresa/empresa.routes').then((p) => p.empresaHoutes)},
  { path: 'humano', loadChildren: ()=> import('./modulos/humano/humano.routes').then((p) => p.humanoHoutes)},
  { path: 'raca', loadChildren: ()=> import('./modulos/raca/raca.routes').then((p) => p.racaHoutes)},
  { path: 'animal', loadChildren: ()=> import('./modulos/animal/animal.routes').then((p) => p.animalHoutes)},
  { path: 'banho', loadChildren: ()=> import('./modulos/banho-tosa/banho-tosa.routes').then((p) => p.banhoTosaHoutes)},
  { path: 'tipo-banho', loadChildren: ()=> import('./modulos/tipo-banho-tosa/tipo-banho-tosa.routes').then((p) => p.tipoBanhoTosaHoutes)},
  { path: 'tipo-vacina', loadChildren: ()=> import('./modulos/tipo-vacina/tipo-vacina.routes').then((p) => p.tipoVacinaHoutes)}
];
