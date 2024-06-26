import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../models/service';
import { api } from '../settings/api';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryServicesService {

  private http = inject(HttpClient);
  public apiUrl: any;

  constructor() {
    this.apiUrl = api.url + "Servicios";
  }

  /** Método que obtiene del backend todos los servicios agendados
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  getServices(): Observable<Service[]> {

    /** hacemos la petición */
    return this.http.get<Service[]>(this.apiUrl + '/Get/Servicios');

  }

  /** Método que obtiene un servicio por id 
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  getServiceById(idService: number): Observable<Service> {

    /** hacemos la petición */
    return this.http.get<Service>(this.apiUrl + '/' + idService);
  }

  /** Método que obtiene del localstorage el
  *  servicio seleccionado por el usuario
  * @author Meyer Usuga Restrepo <theagensfrontend>
  */
  getServiceSelected(){

    const service = localStorage.getItem('service');
    /** retornamos nuevamente el json*/
    return JSON.parse(service!);
  }

  /** Método para agendar un nuevo servicio en bd
   * @author Meyer Usuga Restrepo <theagensfrontend>
   */
  createService(service: Service): Observable<any>{
    
    /** establecemos headers para que el backend lo reciba*/
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(service);
    /** hacemos la petición enviando el objeto */
    return this.http.post<any>(this.apiUrl, service, {headers: headers});
  }

  /** Método para actualizar un servicio agendado 
  * @author Meyer Usuga Restrepo <theagensfrontend>
  */

  updateService(service: Service): Observable<any> {
    
    /** Capturamos el id del servicio */
    const idService = service.id;
    /** Hacemos la petición enviando el id y el objeto del servicio */
    return this.http.put<any>(this.apiUrl + '/' + idService, service, { observe: 'response' })
  }
}
