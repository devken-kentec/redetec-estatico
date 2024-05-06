import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoEmpresa, RespostaEmpresa } from '../../../domain/empresa.domain';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly api = `${environment.api}/rede-tecnologia/api/empresa/v1`;
  private http = inject(HttpClient);

  public list(): Observable<RespostaEmpresa[]>{
    return this.http.get<RespostaEmpresa[]>(`${this.api}/listarEmpresa`);
  }

  public loadById(id: number): Observable<RespostaEmpresa> {
    return this.http.get<RespostaEmpresa>(`${this.api}/recuperar/${id}`)
  }

  public save(empresa: RequisicaoEmpresa):Observable<RespostaEmpresa> {
    if(empresa.id){
      return this.update(empresa);
    } else {
      return this.create(empresa);
    }
  }

  private create(empresa: RequisicaoEmpresa): Observable<RespostaEmpresa>{
    return this.http.post<RespostaEmpresa>(`${this.api}`, empresa);
  }

  private update(empresa: RequisicaoEmpresa): Observable<RespostaEmpresa>{
    return this.http.put<RespostaEmpresa>(`${this.api}`, empresa);
  }

  public delete(id: number): Observable<RespostaEmpresa> {
    return this.http.patch<RespostaEmpresa>(`${this.api}/delete/${id}`, 'Inativo');
  }
}
