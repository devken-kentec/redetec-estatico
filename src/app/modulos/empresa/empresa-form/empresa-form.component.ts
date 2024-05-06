import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmpresaService } from '../shared/empresa.service';
import { SharedService } from '../../shared/shared.service';
import { RequisicaoEmpresa, RespostaEmpresa } from '../../../domain/empresa.domain';
import { take } from 'rxjs';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.css',
  preserveWhitespaces: true
})
export class EmpresaFormComponent {
  private fb = inject(FormBuilder);
  private empresaService = inject(EmpresaService);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  empresaForm: FormGroup;
  requisicao!: RequisicaoEmpresa;

  constructor(){
    this.empresaForm= this.fb.group({
      id: [null],
      nomeFantasia: [''],
      cep: [''],
      endereco: [''],
      complemento: [''],
      telefone: [''],
      whatsapp: [''],
      status: ['']
    });
    this.preencherFormulario();
  }

  public preencherFormulario(): void{
    const routeParams = this.route.snapshot.params;
    if(routeParams["id"] > 0){
      this.empresaService.loadById(routeParams["id"]).pipe(
        take(1)
      ).subscribe((res: RespostaEmpresa)=>{
        this.empresaForm.patchValue(res);
      });
    }
  }

  public onSubmit(){
    let form = this.empresaForm;
    this.requisicao = {
     id: form.get('id')?.value,
     nomeFantasia: form.get('nomeFantasia')?.value,
     cep: form.get('cep')?.value,
     endereco: form.get('endereco')?.value,
     complemento: form.get('complemento')?.value,
     telefone: form.get('telefone')?.value,
     whatsapp: form.get('whatsapp')?.value,
     status: form.get('status')?.value
    }
   if(form.valid){
     this.empresaService.save(this.requisicao).pipe(
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
}
