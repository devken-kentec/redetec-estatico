import { Component, inject } from '@angular/core';
import { BanhoTosaService } from '../shared/banho-tosa.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { RequisicaoBanho, RespostaBanho } from '../../../domain/banho.domain';
import { take } from 'rxjs';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboBoxAnimal } from '../../../domain/animal.domain';
import { ComboBoxTipoBanhoTosa } from '../../../domain/tipo-banho-tosa.domain';
import { ComboBoxHumano } from '../../../domain/humano.domain';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

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
  selectAnimal: ComboBoxAnimal[] = [];
  selectHumano: ComboBoxHumano[] = [];
  requisicao!: RequisicaoBanho;
  carregando: boolean = false;

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
  }

  ngOnInit(): void {
    this.listarAnimal();
    this.comboBox();
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

  public mostrarFiltroData():void {
    this.mostrarFiltro = !this.mostrarFiltro;
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

   vincularWhatsApp(whatsapp: string, animal: string): string {
    let chamar = "https://wa.me/550"+whatsapp+"?text=Aqui é da KasaPet informamos que " + animal +" está pronto!";
    return chamar;
  }
}
