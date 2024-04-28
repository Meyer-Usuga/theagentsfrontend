import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
/** Componentes de angular material */
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';



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
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  public loggedIn: Components[] = [];
  public withoutLogin: Components[] = [];
  public token: any;
  public username: any;

  constructor() { }

  /** Método que se ejecuta después de cargar el componente 
  * @author Meyer Usuga Restrepo
  */
  ngOnInit(): void {
    this.getComponents();
    /** Este token debe ser generado desde el backend, o asignado desde el login */
    this.token = 'KSAJD9ASD8ASDSAJDZZZZKASKYTTTASD';
    this.username = 'Meyer'
  }

  /** Método que lista el nombre y el acceso a los componentes
  * @author Meyer Usuga Restrepo
  */
  getComponents() {

    this.withoutLogin = [
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
        name: 'Inicio',
        redirection: 'home',
      },
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
}
