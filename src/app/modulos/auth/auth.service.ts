import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RequisicaoLogin, RespostaLogin } from '../../domain/login.domain';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api = `${environment.api}/rede-tecnologia/api/AutenticaoBeta/v1`;
  //private tokenHeader: string =  environment.TOKEN;
  private tokenHeader: string | any;
  private http = inject(HttpClient);

  constructor() {
    if(localStorage.getItem("TOKEN") != null){
      this.tokenHeader = localStorage.getItem("TOKEN");
    }

  }

  public autenticarUsuario(login: RequisicaoLogin): Observable<RespostaLogin> {
    const headers = {
      'Token': this.tokenHeader
    }
    return this.http.post<RespostaLogin>(`${this.api}`, login, { headers });
  }

  public recuperarSenha(login: RequisicaoLogin): Observable<RespostaLogin> {
    const headers = {
      'Token': this.tokenHeader
    }
    return this.http.post<RespostaLogin>(`${this.api}/recuperar`, login, { headers });
  }

  public alterarSenha(login: RequisicaoLogin): Observable<RespostaLogin> {
    const headers = {
      'Token': this.tokenHeader
    }
    return this.http.post<RespostaLogin>(`${this.api}/alterar`, login, { headers });
  }
}
