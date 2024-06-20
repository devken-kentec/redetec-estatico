import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ComboBoxRaca } from '../../domain/raca.domain';
import { ComboBoxHumano } from '../../domain/humano-domain';
import { ComboBoxAnimal } from '../../domain/animal.domain';
import { ComboBoxTipoBanhoTosa } from '../../domain/tipo-banho-tosa.domain';
import { ComboBoxTipoVacina } from '../../domain/tipo-vacina.domain';

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

  public comboBoxAnimal(): Observable<ComboBoxAnimal[]>{
    return this.http.get<ComboBoxAnimal[]>(`${this.api}/animal/v1/select`);
  }

  public comboBoxTipoBanhoTosa(): Observable<ComboBoxTipoBanhoTosa[]>{
    return this.http.get<ComboBoxTipoBanhoTosa[]>(`${this.api}/tipoBanhoTosa/v1/select`);
  }

  public comboBoxTipoVacina(): Observable<ComboBoxTipoVacina[]>{
    return this.http.get<ComboBoxTipoVacina[]>(`${this.api}/tipoVacina/v1/select`);
  }

  public formatDate(data: string){
    let dataCompleta = "";
			 let dia = data.substring(8,10);
			 let mes = data.substring(5,7);
       let ano = data.substring(0,4);

       if(dia.length == 1){
        dia = "0" + dia;
     }
      if(mes.length == 1){
        mes = "0" + mes
      }
     dataCompleta = dia+"/"+mes+"/"+ano
		 return dataCompleta;
  }

  public formatTime(time: string){
    let horaCompleta = "";
    let hora = time.substring(11,13);
    let minuto = time.substring(14, 16);

    if(hora.length == 1){
      hora = "0" + hora;
    }

    if(minuto.length == 1){
      minuto = "0" + minuto;
    }
    horaCompleta = hora + ":" + minuto;
    return horaCompleta;
  }
}
