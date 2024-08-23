import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';
import { HumanoService } from '../shared/humano.service';
import { SharedService } from '../../shared/shared.service';
import { RespostaHumano } from '../../../domain/humano.domain';
import { take } from 'rxjs';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-humano-list',
  standalone: true,
  imports: [
    RouterModule,
    ModalFormComponent,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './humano-list.component.html',
  styleUrl: './humano-list.component.css',
  preserveWhitespaces: true
})
export class HumanoListComponent {
  private humanoService = inject(HumanoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);
  private fb = inject(FormBuilder);

  listaHumano: RespostaHumano[] = [];
  humano!: RespostaHumano;
  registroDeletado: boolean = true;
  carregando: boolean = false;
  paginaForm: FormGroup;
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;
  pesquisa: string = '';
  ativaCampoPesquisa: boolean = false;

  constructor(){
    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
    });
  }

  ngOnInit(): void {
    //this.listarHumano();
    this.totalListaHumano();
    this.listarHumanoPaginada(this.pagina, this.tamanho);
  }

  public totalListaHumano(): void {
    this.humanoService.fullList().pipe(take(1)).subscribe((res: number)=>{
      this.totalElements = res;
    });
  }

  public listarHumano(){
    this.humanoService.list().subscribe((res: RespostaHumano[])=>{
        this.listaHumano = res
        this.carregando = true;
    });
  }

  public fecharPesquisa(): void {
    if(this.ativaCampoPesquisa === false){
      this.ativaCampoPesquisa = !this.ativaCampoPesquisa;
    } else {
      this.ativaCampoPesquisa = !this.ativaCampoPesquisa;
      this.listarHumanoPaginada(this.pagina, this.tamanho);
      this.pesquisa = "";
    }
  }

  public pesquisarHumano() {
    if(this.pesquisa !== "" && this.pesquisa.length > 0){
      this.humanoService.searchPage(this.pagina, this.tamanho, this.pesquisa).pipe(
        take(1)
      ).subscribe((response: RespostaHumano[])=> {
          this.listaHumano = response;
          this.carregando = true;
          if(this.totalElements > this.paginaForm.get('quantPag')?.value){
            this.totalPages = this.totalElements/this.paginaForm.get('quantPag')?.value;
          } else {
            this.totalPages = 1;
          }
        }
      );
    }
  }

  public listarHumanoPaginada(page: number, size: number){
    this.humanoService.listPage(page, size).pipe(
      take(1)
    ).subscribe((response: RespostaHumano[])=> {
        this.listaHumano = response;
        this.carregando = true;
        if(this.totalElements > this.paginaForm.get('quantPag')?.value){
          this.totalPages = this.totalElements/this.paginaForm.get('quantPag')?.value;
        } else {
          this.totalPages = 1;
        }
      }
    );
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

  public paginaMenor(): void {
    if(this.pagina <= 0){
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
    this.listarHumanoPaginada(this.pagina, this.paginaForm.get('quantPag')?.value);
  }

  public paginaMaior(): void {
    if(this.totalPages > 1){
      this.pagina = this.pagina + 1;
      this.listarHumanoPaginada(this.pagina, this.paginaForm.get('quantPag')?.value);
    }
  }

  public atualizaPagina(): void {
    this.pagina = 0
    this.listarHumanoPaginada(this.pagina, this.paginaForm.get('quantPag')?.value);
  }
}
