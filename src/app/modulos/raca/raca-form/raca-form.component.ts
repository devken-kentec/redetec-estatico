import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RacaService } from '../shared/raca.service';
import { RequisicaoRaca, RespostaRaca } from '../../../domain/raca.domain';
import { take } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

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
  public api = environment.api;
  racaForm: FormGroup;
  requisicao!: RequisicaoRaca;


  constructor(){
    this.racaForm = this.fb.group({
      id: [ null ],
      descricao: [''],
      status: ['']
    });
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
