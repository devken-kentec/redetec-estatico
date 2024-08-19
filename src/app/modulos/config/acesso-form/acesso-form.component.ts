import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcessoService } from '../shared/acesso.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { ComboBoxHumano } from '../../../domain/humano.domain';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { RequisicaoAcesso, RespostaAcesso } from '../../../domain/acesso.domain';

@Component({
  selector: 'app-acesso-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './acesso-form.component.html',
  styleUrl: './acesso-form.component.css',
  preserveWhitespaces: true
})
export class AcessoFormComponent {
  private fb = inject(FormBuilder);
  private acessoService = inject(AcessoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  acessoForm: FormGroup;
  selectHumano: ComboBoxHumano[] = [];
  requisicao!: RequisicaoAcesso;

  constructor(){
    this.comboBox();
    this.acessoForm = this.fb.group({
      id: ['',[]],
      statusAcesso: ["",[]],
      statusLogin: ["",[]],
      descricao: ["",[]],
      senha: ["",[]],
      pin: ["",[]],
      login: ["",[]],
      nome: ["",[]],
      sobreNome: ["",[]],
      idNome: ['',[]]
    });
    this.preencherFormulario();
  }

  public comboBox(){
    this.sharedService.comboBoxHumano().pipe(
      take(1)
    ).subscribe((res: ComboBoxHumano[])=>{
        this.selectHumano = res
    });
  }

  public onSubmit(){
    let form = this.acessoForm;
    this.requisicao = {
      id: form.get('id')?.value,
      idNome: form.get('idNome')?.value,
      statusAcesso: form.get('statusAcesso')?.value,
      statusLogin: form.get('statusLogin')?.value,
      descricao: form.get('descricao')?.value,
      senha: form.get('senha')?.value,
      pin: form.get('pin')?.value,
      login: form.get('login')?.value,
      nome: form.get('nome')?.value,
      sobreNome: form.get('sobreNome')?.value
    };

    if(form.valid){
      this.acessoService.save(this.requisicao).pipe(
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

 public preencherFormulario(): void{
  const routeParams = this.route.snapshot.params;
  if(routeParams["id"] > 0){
    this.acessoService.loadById(routeParams["id"]).pipe(
        take(1)
      ).subscribe((res: RespostaAcesso)=>{
        this.acessoForm.patchValue(res);
      });
    }
  }
}
