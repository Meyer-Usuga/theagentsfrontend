import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { api } from '../settings/api';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http = inject(HttpClient);
  public apiUrl: any;

  constructor() {
    this.apiUrl = api.url + "Usuarios";
   }

   /** Método para crear un usuario en base de datos
    * @author Meyer Usuga Restrepo <theagentsfrontend>
    */

   createUser(user: User): Observable<any> {
    /** Enviamos el objeto usuario al backend */
    return this.http.post<any>(this.apiUrl, user);
  
   }
}
