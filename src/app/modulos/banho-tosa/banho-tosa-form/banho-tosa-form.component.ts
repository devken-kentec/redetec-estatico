import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BanhoTosaService } from '../shared/banho-tosa.service';
import { SharedService } from '../../shared/shared.service';
import { RequisicaoBanho } from '../../../domain/banho.domain';

@Component({
  selector: 'app-banho-tosa-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './banho-tosa-form.component.html',
  styleUrl: './banho-tosa-form.component.css',
  preserveWhitespaces: true
})
export class BanhoTosaFormComponent {
  private fb = inject(FormBuilder);
  private banhoTosaService = inject(BanhoTosaService);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  banhoTosaForm: FormGroup;
  requisicao!: RequisicaoBanho;
  selectRaca: ComboBoxRaca[] = [];

}
