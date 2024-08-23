
import { Routes } from '@angular/router';
import { canActivateGuard } from './modulos/guards/can-activate.guard';

export const routes: Routes = [
  { path: 'home', loadChildren: ()=> import('./modulos/home/home.routes').then((p) => p.homeHoutes), canActivate:[canActivateGuard]},
  { path: 'empresa', loadChildren: ()=> import('./modulos/empresa/empresa.routes').then((p) => p.empresaHoutes), canActivate:[canActivateGuard]},
  { path: 'humano', loadChildren: ()=> import('./modulos/humano/humano.routes').then((p) => p.humanoHoutes), canActivate:[canActivateGuard]},
  { path: 'raca', loadChildren: ()=> import('./modulos/raca/raca.routes').then((p) => p.racaHoutes), canActivate:[canActivateGuard]},
  { path: 'animal', loadChildren: ()=> import('./modulos/animal/animal.routes').then((p) => p.animalHoutes), canActivate:[canActivateGuard]},
  { path: 'banho', loadChildren: ()=> import('./modulos/banho-tosa/banho-tosa.routes').then((p) => p.banhoTosaHoutes), canActivate:[canActivateGuard]},
  { path: 'tipo-banho', loadChildren: ()=> import('./modulos/tipo-banho-tosa/tipo-banho-tosa.routes').then((p) => p.tipoBanhoTosaHoutes), canActivate:[canActivateGuard]},
  { path: 'tipo-vacina', loadChildren: ()=> import('./modulos/tipo-vacina/tipo-vacina.routes').then((p) => p.tipoVacinaHoutes), canActivate:[canActivateGuard]},
  { path: 'vacina', loadChildren: ()=> import('./modulos/vacina/vacina.routes').then((p) => p.vacinaHoutes), canActivate:[canActivateGuard]},
  { path: 'config', loadChildren: ()=> import('./modulos/config/config.routes').then((p) => p.configHoutes), canActivate:[canActivateGuard]},
  { path: 'login', loadChildren: ()=> import('./modulos/login/login.routes').then((p) => p.loginHoutes)}
];
