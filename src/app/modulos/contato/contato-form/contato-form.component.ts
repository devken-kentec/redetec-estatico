import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contato-form.component.html',
  styleUrl: './contato-form.component.css'
})
export class ContatoFormComponent {

  //Injeção de Dependencia
  private fb = inject(FormBuilder);

  //Variaveis Locais
  contatoForm: FormGroup;

  constructor(){
    this.contatoForm = this.fb.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mensagem: ['', [Validators.required]]
    });
  }

}
