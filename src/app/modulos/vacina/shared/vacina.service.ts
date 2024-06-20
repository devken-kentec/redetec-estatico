import { Injectable, inject } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RequisicaoVacina, RespostaVacina } from "../../../domain/vacina.domain";

@Injectable({
    providedIn: 'root'
})
export class VacinaService {

    private readonly api = `${environment.api}/rede-tecnologica/api/vacina/v1`
    private http = inject(HttpClient);

    public list(): Observable<RespostaVacina[]>{
        return this.http.get<RespostaVacina[]>(`${this.api}/listarVacina`);
    }

    public loadById(id:number): Observable<RespostaVacina> {
        return this.http.get<RespostaVacina>(`${this.api}/recuperar/${id}`);
    }

    public save(vacina: RequisicaoVacina): Observable<RespostaVacina> {
        if (vacina.id) {
            return this.update(vacina);
        }else{
            return this.create(vacina);
        }
    }

    private create(vacina: RequisicaoVacina): Observable<RespostaVacina> {
        return this.http.post<RespostaVacina>(`${this.api}`, vacina);
    }

    private update(vacina: RequisicaoVacina): Observable<RespostaVacina> {
        return this.http.put<RespostaVacina>(`${this.api}`, vacina);
    }

    public delete(id: number): Observable<RespostaVacina> {
        return this.http.patch<RespostaVacina>(`${this.api}/delete/${id}`, 'Inativo');
    }
}