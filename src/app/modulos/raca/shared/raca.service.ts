
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RequisicaoRaca, RespostaRaca } from '../../../domain/raca.domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RacaService {
  private readonly api = `${environment.api}/rede-tecnologia/api/raca/v1`;
  private http = inject(HttpClient);

  public list(): Observable<RespostaRaca[]>{
    return this.http.get<RespostaRaca[]>(`${this.api}/listarRaca`);
  }

  public save(raca: RequisicaoRaca):Observable<RespostaRaca> {
    if(raca.id){
      return this.create(raca);
    } else {
      return this.create(raca);
    }
  }

  private create(raca: RequisicaoRaca): Observable<RespostaRaca>{
    return this.http.post<RespostaRaca>(`${this.api}`, raca);
  }
}
