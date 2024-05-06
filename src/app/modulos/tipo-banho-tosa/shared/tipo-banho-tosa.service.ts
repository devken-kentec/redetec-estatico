import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { RequisicaoTipoBanhoTosa, RespostaTipoBanhoTosa } from '../../../domain/tipo-banho-tosa.domain';

@Injectable({
  providedIn: 'root'
})
export class TipoBanhoTosaService {

  private readonly api = `${environment.api}/rede-tecnologia/api/tipoBanhoTosa/v1`;
  private http = inject(HttpClient);

  public list(): Observable<RespostaTipoBanhoTosa[]>{
    return this.http.get<RespostaTipoBanhoTosa[]>(`${this.api}/listarTipoBanhoTosa`);
  }

  public loadById(id: number): Observable<RespostaTipoBanhoTosa> {
    return this.http.get<RespostaTipoBanhoTosa>(`${this.api}/recuperar/${id}`)
  }

  public save(tipoBanhoTosa: RequisicaoTipoBanhoTosa):Observable<RespostaTipoBanhoTosa> {
    if(tipoBanhoTosa.id){
      return this.update(tipoBanhoTosa);
    } else {
      return this.create(tipoBanhoTosa);
    }
  }

  private create(tipoBanhoTosa: RequisicaoTipoBanhoTosa): Observable<RespostaTipoBanhoTosa>{
    return this.http.post<RespostaTipoBanhoTosa>(`${this.api}`, tipoBanhoTosa);
  }

  private update(tipoBanhoTosa: RequisicaoTipoBanhoTosa): Observable<RespostaTipoBanhoTosa>{
    return this.http.put<RespostaTipoBanhoTosa>(`${this.api}`, tipoBanhoTosa);
  }

  public delete(id: number): Observable<RespostaTipoBanhoTosa> {
    return this.http.patch<RespostaTipoBanhoTosa>(`${this.api}/delete/${id}`, 'Inativo');
  }

}
