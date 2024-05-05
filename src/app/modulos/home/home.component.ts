import { Component } from '@angular/core';
import { ContatoFormComponent } from '../contato/contato-form/contato-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContatoFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
