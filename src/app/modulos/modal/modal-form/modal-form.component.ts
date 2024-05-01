import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent {
  @Input()
  entrada!: any;

  @Output()
  emitirEvento: EventEmitter<number> = new EventEmitter();

  public passarId(id: number): void {
     this.emitirEvento.emit(id);
  }
}
