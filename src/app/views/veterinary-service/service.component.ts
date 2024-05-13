import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
/** Componentes de angular material */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VeterinaryServicesService } from '../../services/veterinary-services.service';
import { Service } from '../../models/service';

/** Interfaz para los servicios de veterinaria */
interface typeService {
  id: string
  img: any
  name: string
  price: string
  description: string
}

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [MatButtonModule, MatCardModule,RouterLink],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export default class ServiceComponent implements OnInit {

  /** Inyectamos servicios */
  private vetServices = inject(VeterinaryServicesService);
  router = inject(Router);

  public listServices: typeService[] = [];
  public services: Service[] = [];

  /** Variables para controlar el carousel */
  public currentPage = 0; //tarjetas actuales
  public servicesPerPage = 3; //servicios por página

  constructor() {
  }
  /** Método que se ejecuta después de cargar el componente
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  ngOnInit(): void {
    this.loadServices();
    this.getServices();
  }

  /** Método para cargar los servicios disponibles
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  loadServices() {
    this.listServices = [
      {
        id: '1',
        img: 'assets/img/card-consulta.png',
        name: 'Consulta',
        price: '50.00$',
        description: 'Consulta veterinaria estándar'
      },
      {
        id: '2',
        img: 'assets/img/card-peluqueria.png',
        name: 'Peluqueria',
        price: '40.00$',
        description: 'Corte de pelo y baño para mascotas'
      },
      {
        id: '3',
        img: 'assets/img/card-vacuna.png',
        name: 'Vacunación',
        price: '35.00$',
        description: 'Vacunación preventiva para mascotas'
      },
      {
        id: '4',
        img: 'assets/img/card-ducha.png',
        name: 'Baño general',
        price: '30.00$',
        description: 'Baño y limpieza general para mascotas',
      },
      {
        id: '5',
        img: 'assets/img/card-pastillas.png',
        name: 'Desparasitación',
        price: '20.00$',
        description: 'Tratamiento para eliminar parásitos internos y externos',
      },

    ]
  }

  /** Método que obtiene todos los servicios
   *  registrados desde el backend
   * @author Meyer Usuga Restrepo <theagentsfrontend>
   */
  getServices(){
    this.vetServices.getServices().subscribe({
      next: (data: Service[]) => {
        this.services = data; 
        console.log(this.services); 
      },
      error: error =>{
        console.log(<any>error);
      }
    })
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

  /** Método para redirigir un empleado al agendamiento
   * guardando el id del servicio seleccionado
   * @author Meyer Usuga Restrepo <theagentsfrontend> 
   */
  goScheduleService(service: any){
    let idService = service.id;
    localStorage.setItem('serviceSelected', idService); 
    this.router.navigate(['/theagents/schdule/']);
  }
}
