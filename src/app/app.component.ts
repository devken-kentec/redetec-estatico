import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import  packageJson  from '../../package.json';

import { LoginService } from './modulos/login/shared/login.service';
import { LoginFormComponent } from './modulos/login/login-form/login-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public appVersion!: string;
  public url_atual!: string;
  private router = inject(Router);
  private loginService = inject(LoginService);

  mostrarMenu: boolean = false;
  userId!: number;
  userName!: string;
  tipoUser!: string;
  role!: string[];
  animal: boolean = false;
  humano: boolean = false;
  raca: boolean = false;
  tipoBanho: boolean = false;
  banho: boolean = false;
  statusBanho: boolean = false;
  tipoVacina: boolean = false;
  vacina: boolean = false;
  outros: boolean = false;
  config: boolean = false;

  constructor() {
    this.url_atual = window.location.href;
    if(this.url_atual === 'https://kasapet.kentec.com.br/login' || this.url_atual === 'http://localhost:4200/login'){
      this.router.navigate(['https://kasapet.kentec.com.br/']);
    }
    this.appVersion = packageJson.version;
  }

  ngOnInit(): void {
    //const TOKEN = localStorage.getItem("TOKEN");
    this.router.navigate(['/login']);
    this.loginService.xF45A.subscribe({
      next: (res: boolean) => {
        this.mostrarMenu = res;
        this.loginService.xFF3L.subscribe(res => this.userName = res);
        this.loginService.X97AI.subscribe(res => this.userId = res);
        this.loginService.x025D.subscribe((res: string[] )=>{
            res.forEach(element => {
              if(element === 'DEV'){
                this.animal = true;
                this.humano = true;
                this.raca = true;
                this.tipoBanho = true;
                this.banho = true;
                this.statusBanho = true;
                this.tipoVacina = true;
                this.vacina = true;
                this.outros = true;
                this.config = true;
               }

              if(element === 'ADM'){
                this.animal = true;
                this.humano = true;
                this.raca = true;
                this.tipoBanho = true;
                this.banho = true;
                this.statusBanho = true;
                this.tipoVacina = true;
                this.vacina = true;
                this.outros = true;
                this.config = true;
               }

               if(element === 'BANHO'){
                this.animal = false;
                this.humano = false;
                this.raca = false;
                this.tipoBanho = false;
                this.banho = false;
                this.statusBanho = true;
                this.tipoVacina = false;
                this.vacina = false;
                this.outros = true;
                this.config = false;
               }
              });
            });
      },
      error: (err: boolean)  => {
        console.log(err);
        this.router.navigate(['/login']);
      },
    });
    // if(TOKEN === null || TOKEN === 'null'){
    //   let recebeToken = prompt("Informar o TOKEN de acesso!");
    //   if(recebeToken != null){
    //     localStorage.setItem("TOKEN", recebeToken);
    //   }
    // }
  }

  public sair(): void {
    this.mostrarMenu = false;
    this.router.navigate(['/login']);
  }

  public navegarPara(onde: string){
    if(onde === 'humano'){
      this.router.navigate(['humano']);
    }

    if(onde === 'raca'){
      this.router.navigate(['raca']);
    }

    if(onde === 'animal'){
      this.router.navigate(['animal']);
    }

    if(onde === 'tipoBanho'){
      this.router.navigate(['tipo-banho']);
    }

    if(onde === 'banhoTosa'){
      this.router.navigate(['banho']);
    }

    if(onde == 'statusBanho'){
      this.router.navigate(['banho/status/banho']);
    }

    if(onde === 'config'){
      this.router.navigate(['config']);
    }
  }
}
