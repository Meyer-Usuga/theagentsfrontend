import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { api } from '../settings/api';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);
  public apiUrl: any;

  constructor() {
    this.apiUrl = api.url;
  }

  /** Método para traer todos los usuarios de bd
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  getUsers(): Observable<User[]> {

    /** hacemos la petición */
    return this.http.get<User[]>(this.apiUrl + "Usuarios/Get/Usuarios");
  }

  /** Método para traer todos los empleados de bd
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */


  /** Método para traer todos los gerentes de bd
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  /** Método para eliminar un usuario en bd por id 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  deleteUser(idUser: number): Observable<any> {

    /** hacemos la petición enviando el id del usuario */
    return this.http.delete<any>(this.apiUrl + "Usuarios/" + idUser, { observe: 'response' });
  }

  /** Método para eliminar un empleado en bd por id 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  /** Método para eliminar un gerente en bd por id 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  /** Método para modificar un usuario por id  
   * 
  */

  /** Método para editar un usuario por id en bd 
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  * @author Diego Alexander Valencia <theagentsfrontend> 
  */
  updateUser(user: User): Observable<any> {
    /** Capturamos el id */
    const idUser = user.id;
    /** Hacemos la petición */
    return this.http.put<any>(this.apiUrl + 'Usuarios/' + idUser, user, { observe: 'response' })
  }

}
