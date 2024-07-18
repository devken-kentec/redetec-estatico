import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AnimalService } from '../shared/animal.service';
import { SharedService } from '../../shared/shared.service';
import { RequisicaoAnimal, RespostaAnimal } from '../../../domain/animal.domain';
import { take } from 'rxjs';
import { ComboBoxRaca } from '../../../domain/raca.domain';
import { ComboBoxHumano } from '../../../domain/humano.domain';

@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './animal-form.component.html',
  styleUrl: './animal-form.component.css',
  preserveWhitespaces: true
})
export class AnimalFormComponent {
  private fb = inject(FormBuilder);
  private animalService = inject(AnimalService);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  animalForm: FormGroup;
  requisicao!: RequisicaoAnimal;
  selectRaca: ComboBoxRaca[] = [];
  selectHumano: ComboBoxHumano[] = [];

  constructor(){
    this.comboBox();
    this.animalForm= this.fb.group({
      id: [null],
      nome: [''],
      dataNascimento: [''],
      cor: [''],
      porte: [''],
      especie: [''],
      peso: [''],
      sexo: [''],
      foto: [''],
      observacao: [''],
      raca: [''],
      humano: [''],
      empresa:[''],
      status: ['Ativo']
    });
    this.preencherFormulario();
  }

  public preencherFormulario(): void{
    const routeParams = this.route.snapshot.params;
    if(routeParams["id"] > 0){
      this.animalService.loadById(routeParams["id"]).pipe(
        take(1)
      ).subscribe((res: RespostaAnimal)=>{
        this.animalForm.patchValue(res);
      });
    }
  }

  public onSubmit(){
    let form = this.animalForm;
    form.get('empresa')?.setValue(1);
    this.requisicao = {
     id: form.get('id')?.value,
     nome: form.get('nome')?.value,
     dataNascimento: form.get('dataNascimento')?.value,
     cor: form.get('cor')?.value,
     porte: form.get('porte')?.value,
     especie: form.get('especie')?.value,
     peso: form.get('peso')?.value,
     sexo: form.get('sexo')?.value,
     foto: form.get('foto')?.value,
     observacao: form.get('observacao')?.value,
     raca: form.get('raca')?.value,
     humano: form.get('humano')?.value,
     empresa: form.get('empresa')?.value,
     status: form.get('status')?.value
    }
   if(form.valid){
     this.animalService.save(this.requisicao).pipe(
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
    this.sharedService.comboBoxRaca().pipe(
      take(1)
    ).subscribe((res: ComboBoxRaca[])=>{
        this.selectRaca = res
    });

    this.sharedService.comboBoxHumano().pipe(
      take(1)
    ).subscribe((res: ComboBoxHumano[])=>{
        this.selectHumano = res
    });
 }
}
