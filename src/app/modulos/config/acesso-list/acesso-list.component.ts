import { Component, inject } from '@angular/core';
import { AcessoService } from '../shared/acesso.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { RespostaAcesso } from '../../../domain/acesso.domain';

@Component({
  selector: 'app-acesso-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './acesso-list.component.html',
  styleUrl: './acesso-list.component.css'
})
export class AcessoListComponent {

  private acessoService = inject(AcessoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sharedService = inject(SharedService);

  listaAcesso: RespostaAcesso[] = [];
  animal!: RespostaAcesso;
  registroDeletado: boolean = true;
  carregando: boolean = false;

  ngOnInit(): void {
    this.listarAcesso();
  }

  public listarAcesso(){
    this.acessoService.list().subscribe((res: RespostaAcesso[])=>{
        this.listaAcesso = res
        this.carregando = true;
    });
  }

  public editar(id: number): void {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }
}
