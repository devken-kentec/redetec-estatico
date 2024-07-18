import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BanhoTosaService } from '../shared/banho-tosa.service';
import { SharedService } from '../../shared/shared.service';
import { RequisicaoBanho, RespostaBanho } from '../../../domain/banho.domain';
import { take } from 'rxjs';
import { ComboBoxAnimal } from '../../../domain/animal.domain';
import { ComboBoxTipoBanhoTosa } from '../../../domain/tipo-banho-tosa.domain';


@Component({
  selector: 'app-banho-tosa-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './banho-tosa-form.component.html',
  styleUrl: './banho-tosa-form.component.css',
  preserveWhitespaces: true
})
export class BanhoTosaFormComponent {
  private fb = inject(FormBuilder);
  private banhoTosaService = inject(BanhoTosaService);
  private route = inject(ActivatedRoute);
  public sharedService = inject(SharedService);

  banhoTosaForm: FormGroup;
  requisicao!: RequisicaoBanho;
  selectAnimal: ComboBoxAnimal[] = [];
  selectTipoBanhoTosa: ComboBoxTipoBanhoTosa[] = [];
  moduloPagamento:boolean = false;
  tituloBanho!: string;
  valorBanho!: number;
  transporteAnimal!: number;
  totalBanho!: number;
  totalBanhoDesconto: number = 0.0;
  animalNome!: string;
  animalHumano!: string;
  inicio!: string;
  statusPagamentoBanho!: string;
  buscar!: boolean;
  entregar!: boolean;
  desconto: number = 0.0;
  adicionarDesconto: boolean = false;

  constructor() {
    this.comboBox();
    this.banhoTosaForm = this.fb.group({
      id: [null],
      inicio: [''],
      statusBanhoTosa: [''],
      status: ['Ativo'],
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
    this.preencherFormulario();
  }

  public preencherFormulario(): void{
    const routeParams = this.route.snapshot.params;

    if(routeParams["id"] > 0){
      this.banhoTosaService.loadById(routeParams["id"]).pipe(
        take(1)
      ).subscribe((res: RespostaBanho)=>{
        this.banhoTosaForm.patchValue(res);
        this.animalNome = res.animalNome;
        this.animalHumano = res.animalHumano;
        this.tituloBanho = res.tipoBanhoDescricao;
        this.valorBanho = res.tipoBanhoValor;
        this.transporteAnimal = res.transporte;
        this.totalBanho = this.valorBanho + this.transporteAnimal;
        this.inicio = res.inicio;
        this.statusPagamentoBanho = res.statusPagamentoBanho;
        this.buscar = res.buscar;
        this.entregar = res.entregar;
        this.desconto = res.desconto;
      });
    }

    if(routeParams["pagamento"] === 'true'){
      this.moduloPagamento = true;
    }
  }

  public verificarTransporte(buscar: boolean, entregar: boolean): number {
    let transporte = 0.0;
    if(entregar === true){
      transporte = 5.0;
    }

    if(buscar === true){
      transporte = 5.0;
    }

    if(buscar === true && entregar === true){
      transporte = 10.0;
    }

    if(buscar === false && entregar === false){
      transporte = 0.0;
    }
    return transporte;
  }

  public permitirDesconto(){
    this.adicionarDesconto = !this.adicionarDesconto;
    this.desconto = this.banhoTosaForm.get('desconto')?.value;
    this.totalBanhoDesconto = this.totalBanho - this.desconto;
  }

  public onSubmit(){
    let form = this.banhoTosaForm;
    let valorViagem = this.verificarTransporte(form.get('buscar')?.value, form.get('entregar')?.value);
    form.get('empresa')?.setValue(1);
    form.get('transporte')?.setValue(valorViagem);
    if(this.moduloPagamento){
      this.banhoTosaForm.get('statusPagamentoBanho')?.setValue('Pago');
      this.statusPagamentoBanho = this.banhoTosaForm.get('statusPagamentoBanho')?.value;
    }
    this.requisicao = {
     id: form.get('id')?.value,
     inicio: form.get('inicio')?.value,
     statusBanhoTosa: form.get('statusBanhoTosa')?.value,
     termino: form.get('termino')?.value,
     observacao: form.get('observacao')?.value,
     animal: form.get('animal')?.value,
     tipoBanhoTosa: form.get('tipoBanhoTosa')?.value,
     status: form.get('status')?.value,
     statusPagamentoBanho: form.get('statusPagamentoBanho')?.value,
     transporte: form.get('transporte')?.value,
     buscar: form.get('buscar')?.value,
     entregar: form.get('entregar')?.value,
     desconto: form.get('desconto')?.value
    }

   if(form.valid){
     this.banhoTosaService.save(this.requisicao).pipe(
       take(1)
     ).subscribe({
         next: (res) => {
           console.log(res);
           this.sharedService.saveShow("Status Alterado!", "Sucesso!!");
         },
         error: (err) => {
           console.log(err);
           this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
         },
     });
   }
   form.reset();
 }

 public comboBox(){
    this.sharedService.comboBoxAnimal().pipe(
      take(1)
    ).subscribe((res: ComboBoxAnimal[])=>{
        this.selectAnimal = res
    });

    this.sharedService.comboBoxTipoBanhoTosa().pipe(
      take(1)
    ).subscribe((res: ComboBoxTipoBanhoTosa[])=>{
        this.selectTipoBanhoTosa = res
    });
   }
}
