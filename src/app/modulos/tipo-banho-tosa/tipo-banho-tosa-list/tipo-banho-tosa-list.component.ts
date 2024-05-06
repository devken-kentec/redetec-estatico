import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';
import { TipoBanhoTosaService } from '../shared/tipo-banho-tosa.service';
import { SharedService } from '../../shared/shared.service';
import { RespostaTipoBanhoTosa } from '../../../domain/tipo-banho-tosa.domain';
import { take } from 'rxjs';

@Component({
  selector: 'app-tipo-banho-tosa-list',
  standalone: true,
  imports: [RouterModule, ModalFormComponent],
  templateUrl: './tipo-banho-tosa-list.component.html',
  styleUrl: './tipo-banho-tosa-list.component.css',
  preserveWhitespaces: true
})
export class TipoBanhoTosaListComponent implements OnInit {
  private tipoBanhoTosaService = inject(TipoBanhoTosaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  listaTipoBanhoTosa: RespostaTipoBanhoTosa[] = [];
  tipoBanhoTosa!: RespostaTipoBanhoTosa;
  registroDeletado: boolean = true;

  ngOnInit(): void {
    this.listarTipoBanhoTosa();
  }

  public listarTipoBanhoTosa(){
    this.tipoBanhoTosaService.list().subscribe((res: RespostaTipoBanhoTosa[])=>{
        this.listaTipoBanhoTosa = res
    });
  }

  public editar(id: number | undefined){
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  public recuperarDados(lista: RespostaTipoBanhoTosa): RespostaTipoBanhoTosa {
    return this.tipoBanhoTosa = lista;
  }

  public excluirRegistro(id: number){
    this.tipoBanhoTosaService.delete(id)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        console.log(res);
        this.sharedService.saveShow("Status Alterado!", "Sucesso!!");
        this.listarTipoBanhoTosa();
      },
      error: (err) => {
        console.log(err);
        this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!")
      },
    });
  }
}
