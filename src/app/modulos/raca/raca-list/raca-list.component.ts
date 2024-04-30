import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RacaService } from '../shared/raca.service';
import { RespostaRaca } from '../../../domain/raca.domain';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-raca-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './raca-list.component.html',
  styleUrl: './raca-list.component.css',
  preserveWhitespaces: true
})
export class RacaListComponent implements OnInit {
  private racaService = inject(RacaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  listaRacas: RespostaRaca[] = [];

  ngOnInit(): void {
    this.listarRaca();

  }

  public listarRaca(){
    this.racaService.list().subscribe((res: RespostaRaca[])=>{
        this.listaRacas = res
    });
  }

  public editar(id: number){
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

}
