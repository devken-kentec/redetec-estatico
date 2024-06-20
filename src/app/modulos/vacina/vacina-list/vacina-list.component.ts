import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';
import { VacinaService } from '../shared/vacina.service';
import { SharedService } from '../../shared/shared.service';
import { RespostaVacina } from '../../../domain/vacina.domain';
import { take } from 'rxjs';

@Component({
  selector: 'app-vacina-list',
  standalone: true,
  imports: [RouterModule, ModalFormComponent],
  templateUrl: './vacina-list.component.html',
  styleUrl: './vacina-list.component.css'
})
export class VacinaListComponent {

  private vacinaService = inject(VacinaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public sharedService = inject(SharedService);

  listaVacina: RespostaVacina [] = [];
  vacina!: RespostaVacina;
  registroDeletado: boolean = true;

  ngOnInit(): void {
    this.listarAnimal();
  }

  public listarAnimal(){
    this.vacinaService.list().subscribe((res: RespostaVacina[])=>{
      this.listaVacina = res
    });
  }

  public editar(id: number| undefined){
    this.router.navigate(["edit", id], { relativeTo: this.route});
  }

  public recuperarDados(lista: RespostaVacina): RespostaVacina {
    return this.vacina = lista;
  }

  public excluirRegistro(id: number){
    this.vacinaService.delete(id).pipe(take(1)
  ).subscribe({
    next: (res) => {
      console.log(res);
      this.sharedService.saveShow("Status Alterado!", "Sucesso!!");
      this.listarAnimal();
    },
    error: (err) => {
      console.log(err);
      this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
    }
  });
  }

}
