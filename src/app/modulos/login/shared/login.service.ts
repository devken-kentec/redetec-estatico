import { EventEmitter, Injectable } from '@angular/core';
import { RespostaLogin } from '../../../domain/login.domain';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  xF45A = new EventEmitter<boolean>();
  X97AI = new EventEmitter<number>();
  xFF3L = new EventEmitter<string>();
  x025D = new EventEmitter<Array<string>>();

  constructor() { }

  isAuthenticated(resposta: RespostaLogin): void {
    this.xF45A.emit(resposta.autenticacao);
    this.X97AI.emit(resposta.id);
    this.xFF3L.emit(resposta.nome);
    this.x025D.emit(resposta.descricao);
  }

  autenticatedTrue(): boolean{
    let confirma: boolean = false;
    this.xF45A.subscribe(res => confirma = true);
    return confirma;
  }
}
