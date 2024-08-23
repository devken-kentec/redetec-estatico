import { TipoBanhoTosaService } from './../shared/tipo-banho-tosa.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { RequisicaoTipoBanhoTosa, RespostaTipoBanhoTosa } from '../../../domain/tipo-banho-tosa.domain';
import { take } from 'rxjs';

@Component({
  selector: 'app-tipo-banho-tosa-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './tipo-banho-tosa-form.component.html',
  styleUrl: './tipo-banho-tosa-form.component.css',
  preserveWhitespaces: true
})
export class TipoBanhoTosaFormComponent {
  private fb = inject(FormBuilder);
  private tipoBanhoTosaService = inject(TipoBanhoTosaService);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  tipoBanhoTosaForm: FormGroup;
  requisicao!: RequisicaoTipoBanhoTosa;

  constructor(){
    this.tipoBanhoTosaForm = this.fb.group({
      id: [ null ],
      descricao: [''],
      valor:[''],
      status: ['Ativo']
    });
    this.preencherFormulario();
  }

  public preencherFormulario(): void{
    const routeParams = this.route.snapshot.params;
    if(routeParams["id"] > 0){
      this.tipoBanhoTosaService.loadById(routeParams["id"]).pipe(
        take(1)
      ).subscribe((res: RespostaTipoBanhoTosa)=>{
        this.tipoBanhoTosaForm.patchValue(res);
      });
    }
  }

  public onSubmit(){
    let form = this.tipoBanhoTosaForm;
    this.requisicao = {
     id: form.get('id')?.value,
     descricao: form.get('descricao')?.value,
     valor: form.get('valor')?.value,
     status: form.get('status')?.value
    }
   if(form.valid){
     this.tipoBanhoTosaService.save(this.requisicao).pipe(
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
