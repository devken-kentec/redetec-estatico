import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private toastrService = inject(ToastrService);

  saveShow(mensagem: string, titulo: string){
    this.toastrService.success(mensagem, titulo);
  }

  removeShow(mensagem: string, titulo: string){
    this.toastrService.error(mensagem, titulo)
  }

  warningShow(mensagem: string, titulo: string){
    this.toastrService.warning(mensagem, titulo)
  }

}
