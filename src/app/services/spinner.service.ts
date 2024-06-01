import { Injectable, inject, signal } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  /** Inyectamos el servicio y creamos una signal */
  private spinnerService = inject(NgxSpinnerService)
  status = signal<boolean>(false);


  /** Método para mostrar el spinner durante una petición http 
  * @author Meyer Usuga Restrepo <theagentsfrontend> 
  */

  showSpinner(){
    this.status.set(true);
    this.spinnerService.show();
  }

  /** Método para ocultar el spinner finalizada una petición
  * @author Meyer Usuga Restrepo <theagentsfrontend> 
  */

  hideSpinner(){
    this.status.set(false);
    this.spinnerService.hide();
  }
}
