import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoHumano, RespostaHumano } from '../../../domain/humano.domain';
import { RespostaPaginacao } from '../../../domain/paginacao.domian';

@Injectable({
  providedIn: 'root'
})
export class HumanoService {

  private readonly api = `${environment.api}/rede-tecnologia/api/humano/v1`;
  private http = inject(HttpClient);

  public fullList(): Observable<number> {
    return this.http.get<number>(`${this.api}/totalLista`);
  }

  public list(): Observable<RespostaHumano[]>{
    return this.http.get<RespostaHumano[]>(`${this.api}/listarHumano`);
  }

  public loadById(id: number): Observable<RespostaHumano> {
    return this.http.get<RespostaHumano>(`${this.api}/recuperar/${id}`);
  }

  public listPage(page: number, size: number): Observable<RespostaHumano[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<RespostaHumano[]>(`${this.api}/consultaPaginacao?${params.toString()}`);
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
