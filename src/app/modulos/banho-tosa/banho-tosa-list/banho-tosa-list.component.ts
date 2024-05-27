import { Component, inject } from '@angular/core';
import { BanhoTosaService } from '../shared/banho-tosa.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { RespostaBanho } from '../../../domain/banho.domain';
import { take } from 'rxjs';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';

@Component({
  selector: 'app-banho-tosa-list',
  standalone: true,
  imports: [RouterModule, ModalFormComponent],
  templateUrl: './banho-tosa-list.component.html',
  styleUrl: './banho-tosa-list.component.css',
  preserveWhitespaces: true
})
export class BanhoTosaListComponent {
  private banhoTosaService = inject(BanhoTosaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public sharedService = inject(SharedService);

  listaBanhoTosa: RespostaBanho[] = [];
  banhoTosa!: RespostaBanho;
  registroDeletado: boolean = true;

  ngOnInit(): void {
    this.listarAnimal();
  }

  public listarAnimal(){
    this.banhoTosaService.list().subscribe((res: RespostaBanho[])=>{
        this.listaBanhoTosa = res
    });
  }

  public editar(id: number | undefined){
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  public recuperarDados(lista: RespostaBanho): RespostaBanho {
    return this.banhoTosa = lista;
  }

  public excluirRegistro(id: number){
    this.banhoTosaService.delete(id)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        console.log(res);
        this.sharedService.saveShow("Status Alterado!", "Sucesso!!");
        this.listarAnimal();
      },
      error: (err) => {
        console.log(err);
        this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!")
      },
    });
  }
}
