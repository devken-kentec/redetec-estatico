import { Component, inject } from '@angular/core';
import { BanhoTosaService } from '../shared/banho-tosa.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { RequisicaoBanho, RespostaBanho } from '../../../domain/banho.domain';
import { take } from 'rxjs';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboBoxAnimal } from '../../../domain/animal.domain';
import { ComboBoxHumano } from '../../../domain/humano.domain';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { RespostaPaginacao } from '../../../domain/paginacao.domian';

@Component({
  selector: 'app-banho-tosa-list',
  standalone: true,
  imports: [
      RouterModule,
      ModalFormComponent,
      ReactiveFormsModule,
      FormsModule,
      NgxMaskDirective,
      NgxMaskPipe],
  templateUrl: './banho-tosa-list.component.html',
  styleUrl: './banho-tosa-list.component.css',
  preserveWhitespaces: true
})
export class BanhoTosaListComponent {
  private fb = inject(FormBuilder);
  private banhoTosaService = inject(BanhoTosaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public sharedService = inject(SharedService);

  banhoTosaForm!: FormGroup;
  listaBanhoTosa: RespostaBanho[] = [];
  banhoTosa!: RespostaBanho;
  registroDeletado: boolean = true;
  mostrarFiltro: boolean = false;
  selectAnimal?: ComboBoxAnimal[] = [];
  selectHumano: ComboBoxHumano[] = [];
  requisicao!: RequisicaoBanho;
  carregando: boolean = false;
  mostrarPaginacao: boolean = false;
  paginaForm: FormGroup;
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;
  valorTotalBanhoDia?: number = 0;

  constructor(){
    this.banhoTosaForm = this.fb.group({
      id: [null],
      inicio: [''],
      statusBanhoTosa: [''],
      status: [''],
      termino: [''],
      observacao: [''],
      animal: [''],
      tipoBanhoTosa: [''],
      statusPagamentoBanho: [''],
      transporte: [''],
      buscar: [''],
      entregar: [''],
      desconto: [''],
    });

    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
    });
  }

  ngOnInit(): void {
    this.totalListaHumano();
    this.listarAnimal();
    this.calculoValorBanhoDia();
    this.comboBox();
  }

  public totalListaHumano(): void {
    this.banhoTosaService.fullList().pipe(take(1)).subscribe((res: number)=>{
      this.totalElements = res;
    });
  }

  public calculoValorBanhoDia(): void {
    this.banhoTosaService.listarValorBanhoDia().pipe(take(1)).subscribe((res: number)=>{
      this.valorTotalBanhoDia = res;
    });
  }

  public calcularValorTotalBanho(valorBanho: number, transporte: number, desconto: number): number {
    let valorTotal = valorBanho + transporte - desconto;
    return valorTotal
  }

  public listarAnimal(){
    this.banhoTosaService.list().pipe(take(1)).subscribe((res: RespostaBanho[])=>{
        this.listaBanhoTosa = res;
        this.carregando = true;
    });
  }

  public filtrarBanhoAnimalStatusPagamento(){
      let animal = this.banhoTosaForm.get('animal')?.value;
      let statusPagamentoBanho = this.banhoTosaForm.get('statusPagamentoBanho')?.value;

    this.banhoTosaService.listCustomAnimalStatusPagamento(animal, statusPagamentoBanho).pipe(take(1)).subscribe((res: RespostaBanho[])=>{
      this.listaBanhoTosa = res
    });
  }

  public filtrarBanhoData(){
    let inicio = this.banhoTosaForm.get('inicio')?.value;
    this.banhoTosaService.listCustomData(inicio).pipe(take(1)).subscribe((res: RespostaBanho[])=>{
    this.listaBanhoTosa = res
  });
 }

public filtrarBanhoStatusPagamento(){
  let statusPagamentoBanho = this.banhoTosaForm.get('statusPagamentoBanho')?.value;
  this.banhoTosaService.listCustomStatusPagamento(statusPagamentoBanho).pipe(take(1)).subscribe((res: RespostaBanho[])=>{
    this.listaBanhoTosa = res
  });
}

public filtrarBanhoStatusInativo(){
  this.banhoTosaService.listCustomBanhoInativo().pipe(take(1)).subscribe((res: RespostaBanho[])=>{
    this.listaBanhoTosa = res
  });
}

