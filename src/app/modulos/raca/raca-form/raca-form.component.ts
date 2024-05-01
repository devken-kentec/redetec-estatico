import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RacaService } from '../shared/raca.service';
import { RequisicaoRaca, RespostaRaca } from '../../../domain/raca.domain';
import { take } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-raca-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './raca-form.component.html',
  styleUrl: './raca-form.component.css',
  preserveWhitespaces: true
})
export class RacaFormComponent {
  private fb = inject(FormBuilder);
  private racaService = inject(RacaService);
  private route = inject(ActivatedRoute);
  racaForm: FormGroup;
  requisicao!: RequisicaoRaca;


  constructor(){
    this.racaForm = this.fb.group({
      id: [ null ],
      descricao: [''],
      status: ['']
    });
    this.preencherFormulario();
  }

  public preencherFormulario(): void{
    const routeParams = this.route.snapshot.params;
    if(routeParams["id"] > 0){
      this.racaService.loadById(routeParams["id"]).pipe(
        take(1)
      ).subscribe((res: RespostaRaca)=>{
        console.log(res)
        this.racaForm.patchValue({
          id: res.id,
          descricao: res.descricao,
          status: res.status
        });
      });
    }
  }

  public onSubmit(){
     let form = this.racaForm;
     this.requisicao = {
      id: form.get('id')?.value,
      descricao: form.get('descricao')?.value,
      status: form.get('status')?.value
     }
    if(form.valid){
      this.racaService.save(this.requisicao).pipe(
        take(1)
      ).subscribe({
          next: (res) => console.log(res),
          error:(res) => console.log(res)
      });
    }
  }
}
