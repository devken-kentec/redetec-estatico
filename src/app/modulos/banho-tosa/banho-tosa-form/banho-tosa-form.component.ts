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
  private sharedService = inject(SharedService);

  banhoTosaForm: FormGroup;
  requisicao!: RequisicaoBanho;
  selectAnimal: ComboBoxAnimal[] = [];
  selectTipoBanhoTosa: ComboBoxTipoBanhoTosa[] = [];

  constructor() {
    this.comboBox();
    this.banhoTosaForm = this.fb.group({
      id: [null],
      inicio: [''],
      statusBanhoTosa: [''],
      status: [''],
      termino: [''],
      observacao: [''],
      animal: [''],
      tipoBanhoTosa: ['']
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
      });
    }
  }

  public onSubmit(){
    let form = this.banhoTosaForm;
    form.get('empresa')?.setValue(1);
    this.requisicao = {
     id: form.get('id')?.value,
     inicio: form.get('inicio')?.value,
     statusBanhoTosa: form.get('statusBanhoTosa')?.value,
     termino: form.get('termino')?.value,
     observacao: form.get('observacao')?.value,
     animal: form.get('animal')?.value,
     tipoBanhoTosa: form.get('tipoBanhoTosa')?.value,
     status: form.get('status')?.value
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
