import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ComboBoxRaca } from '../../domain/raca.domain';
import { ComboBoxHumano } from '../../domain/humano-domain';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly api = `${environment.api}/rede-tecnologia/api`;
  private http = inject(HttpClient);
  private toastrService = inject(ToastrService);

  saveShow(mensagem: string, titulo: string){
    this.toastrService.success(mensagem, titulo);
  }

  removeShow(mensagem: string, titulo: string){
    this.toastrService.error(mensagem, titulo)
  }

  warningShow(mensagem: string, titulo: string){
    this.toastrService.warning(mensagem, titulo)
  }

  public comboBoxRaca(): Observable<ComboBoxRaca[]>{
    return this.http.get<ComboBoxRaca[]>(`${this.api}/raca/v1/select`);
  }

  public comboBoxHumano(): Observable<ComboBoxHumano[]>{
    return this.http.get<ComboBoxHumano[]>(`${this.api}/humano/v1/select`);
  }
}
