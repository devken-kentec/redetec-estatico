import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HumanoService } from '../shared/humano.service';
import { SharedService } from '../../shared/shared.service';
import { RequisicaoHumano, RespostaHumano } from '../../../domain/humano.domain';
import { take } from 'rxjs';

@Component({
  selector: 'app-humano-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './humano-form.component.html',
  styleUrl: './humano-form.component.css',
  preserveWhitespaces: true
})
export class HumanoFormComponent {
  private fb = inject(FormBuilder);
  private humanoService = inject(HumanoService);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  humanoForm: FormGroup;
  requisicao!: RequisicaoHumano;

  constructor(){
    this.humanoForm= this.fb.group({
      id: [null],
      nome: [''],
      sobrenome: [''],
      dataNascimento: [''],
      cep: [''],
      endereco: [''],
      complemento: [''],
      fone: [''],
      whatsapp: [''],
      status: ['Ativo'],
      email: [''],
      empresa:['']
    });
    this.preencherFormulario();
  }

  public preencherFormulario(): void{
    const routeParams = this.route.snapshot.params;
    if(routeParams["id"] > 0){
      this.humanoService.loadById(routeParams["id"]).pipe(
        take(1)
      ).subscribe((res: RespostaHumano)=>{
        this.humanoForm.patchValue(res);
      });
    }
  }

  public onSubmit(){
    let form = this.humanoForm;
    form.get('empresa')?.setValue(1);
    this.requisicao = {
     id: form.get('id')?.value,
     nome: form.get('nome')?.value,
     sobrenome: form.get('sobrenome')?.value,
     dataNascimento: form.get('dataNascimento')?.value,
     cep: form.get('cep')?.value,
     endereco: form.get('endereco')?.value,
     complemento: form.get('complemento')?.value,
     fone: form.get('fone')?.value,
     whatsapp: form.get('whatsapp')?.value,
     email: form.get('email')?.value,
     status: form.get('status')?.value,
     empresa: form.get('empresa')?.value,
    }
   if(form.valid){
     this.humanoService.save(this.requisicao).pipe(
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
}
