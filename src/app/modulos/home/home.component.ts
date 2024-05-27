import { Component } from '@angular/core';
import { ContatoFormComponent } from '../contato/contato-form/contato-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  preserveWhitespaces: true
})
export class HomeComponent {

}
