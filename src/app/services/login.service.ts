import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  /** Método para hacer una petición al backend
 * para evaluar las credenciales del usuario
 * 
 */

  loginUsuer() {
    return 1;
  }

  logoutUser(){
    localStorage.removeItem('serviceSelected');
    localStorage.removeItem('token');
  }

  /** Método para generar un token de acceso 
   * @author Meyer Usuga Restrepo <theagensfrontend>
  */

  createToken(){
    let token = '';
    for(let i=0;i<10;i++){
      let number = Math.floor(Math.random() * 50); 
      token = token + number; 
    } 
    return token; 
  }

  /** Método para obtener el token de acceso 
   * @author Meyer Usuga Restrepo <theagensfrontend>
  */
 
  getToken(){
    let token = null;
    token = localStorage.getItem('token');
    
    return token;
  }

}

