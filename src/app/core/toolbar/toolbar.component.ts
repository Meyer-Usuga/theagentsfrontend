import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
/** Componentes de angular material */
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from '../../services/login.service';

/** Interfaz para almacenar las rutas */
interface Components {
  name: string
  redirection: string
}

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  /** Inyección del servicio login */
  loginService = inject(LoginService);

  public loggedIn: Components[] = [];
  public withoutLogin: Components[] = [];
  public token: any;
  public username: any;

  constructor() { }

  /** Método que se ejecuta después de cargar el componente 
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  ngOnInit(): void {
    this.getComponents();
    this.token = this.loginService.getToken();
    this.username = 'Meyer'
  }

  /** Método que lista el nombre y el acceso a los componentes
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  getComponents() {

    this.withoutLogin = [
      {
        name: 'Inicio',
        redirection: 'home',
      },
      {
        name: 'Iniciar sesión',
        redirection: 'login'
      },
      {
        name: 'Registrarse',
        redirection: 'register'
      }
    ];

    this.loggedIn = [
      {
        name: 'Servicios',
        redirection: 'veterinary-service'
      },
      {
        name: 'Agendar',
        redirection: 'schdule'
      },
      {
        name: 'Factura',
        redirection: 'invoice'
      },
    ];
  }

 /** Método para cerrar sesión de un usuario  
 * @author Meyer Usuga Restrepo <theagentsfrontend> 
 */

  setLogout() {
    this.loginService.logoutUser();
    this.token = '';
    window.location.reload();
  }

}
