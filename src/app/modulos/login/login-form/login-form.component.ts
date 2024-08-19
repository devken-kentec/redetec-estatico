import { SharedService } from './../../shared/shared.service';
import { AuthService } from './../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RequisicaoLogin } from '../../../domain/login.domain';
import { take } from 'rxjs';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private authService =  inject(AuthService);
  private sharedService = inject(SharedService);
  private router = inject(Router);
  private loginService = inject(LoginService);

  loginForm: FormGroup;
  login!: RequisicaoLogin;
  verificaNovaSenha: boolean = false;

  constructor(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      gerenciarSenha: [''],
      novaSenha: ['', [Validators.required]],
      repetirSenha: [''],
    });
  }

  public fazerLogin(): void {
    let form = this.loginForm;
    form.get('novaSenha')?.setValue("0000");
    if(form.valid){
        this.login = {
          email: form.get('email')?.value,
          senha: form.get('senha')?.value,
          novaSenha: form.get('novaSenha')?.value
        };
        this.authService.autenticarUsuario(this.login).pipe(take(1)).subscribe({
          next: (res) => {
            if(res.id != null && res.nome != null && res.autenticacao != null && res.descricao != null){
              if(res.autenticacao){
                this.router.navigate(['/home']);
                this.loginService.isAuthenticated(res);
              }
            } else {
              this.sharedService.removeShow("Email ou Senha Incorretos!", "Tente Novamente!");
            }
          },
          error: (err) => {
            console.log(err);
            this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
          },
        });
    }
  }

  public salvarSenha(): void {
    let form = this.loginForm;
    this.login = {
      email: form.get('email')?.value,
      senha: form.get('senha')?.value,
      novaSenha: form.get('novaSenha')?.value
    };
    if(this.loginForm.get('gerenciarSenha')?.value === "recuperar"){
      this.authService.recuperarSenha(this.login).pipe(take(1)).subscribe({
        next: (res) => {
          this.sharedService.saveShow("Nova Senha enviado no Email!", "Recuperação!");
        },
        error: (err) => {
          this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
        }
      });
    } else {
      if(this.verificaNovaSenha){
        this.authService.alterarSenha(this.login).pipe(take(1)).subscribe({
          next: (res) => {
            this.sharedService.saveShow("Senha alterada com sucesso!", "Alteração!");
          },
          error: (err) => {
            this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
          }
        });
      }
    }
    form.reset();
  }

  public validarSenha(): void {
    if(this.loginForm.get('novaSenha')?.status === "VALID" && this.loginForm.get('novaSenha')?.value === this.loginForm.get('repetirSenha')?.value){
      this.verificaNovaSenha = true;
    } else {
      this.verificaNovaSenha = false;
    }
  }
}
