import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RacaService } from '../shared/raca.service';
import { RespostaRaca } from '../../../domain/raca.domain';
import { SharedService } from '../../shared/shared.service';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';
import { take } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-raca-list',
  standalone: true,
  imports: [RouterModule, ModalFormComponent, ToastrModule],
  templateUrl: './raca-list.component.html',
  styleUrl: './raca-list.component.css',
  preserveWhitespaces: true
})
export class RacaListComponent implements OnInit {
  private racaService = inject(RacaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  listaRacas: RespostaRaca[] = [];
  racaRecupeada!: RespostaRaca;
  registroDeletado: boolean = true;
  carregando: boolean = false;

  ngOnInit(): void {
    this.listarRaca();
  }

  public listarRaca(){
    this.racaService.list().subscribe((res: RespostaRaca[])=>{
        this.listaRacas = res;
        this.carregando = true;
    });
  }

  public editar(id: number | undefined){
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  public recuperarDados(raca: RespostaRaca): RespostaRaca {
    return this.racaRecupeada = raca;
  }

  public excluirRegistro(id: number){
    this.racaService.delete(id)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        console.log(res);
        this.sharedService.saveShow("Status Alterado!", "Sucesso!!");
        this.listarRaca();
      },
      error: (err) => {
        console.log(err);
        this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!")
      },
    });
  }
}
