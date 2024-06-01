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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

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
    MatInputModule,
    MatTabsModule,
    MatIconModule],
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
  public service: Service;
  public selectedService: any

  /** Servicio a editar */
  public detailsService!: Service;
  public attendant!: string;
  public pattient!: string;

  /** Lista de productos */
  public addedProduct: Product;
  public totalProducts: number = 0;
  public cantProducts: number = 0;
  public listProducts: Product[] = [];
  public selectedProducts: Product[] = [];

  panelOpenState = true;

  /** Propiedades para la tabla de citas */
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
    /** instanciamos un objetos para enviar al backend */
    this.service = new Service(0, "", "", 0, "", 0, null, null, null, null, null);
    this.addedProduct = new Product(0,"",0,0,"","");
    
  }

  ngOnInit(): void {
    this.getAllServices();
    this.getServiceSelected();
    this.getAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Método para agendar una cita con un servicio */
  setSchedule(form: any) {
    if (this.selectedService != null) {
      if (form.valid) {
        this.vetService.createService(this.service).subscribe({
          next: response => {
            if (response) {
              this.showAlert('success', 'Se agendó el servicio correctamente.');
              localStorage.removeItem('service');
            }
          },
          error: error => {
            console.log(<any>error)
          }
        })
      }
      else {
        this.showAlert('warning', 'Se encontraron campios vacíos');
      }
    }
    else {
      this.showAlert('warning', 'Debes seleccionar un servicio antes de agendar');
    }
  }

  /** Método que nos permite listar todos las citas y servicios en bd */
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

  /** Método que nos permite listar todos los productos en bd */
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

  /** Método para obtener data del servicio seleccionado por el usuario */
  getServiceSelected() {
    if (localStorage.getItem('service')) {
      this.selectedService = this.vetService.getServiceSelected();
      /** lo asignamos al objeto del servicio */
      this.service.tipoServicio = this.selectedService.name;
      this.service.descripcion = this.selectedService.description;
      this.service.precio = Number(this.selectedService.price);
    }
  }

  /** Método para eliminar el servicio seleccionado por el usuario */
  deleteServiceSelected() {
    localStorage.removeItem('service');
    this.showAlert('success', 'Servicio eliminado correctamente.');
  }

  /** Método para seleccionar productos*/
  selectProducts(product: Product) {
    this.addedProduct = product;
  }

  /** Método para añadir productos al carrito */
  addProducts(){
    let isAdded = this.selectedProducts.some(producto => producto.id === this.addedProduct.id);
    if (isAdded == false) {
      this.selectedProducts.push(this.addedProduct);
      this.totalProducts += this.addedProduct.precio * this.addedProduct.cantUso;
      this.cantProducts++;
      this.showAlert('info', 'Producto añadido la lista.');
    }
    else {
      this.showAlert('error', 'Ya agregaste este producto.');
    }
    console.log(this.selectedProducts)
  }

  /** Método para eliminar un producto seleccionado */
  deleteProductSelected(product: Product) {
    this.totalProducts -= product.precio * product.cantUso;
    this.cantProducts--;
    this.selectedProducts = this.selectedProducts.filter(producto => producto.id !== product.id);

  }

  /** Método para guardar los productos */
  saveProducts() {
    this.service.precio += this.totalProducts;
    console.log(this.service.precio)
    if (this.selectedProducts.length > 0) {
      this.showAlert('info', 'Productos guardados con éxito.')
    }
    else {
      this.showAlert('error', 'No tienes productos por guardar.');
    }
  }

  /** Método para seleccionar un servicio agendado de la tabla
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  selectService(service: Service) {
    this.detailsService = service;
  }

  /** Método para actualizar un servicio agendado */
  updateService(option: string) {
    this.vetService.updateService(this.detailsService).subscribe({
      next: response => {
        if (response.status == 204) {
          this.showAlert('success', option + ' añadida con éxito.');
        }
      },
      error: error => {
        console.log(<any>error);
      }
    })
  }

  /** método para filtrar servicios en la tabla de servicios agendados */
  filterService(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Método para mostrar alertas responsive al usuario */
  showAlert(status: any, message: any) {
    return Swal.fire({
      title: 'Información',
      text: message,
      icon: status,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#5EA3FF",
    }).then((result) => {
      if (result.isConfirmed) {
        if (status == 'success') {
          window.location.reload();
        }
      }
    })
  }
}
