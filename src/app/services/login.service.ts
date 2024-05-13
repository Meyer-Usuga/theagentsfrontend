import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api } from '../settings/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  public apiUrl: any;


  constructor() {
    this.apiUrl = api.url + "Usuarios/";
  }

  /** Método para generar un token de acceso 
  * @author Meyer Usuga Restrepo <theagensfrontend>
  */

  createToken() {
    let token = '';
    for (let i = 0; i < 10; i++) {
      let number = Math.floor(Math.random() * 50);
      token = token + number;
    }
    return token;
  }

  /** Método para obtener el token de acceso 
  * @author Meyer Usuga Restrepo <theagensfrontend>
  */

  getToken() {
    let token = null;
    token = localStorage.getItem('token');

    return token;
  }

  /** Método para hacer una petición al backend
  * para evaluar las credenciales del usuario
  *  @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  loginUsuer(user: User[]): Observable<any> {

    /** Definimos los parametros  */
    let params = new HttpParams()
      .set('usuario', user[0].username)
      .set('clave', user[0].password);

    /** Enviamos la petición */
    return this.http.post<any>(this.apiUrl + 'login', {}, { params: params });
  }

  /** Método  para cerrar sesión de un empleado
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  logoutUser() {
    localStorage.removeItem('serviceSelected');
    localStorage.removeItem('token');
  }

}

