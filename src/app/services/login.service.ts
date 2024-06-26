import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  /** Método para obtener el usuario logueado 
   * @author Meyer Usuga Restrepo <theagensfrontend>
  */

  getUser() {
    let user = null;
    user = localStorage.getItem('userlogin');

    return user;
  }

  getProfile() {
    let profile = null;
    profile = localStorage.getItem('userProfile');

    return profile;
  }

  /** Método para crear encabezados con las credenciales
   * y hacer peticiones al backend en el servidor
   * @author Meyer Usuga Restrepo <theagentsfrontend>
   */

  getHeaders(): HttpHeaders {

    /** Definimos credenciales para el api */
    const username = '11178375';
    const password = '60-dayfreetrial';
    let credentials = btoa(username + ':' + password);

    return new HttpHeaders({
      'Content-Type':  'multipart/form-data',
      'Authorization': credentials
    });

  }

  /** Método para hacer una petición al backend
  * y evaluar las credenciales del usuario
  *  @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  loginUsuer(username: any, password: any): Observable<any> {

    /** Definimos los parametros con los datos */
    let params = new HttpParams()
      .set('usuario', username)
      .set('clave', password);

    /** Enviamos la petición */
    return this.http.post<any>(this.apiUrl + 'login', {}, { 
        params: params, 
        observe: 'response' });
  }

  /** Método  para cerrar sesión de un empleado
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  logoutUser() {
    localStorage.clear(); 
  }
}

