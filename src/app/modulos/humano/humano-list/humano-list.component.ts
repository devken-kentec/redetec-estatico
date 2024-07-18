import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';
import { HumanoService } from '../shared/humano.service';
import { SharedService } from '../../shared/shared.service';
import { RespostaHumano } from '../../../domain/humano.domain';
import { take } from 'rxjs';

@Component({
  selector: 'app-humano-list',
  standalone: true,
  imports: [RouterModule, ModalFormComponent],
  templateUrl: './humano-list.component.html',
  styleUrl: './humano-list.component.css',
  preserveWhitespaces: true
})
export class HumanoListComponent {
  private humanoService = inject(HumanoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  listaHumano: RespostaHumano[] = [];
  humano!: RespostaHumano;
  registroDeletado: boolean = true;

  ngOnInit(): void {
    this.listarHumano();
  }

  public listarHumano(){
    this.humanoService.list().subscribe((res: RespostaHumano[])=>{
        this.listaHumano = res
    });
  }

  public editar(id: number | undefined){
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  public recuperarDados(lista: RespostaHumano): RespostaHumano {
    return this.humano = lista;
  }

  public excluirRegistro(id: number){
    this.humanoService.delete(id)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        console.log(res);
        this.sharedService.saveShow("Status Alterado!", "Sucesso!!");
        this.listarHumano();
      },
      error: (err) => {
        console.log(err);
        this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!")
      },
    });
  }
}
