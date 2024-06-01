import { Component, OnInit, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { VeterinaryServicesService } from '../../services/veterinary-services.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Service } from '../../models/service';
import { MatExpansionModule } from '@angular/material/expansion';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [MatDatepickerModule,
    MatCardModule,
    RouterLink,
    FormsModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export default class ScheduleComponent implements OnInit, AfterViewInit {

  /** Inyección de servicios */
  private vetService = inject(VeterinaryServicesService);
  private productsService = inject(ProductsService);

  public dateSelected: Date | null | undefined;

  /** Listamos los servicios agendados */
  public listServices: Service[] = [];

  /** Servicio seleccionado para agendar */
  public serviceSelected: any;
  public idServiceSelected: any;

  /** Servicio a editar */
  public detailsService!: Service;
  public description!: string;
  public prescription!: string;

  /** Lista de productos */
  public product: any;
  public listProducts: Product[] = [];
  public selectedProducts: Product[] = [];

  panelOpenState = false;

  /** Propiedades la tabla de servicios */
  displayedColumns: string[] = [
    'Id',
    'typeService',
    'Date',
    'Price',
    'Description',
    'descDiag',
    'prescDiag',
    'idEmpleado',
  ];
  /** Variables y directivas para controlar la paginación  */
  dataSource = new MatTableDataSource<Service>(this.listServices);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    /** obtenemos el id del servicio seleccionado */
    this.idServiceSelected = this.vetService.getIdService();
  }

  ngOnInit(): void {
    this.getAllServices();
    this.getServiceSelected();
    this.getAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Método para agendar una cita con un servicio
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  getSchedule() {
    if (this.idServiceSelected != null) {

    }
    else {
      this.showAlert('warning', 'Debes seleccionar un servicio antes de agendar');
    }
  }

  /** Método que nos permite listar todos los servicios agendados en bd
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  getAllServices() {
    this.vetService.getServices().subscribe({
      next: (data: Service[]) => {
        this.listServices = data;
        this.dataSource.data = this.listServices;
      },
      error: error => {
        console.log(<any>error);
      }
    })
  }

  /** Método que nos permite listar todos los productos en bd
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  getAllProducts() {
    this.productsService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.listProducts = data;
      },
      error: error => {
        console.log(<any>error);
      }
    })
  }

  /** Método para obtener data del servicio seleccionado por el usuario
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  getServiceSelected() {
    if (this.vetService.getIdService()) {
      this.vetService.getServiceById(this.idServiceSelected).subscribe({
        next: (data: Service) => {
          this.serviceSelected = data;
          console.log(this.serviceSelected);
        },
        error: error => {
          console.log(<any>error);
        }
      })
    }
  }

  /** Método para eliminar el servicio seleccionado por el usuario
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  deleteServiceSelected() {
    localStorage.removeItem('serviceSelected')
    this.showAlert('success', 'Servicio eliminado correctamente.');
  }

  /** Método para seleccionar y guardar productos
   * @author Meyer Usuga Restrepo <theagentsfrontend>
   */
  selectProducts(product: Product) {
    this.selectedProducts.push(product);
  }

  /** Método para eliminar un producto seleccionado
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  deleteProductSelected(product: Product) {
    this.selectedProducts = this.selectedProducts.filter(producto => producto.id !== product.id);
  }

  /** Método para seleccionar un servicio de la tabla
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  selectService(service: Service) {
    this.detailsService = service;
  }

  /** Método para actualizar un servicio agendado 
   * solamente la (prescripcion o descripcion)
   * @author Meyer Usuga Restrepo <theagentsfrontend>
   */
  updateService(option: string) {
    this.vetService.updateService(this.detailsService).subscribe({
      next: response =>{
        if(response.status == 204){
          this.showAlert('success', option + ' añadida con éxito.');
        }
      },
      error: error => {
        console.log(<any>error);
      }
    })
  }

  /** método para filtrar servicios en la tabla de servicios agendados
   * @author Meyer Usuga Restrepo <theagentsfrontend>
   */
  filterService(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Método para mostrar alertas responsive al usuario
   * @author Meyer Usuga Restrepo <theagentsfrontend>
   */
  showAlert(status: any, message: any) {
    return Swal.fire({
      title: 'Información',
      text: message,
      icon: status,
      timer: 2500,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#5EA3FF",
      willClose: () => {
        if (status == 'success') {
          window.location.reload();
        }
      }
    })
  }
}
