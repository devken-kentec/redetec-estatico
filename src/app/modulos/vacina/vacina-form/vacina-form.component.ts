import { ComboBoxAnimal } from './../../../domain/animal.domain';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { VacinaService } from '../shared/vacina.service';
import { SharedService } from '../../shared/shared.service';
import { RequisicaoVacina, RespostaVacina } from '../../../domain/vacina.domain';
import { CommonModule } from '@angular/common';
import { ComboBoxTipoVacina } from '../../../domain/tipo-vacina.domain';

@Component({
  selector: 'app-vacina-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './vacina-form.component.html',
  styleUrl: './vacina-form.component.css'
})
export class VacinaFormComponent {

  private fb = inject(FormBuilder);
  private vacinaService = inject(VacinaService);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  vacinaForm: FormGroup;
  requisicao!: RequisicaoVacina;
  selectAnimal: ComboBoxAnimal[] = [];
  selectTipoVacina: ComboBoxTipoVacina [] = [];

  constructor (){
    this.comboBox();
    this.vacinaForm = this.fb.group({
      id: [null],
      inicio: [''],
      statusVacina: [''],
      status: [''],
      termino: [''],
      observacao: [''],
      animal: [''],
      tipoVacina: ['']
    });
    this.preencherFormulario();
  }

  public preencherFormulario(): void{
    const routeParams = this.route.snapshot.params;
    if (routeParams["id"] > 0) {
      this.vacinaService.loadById(routeParams["id"]).pipe(take(1)
    ).subscribe((res: RespostaVacina)=>{
      this.vacinaForm.patchValue(res);
    })
    }
  }

  public onSubmit(){
    let form = this.vacinaForm;
    form.get('empresa')?.setValue(1);
    this.requisicao = {
      id: form.get('id')?.value,
      inicio: form.get('inicio')?.value,
      statusVacina: form.get('statusVacina')?.value,
      termino: form.get('termino')?.value,
      observacao: form.get('observacao')?.value,
      animal: form.get('animal')?.value,
      tipoVacina: form.get('tipoVacina')?.value,
      status: form.get('status')?.value
    }
    if (form.valid) {
      this.vacinaService.save(this.requisicao).pipe(take(1)
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.sharedService.saveShow("Status Alterado!", "Sucesso!!");
      },
      error: (err) => {
        console.log(err);
        this.sharedService.warningShow("Ops!, Algo Errado!!", "Verifique o Console!");
      }
    });
    }
  }

  public comboBox(){
    this.sharedService.comboBoxAnimal().pipe(take(1)
  ).subscribe((res: ComboBoxAnimal[])=>{
    this.selectAnimal = res
  });

  this.sharedService.comboBoxTipoVacina().pipe(take(1)
).subscribe((res: ComboBoxTipoVacina[])=>{
  this.selectTipoVacina = res
});
  }

}
