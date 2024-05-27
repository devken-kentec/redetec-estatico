import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { TipoVacinaService } from '../shared/tipo-vacina.service';
import { RespostaTipoVacina } from '../../../domain/tipo-vacina.domain';
import { take } from 'rxjs';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';

@Component({
  selector: 'app-tipo-vacina-list',
  standalone: true,
  imports: [RouterModule, ModalFormComponent],
  templateUrl: './tipo-vacina-list.component.html',
  styleUrl: './tipo-vacina-list.component.css',
  preserveWhitespaces: true
})
export class TipoVacinaListComponent {
  private tipoVacinaService = inject(TipoVacinaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  listaTipoVacina: RespostaTipoVacina[] = [];
  tipoVacina!: RespostaTipoVacina;
  registroDeletado: boolean = true;

  ngOnInit(): void {
    this.listarTipoVacina();
  }

  public listarTipoVacina(){
    this.tipoVacinaService.list().subscribe((res: RespostaTipoVacina[])=>{
        this.listaTipoVacina = res
    });
  }

  public editar(id: number | undefined){
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  public recuperarDados(lista: RespostaTipoVacina): RespostaTipoVacina {
    return this.tipoVacina = lista;
  }

  public excluirRegistro(id: number){
    this.tipoVacinaService.delete(id)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        console.log(res);
        this.sharedService.saveShow("Status Alterado!", "Sucesso!!");
        this.listarTipoVacina();
      },
      error: (err) => {
        console.log(err);
        this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!")
      },
    });
  }
}
