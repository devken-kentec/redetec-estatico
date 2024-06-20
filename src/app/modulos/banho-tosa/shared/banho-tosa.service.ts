import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoBanho, RespostaBanho } from '../../../domain/banho.domain';

@Injectable({
  providedIn: 'root'
})
export class BanhoTosaService {

  private readonly api = `${environment.api}/rede-tecnologia/api/banho-tosa/v1`;
  private http = inject(HttpClient);

  public list(): Observable<RespostaBanho[]>{
    return this.http.get<RespostaBanho[]>(`${this.api}/listarBanho`);
  }

  public loadById(id: number): Observable<RespostaBanho> {
    return this.http.get<RespostaBanho>(`${this.api}/recuperar/${id}`)
  }

  public save(banho: RequisicaoBanho):Observable<RespostaBanho> {
    if(banho.id){
      return this.update(banho);
    } else {
      return this.create(banho);
    }
  }

  private create(banho: RequisicaoBanho): Observable<RespostaBanho>{
    return this.http.post<RespostaBanho>(`${this.api}`, banho);
  }

  private update(banho: RequisicaoBanho): Observable<RespostaBanho>{
    return this.http.put<RespostaBanho>(`${this.api}`, banho);
  }

  public delete(id: number): Observable<RespostaBanho> {
    return this.http.patch<RespostaBanho>(`${this.api}/delete/${id}`, 'Inativo');
  }
}
