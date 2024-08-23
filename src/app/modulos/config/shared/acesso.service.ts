import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoAcesso, RespostaAcesso } from '../../../domain/acesso.domain';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  private readonly api = `${environment.api}/rede-tecnologia/api/config-acesso/v1`;
  private http = inject(HttpClient);

  public loadById(id: number): Observable<RespostaAcesso> {
    return this.http.get<RespostaAcesso>(`${this.api}/recuperar/${id}`)
  }

  public list(): Observable<RespostaAcesso[]>{
    return this.http.get<RespostaAcesso[]>(`${this.api}/listarAcessos`);
  }

  public save(animal: RequisicaoAcesso):Observable<RespostaAcesso> {
    if(animal.id){
      return this.update(animal);
    } else {
      return this.create(animal);
    }
  }

  private create(animal: RequisicaoAcesso): Observable<RespostaAcesso>{
    return this.http.post<RespostaAcesso>(`${this.api}`, animal);
  }

  private update(animal: RequisicaoAcesso): Observable<RespostaAcesso>{
    return this.http.put<RespostaAcesso>(`${this.api}`, animal);
  }
}
