import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoHumano, RespostaHumano } from '../../../domain/humano.domain';

@Injectable({
  providedIn: 'root'
})
export class HumanoService {

  private readonly api = `${environment.api}/rede-tecnologia/api/humano/v1`;
  private http = inject(HttpClient);

  public list(): Observable<RespostaHumano[]>{
    return this.http.get<RespostaHumano[]>(`${this.api}/listarHumano`);
  }

  public loadById(id: number): Observable<RespostaHumano> {
    return this.http.get<RespostaHumano>(`${this.api}/recuperar/${id}`)
  }

  public save(humano: RequisicaoHumano):Observable<RespostaHumano> {
    if(humano.id){
      return this.update(humano);
    } else {
      return this.create(humano);
    }
  }

  private create(humano: RequisicaoHumano): Observable<RespostaHumano>{
    return this.http.post<RespostaHumano>(`${this.api}`, humano);
  }

  private update(humano: RequisicaoHumano): Observable<RespostaHumano>{
    return this.http.put<RespostaHumano>(`${this.api}`, humano);
  }

  public delete(id: number): Observable<RespostaHumano> {
    return this.http.patch<RespostaHumano>(`${this.api}/delete/${id}`, 'Inativo');
  }
}
