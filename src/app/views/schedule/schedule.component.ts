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

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [MatDatepickerModule, MatCardModule, RouterLink, FormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export default class ScheduleComponent implements OnInit{

  /** Inyección de servicios */
  private vetService = inject(VeterinaryServicesService);
  private productsService = inject(ProductsService);

  public dateSelected: Date | null | undefined;
  public idService: any;

  /** Lista de productos */
  public product: any; 
  public listProducts: Product[] = [];
  public selectedProducts: any[] = []; 

  constructor() {
    this.idService = this.vetService.getIdService();
  }

  ngOnInit(): void {
      this.getAllProducts();
  }

  /** Método para agendar un servicio 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  scheduleService() {
    if (this.idService != null) {
      //lógica
    }
    else {
      this.showAlert('warning', 'Debes seleccionar un servicio antes de agendar');
    }
  }


  /** Método que nos permite listar todos los productos */
  getAllProducts(){
    this.productsService.getProducts().subscribe({
      next: (data: Product[]) =>{
        this.listProducts = data; 
        console.log(this.listProducts);
      },
      error: error =>{
        console.log(<any>error);
      }
    })
  }

  /** Método para seleccionar productos 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
   */
  selectProducts(product: Product){
    this.selectedProducts.push(product); 
    console.log(this.selectedProducts); 
    
  }

  /** Método para eliminar un producto seleccionado
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  deleteProductSelected(product: Product){
    //Eliminamos el producto
    this.selectedProducts = this.selectedProducts.filter(producto => producto.id !== product.id);
  }

  /** Método para mostrar un mensaje responsive
   * @author Meyer Usuga Restrepo <theagentsfrontend>
   */
  showAlert(status: any, message: any) {
    return Swal.fire({
      title: 'Información',
      text: message,
      icon: status,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#5EA3FF"
    })
  }


}
