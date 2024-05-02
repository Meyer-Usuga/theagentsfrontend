import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryServicesService {

  constructor() { }

  /** Método que obtiene del localstorage el id
   * del servicio seleccionado por el usuario
   * @author Meyer Usuga Restrepo <theagensfrontend>
   */
  getIdService() {
    let idService = localStorage.getItem('idServicio');
    return idService
  }
}
