import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import  packageJson  from '../../package.json';
import { HomeComponent } from './modulos/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public appVersion!: string;
  public url_atual!: string;
  private router = inject(Router);
  constructor() {
    this.url_atual = window.location.href;
    console.log(this.url_atual);
    this.appVersion = packageJson.version;
    this.router.navigate(['/home']);
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
  }
}
