import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RequisicaoTipoVacina, RespostaTipoVacina } from '../../../domain/tipo-vacina.domain';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TipoVacinaService {

  private readonly api = `${environment.api}/rede-tecnologia/api/tipoVacina/v1`;
  private http = inject(HttpClient);

  public list(): Observable<RespostaTipoVacina[]>{
    return this.http.get<RespostaTipoVacina[]>(`${this.api}/listarTipoVacina`);
  }

  public loadById(id: number): Observable<RespostaTipoVacina> {
    return this.http.get<RespostaTipoVacina>(`${this.api}/recuperar/${id}`)
  }

  public save(tipoVacina: RequisicaoTipoVacina):Observable<RespostaTipoVacina> {
    if(tipoVacina.id){
      return this.update(tipoVacina);
    } else {
      return this.create(tipoVacina);
    }
  }

  private create(tipoVacina: RequisicaoTipoVacina): Observable<RespostaTipoVacina>{
    return this.http.post<RespostaTipoVacina>(`${this.api}`, tipoVacina);
  }

  private update(tipoVacina: RequisicaoTipoVacina): Observable<RespostaTipoVacina>{
    return this.http.put<RespostaTipoVacina>(`${this.api}`, tipoVacina);
  }

  public delete(id: number): Observable<RespostaTipoVacina> {
    return this.http.patch<RespostaTipoVacina>(`${this.api}/delete/${id}`, 'Inativo');
  }
}