public filtrarBanhoAnimalStatusPagamentoPage(page: number, size: number){
  let animal = this.banhoTosaForm.get('animal')?.value;
  let statusPagamentoBanho = this.banhoTosaForm.get('statusPagamentoBanho')?.value;

this.banhoTosaService.listCustomAnimalStatusPagamentoPage(page, size, animal, statusPagamentoBanho)
.pipe(take(1))
.subscribe((res: RespostaBanho[])=>{
    this.carregando = true;
    this.listaBanhoTosa = res;
    if(this.totalElements > this.paginaForm.get('quantPag')?.value){
      this.totalPages = this.totalElements/this.paginaForm.get('quantPag')?.value;
    } else {
      this.totalPages = 1;
    }
  });
}

public filtrarBanhoDataPage(page: number, size: number){
  let inicio = this.banhoTosaForm.get('inicio')?.value;
  this.banhoTosaService.listCustomDataPage(page, size, inicio).pipe(take(1)).subscribe((res: RespostaBanho[])=>{
    this.carregando = true;
    this.listaBanhoTosa = res;
    if(this.totalElements > this.paginaForm.get('quantPag')?.value){
      this.totalPages = this.totalElements/this.paginaForm.get('quantPag')?.value;
    } else {
      this.totalPages = 1;
    }
  });
}

public filtrarBanhoStatusPagamentoPage(page: number, size: number){
  let statusPagamentoBanho = this.banhoTosaForm.get('statusPagamentoBanho')?.value;
  this.banhoTosaService.listCustomStatusPagamentoPage(page, size, statusPagamentoBanho).pipe(take(1)).subscribe((res: RespostaBanho[])=>{
    this.carregando = true;
    this.listaBanhoTosa = res;
    if(this.totalElements > this.paginaForm.get('quantPag')?.value){
      this.totalPages = this.totalElements/this.paginaForm.get('quantPag')?.value;
    } else {
      this.totalPages = 1;
    }
  });
}

public filtrarBanhoStatusInativoPage(page: number, size: number){
  this.banhoTosaService.listCustomBanhoInativoPage(page, size).pipe(take(1)).subscribe((res: RespostaBanho[])=>{
    this.carregando = true;
    this.listaBanhoTosa = res;
    if(this.totalElements > this.paginaForm.get('quantPag')?.value){
      this.totalPages = this.totalElements/this.paginaForm.get('quantPag')?.value;
    } else {
      this.totalPages = 1;
    }
  });
}

public mostrarFiltroData():void {
  this.mostrarFiltro = !this.mostrarFiltro;
  this.mostrarPaginacao = !this.mostrarPaginacao;
}

public editar(id: number | undefined):void {
  this.router.navigate(["edit", id], { relativeTo: this.route });
}

public fecharPagamento(id: number | undefined){
  this.router.navigate(["finish", id, true], { relativeTo: this.route });
}

public recuperarDados(lista: RespostaBanho): RespostaBanho {
  return this.banhoTosa = lista;
}

public excluirRegistro(id: number):void {
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

public comboBox(){
  this.sharedService.comboBoxAnimal().pipe(
    take(1)
  ).subscribe((res: ComboBoxAnimal[])=>{
      this.selectAnimal = res
  });

  this.sharedService.comboBoxHumano().pipe(
    take(1)
  ).subscribe((res: ComboBoxHumano[])=>{
      this.selectHumano = res
  });
  }

public vincularWhatsApp(whatsapp: string, animal: string): string {
  let chamar = "https://wa.me/550"+whatsapp+"?text=Aqui é da KasaPet informamos que " + animal +" está pronto!";
  return chamar;
}

public paginaMenor(): void {
  if(this.pagina <= 0){
    this.pagina = 0;
  } else {
    this.pagina = this.pagina - 1;
  }
  this.filtrarBanhoAnimalStatusPagamentoPage(this.pagina, this.paginaForm.get('quantPag')?.value);
}

public paginaMaior(): void {
  if(this.totalPages > 1){
    this.pagina = this.pagina + 1;
    this.filtrarBanhoAnimalStatusPagamentoPage(this.pagina, this.paginaForm.get('quantPag')?.value);
  }
}

public atualizaPagina(): void {
  this.pagina = 0
  this.filtrarBanhoAnimalStatusPagamentoPage(this.pagina, this.paginaForm.get('quantPag')?.value);
}
}
