import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { TipoVacinaService } from '../shared/tipo-vacina.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequisicaoTipoVacina, RespostaTipoVacina } from '../../../domain/tipo-vacina.domain';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipo-vacina-form',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tipo-vacina-form.component.html',
  styleUrl: './tipo-vacina-form.component.css',
  preserveWhitespaces: true
})
export class TipoVacinaFormComponent {

  private fb = inject(FormBuilder);
  private tipoVacinaService = inject(TipoVacinaService);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  tipoVacinaForm: FormGroup;
  requisicao!: RequisicaoTipoVacina;

  constructor(){
    this.tipoVacinaForm = this.fb.group({
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
      this.tipoVacinaService.loadById(routeParams["id"]).pipe(
        take(1)
      ).subscribe((res: RespostaTipoVacina)=>{
        this.tipoVacinaForm.patchValue(res);
      });
    }
  }

  public onSubmit(){
    let form = this.tipoVacinaForm;
    this.requisicao = {
     id: form.get('id')?.value,
     descricao: form.get('descricao')?.value,
     valor: form.get('valor')?.value,
     status: form.get('status')?.value
    }
   if(form.valid){
     this.tipoVacinaService.save(this.requisicao).pipe(
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
