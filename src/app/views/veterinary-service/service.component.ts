import { Component, OnInit } from '@angular/core';
/** Componentes de angular material */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
/** Interfaz para los servicios de veterinaria */
interface typeService {
  img: any
  name: string
  description: string
  price: string
}

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export default class ServiceComponent implements OnInit {

  public listServices: typeService[] = [];
  /** Variables para controlar el carousel */
  currentPage = 0; //tarjetas actuales
  servicesPerPage = 3; //servicios por página

  constructor() {
  }
  /** Método que se ejecuta después de cargar el componente
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  ngOnInit(): void {
    this.loadServices();
  }

  /** Método para cargar los servicios disponibles
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  loadServices() {
    this.listServices = [
      {
        img: 'assets/img/card-consulta.png',
        name: 'Consulta',
        description: 'Consulta veterinaria estándar',
        price: '50.00$'
      },
      {
        img: 'assets/img/card-peluqueria.png',
        name: 'Peluqueria',
        description: 'Corte de pelo y baño para mascotas',
        price: '40.00$'
      },
      {
        img: 'assets/img/card-vacuna.png',
        name: 'Vacunación',
        description: 'Vacunación preventiva para mascotas',
        price: '35.00$'
      },
      {
        img: 'assets/img/card-ducha.png',
        name: 'Baño general',
        description: 'Baño y limpieza general para mascotas',
        price: '30.00$'
      },
      {
        img: 'assets/img/card-pastillas.png',
        name: 'Desparasitación',
        description: 'Tratamiento para eliminar parásitos internos y externos',
        price: '20.00$'
      },

    ]
  }

  /** Método para mostrar 3 servicios por página del carousel
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  getCurrentServices() {
    /** Calculamos posición inicial y final de esos 3 servicios */
    const startService = this.currentPage * this.servicesPerPage;
    const endService= startService + this.servicesPerPage;

    /** Obtenemos los servicios de listServices desde las posiciones calculadas */
    return this.listServices.slice(startService, endService);
  }

  /** Método para ir a una página siguiente y mostrar servicios 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  nextPage() {
    /** Calculamos el número de páginas total (numeroservicios / serviciosporpagina) */
    const numberPages = this.listServices.length / this.servicesPerPage;

    /** Redondeamos esa variable para que no nos de un número con decimales */
    const numberPagesExactly = Math.ceil(numberPages);

    /** Si la página actual es menor al número de páginas totales me permite avanzar*/
    if (this.currentPage < numberPagesExactly - 1) {
      this.currentPage++;
    }
  }
  /** Método para ir a una página anterior y mostrar servicios
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  prevPage() {
    /** Si la página actual es mayor a cero me permite retroceder */
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
