import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import  packageJson  from '../../package.json';
import { ContatoFormComponent } from './modulos/contato/contato-form/contato-form.component';
import { HomeComponent } from './modulos/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public appVersion!: string;
  public url_atual!: string;
  constructor() {
    this.url_atual = window.location.href;
    console.log(this.url_atual);
    this.appVersion = packageJson.version;
  }
}
