import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RacaService } from '../shared/raca.service';
import { RespostaRaca } from '../../../domain/raca.domain';

@Component({
  selector: 'app-raca-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './raca-list.component.html',
  styleUrl: './raca-list.component.css'
})
export class RacaListComponent implements OnInit {
  private racaService = inject(RacaService);

  ngOnInit(): void {
    this.listarRaca();
  }

  public listarRaca(){
    this.racaService.list().subscribe((res: RespostaRaca[])=>{
        res.forEach(element => {
          console.log(element)
        });
    });
  }

}
