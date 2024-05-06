import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoAnimal, RespostaAnimal } from '../../../domain/animal.domain';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private readonly api = `${environment.api}/rede-tecnologia/api/animal/v1`;
  private http = inject(HttpClient);

  public list(): Observable<RespostaAnimal[]>{
    return this.http.get<RespostaAnimal[]>(`${this.api}/listarAnimal`);
  }

  public loadById(id: number): Observable<RespostaAnimal> {
    return this.http.get<RespostaAnimal>(`${this.api}/recuperar/${id}`)
  }

  public save(animal: RequisicaoAnimal):Observable<RespostaAnimal> {
    if(animal.id){
      return this.update(animal);
    } else {
      return this.create(animal);
    }
  }

  private create(animal: RequisicaoAnimal): Observable<RespostaAnimal>{
    return this.http.post<RespostaAnimal>(`${this.api}`, animal);
  }

  private update(animal: RequisicaoAnimal): Observable<RespostaAnimal>{
    return this.http.put<RespostaAnimal>(`${this.api}`, animal);
  }

  public delete(id: number): Observable<RespostaAnimal> {
    return this.http.patch<RespostaAnimal>(`${this.api}/delete/${id}`, 'Inativo');
  }
}
