import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalFormComponent } from '../../modal/modal-form/modal-form.component';
import { AnimalService } from '../shared/animal.service';
import { SharedService } from '../../shared/shared.service';
import { RespostaAnimal } from '../../../domain/animal.domain';
import { take } from 'rxjs';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [RouterModule, ModalFormComponent],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.css',
  preserveWhitespaces: true
})
export class AnimalListComponent {
  private animalService = inject(AnimalService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  listaAnimal: RespostaAnimal[] = [];
  animal!: RespostaAnimal;
  registroDeletado: boolean = true;

  ngOnInit(): void {
    this.listarAnimal();
  }

  public listarAnimal(){
    this.animalService.list().subscribe((res: RespostaAnimal[])=>{
        this.listaAnimal = res
    });
  }

  public editar(id: number | undefined){
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  public recuperarDados(lista: RespostaAnimal): RespostaAnimal {
    return this.animal = lista;
  }

  public excluirRegistro(id: number){
    this.animalService.delete(id)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        console.log(res);
        this.sharedService.saveShow("Status Alterado!", "Sucesso!!");
        this.listarAnimal();
      },
      error: (err) => {
        console.log(err);
        this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!")
      },
    });
  }
}
