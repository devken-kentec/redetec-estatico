import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';
import { EmpresaService } from '../shared/empresa.service';
import { SharedService } from '../../shared/shared.service';
import { RespostaEmpresa } from '../../../domain/empresa.domain';
import { take } from 'rxjs';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [RouterModule, ModalFormComponent],
  templateUrl: './empresa-list.component.html',
  styleUrl: './empresa-list.component.css',
  preserveWhitespaces: true
})
export class EmpresaListComponent {
  private empresaService = inject(EmpresaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  listaEmpresa: RespostaEmpresa[] = [];
  empresa!: RespostaEmpresa;
  registroDeletado: boolean = true;

  ngOnInit(): void {
    this.listarEmpresa();
  }

  public listarEmpresa(){
    this.empresaService.list().subscribe((res: RespostaEmpresa[])=>{
        this.listaEmpresa = res
    });
  }

  public editar(id: number | undefined){
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  public recuperarDados(lista: RespostaEmpresa): RespostaEmpresa {
    return this.empresa = lista;
  }

  public excluirRegistro(id: number){
    this.empresaService.delete(id)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        console.log(res);
        this.sharedService.saveShow("Status Alterado!", "Sucesso!!");
        this.listarEmpresa();
      },
      error: (err) => {
        console.log(err);
        this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!")
      },
    });
  }
}
