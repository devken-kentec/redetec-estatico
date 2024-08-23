import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoAnimal, RespostaAnimal } from '../../../domain/animal.domain';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private readonly api = `${environment.api}/rede-tecnologia/api/animal/v1`;
  private http = inject(HttpClient);

  public fullList(): Observable<number> {
    return this.http.get<number>(`${this.api}/totalLista`);
  }

  public list(): Observable<RespostaAnimal[]>{
    return this.http.get<RespostaAnimal[]>(`${this.api}/listarAnimal`);
  }

  public loadById(id: number): Observable<RespostaAnimal> {
    return this.http.get<RespostaAnimal>(`${this.api}/recuperar/${id}`)
  }

  public listPage(page: number, size: number): Observable<RespostaAnimal[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<RespostaAnimal[]>(`${this.api}/consultaPaginacao?${params.toString()}`);
  }

  public searchPage(page: number, size: number, nome: string): Observable<RespostaAnimal[]> {
    const params = new HttpParams().set('page', page).set('size', size).set('nome', nome);
    return this.http.get<RespostaAnimal[]>(`${this.api}/consultaNomePaginacao?${params.toString()}`);
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
