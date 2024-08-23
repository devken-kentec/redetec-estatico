import { Component, inject } from '@angular/core';
import { BanhoTosaService } from '../shared/banho-tosa.service';
import { take } from 'rxjs';
import { RespostaBanho } from '../../../domain/banho.domain';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-banho-tosa-status-list',
  standalone: true,
  imports: [],
  templateUrl: './banho-tosa-status-list.component.html',
  styleUrl: './banho-tosa-status-list.component.css'
})
export class BanhoTosaStatusListComponent {

  private banhoTosaService = inject(BanhoTosaService);
  public sharedService = inject(SharedService);

  listaBanhoTosa: RespostaBanho[] = [];
  alteraStatusBanho: string = '';
  novoStatusBanho: string = '';
  objBanhoTosa!: RespostaBanho;
  carregando: boolean = false;

  constructor(){
    this.listarBanhoAnimal();
  }

  public listarBanhoAnimal(){
    this.banhoTosaService.list().pipe(take(1)).subscribe((res: RespostaBanho[])=>{
        this.listaBanhoTosa = res;
        this.carregando = true;
    });
  }

  public alterarStatusBanho(lista: RespostaBanho){
    this.alteraStatusBanho = lista.statusBanhoTosa
    this.objBanhoTosa = lista;

    if(this.alteraStatusBanho === 'Em espera'){
      this.novoStatusBanho = 'Banho';
    } else if(this.alteraStatusBanho === 'Banho'){
      this.novoStatusBanho = 'Finalizado';
    } else {
      this.novoStatusBanho = 'enviarEmail';
    }
  }

  public editarStatusBanho(){
    console.log(this.novoStatusBanho);
    this.banhoTosaService.atualizaStatusBanho(this.objBanhoTosa.id, this.novoStatusBanho).pipe(
      take(1)
    ).subscribe(res=>{
       console.log(res);
       this.listarBanhoAnimal();
    });
  }

  public mudarCor(recebeCor: string): string {
    let cor = '';
    if(recebeCor === 'Banho'){
        cor = 'Blue';
    } else if(recebeCor === 'Finalizado'){
        cor = 'Green';
    }
    return cor;
  }
}
