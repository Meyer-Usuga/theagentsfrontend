import { Component, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { VeterinaryServicesService } from '../../services/veterinary-services.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; 
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [MatDatepickerModule, MatCardModule, RouterLink, FormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export default class ScheduleComponent {

  /** Inyección del servicio */
  private vetService = inject(VeterinaryServicesService)

  public dateSelected: Date | null | undefined;
  public idService: any;

  /** Lista de productos */
  public product: any; 
  public products: Product[] = [];
  public selectedProducts: any[] = []; 

  constructor() {
    this.idService = this.vetService.getIdService();
    this.products = [
      {
        id: 1, 
        name: "Shampoo", 
        price: 17500,  
        cantUse: 1,  
        description: "Pelaje suave y fresco para tus mascotas" 
      },
      {
        id: 2, 
        name: "Wizka", 
        price: 3500,  
        cantUse: 1,  
        description: "Comida para gatos sabor carne" 
      },
      {
        id: 3, 
        name: "Hueso", 
        price: 5500,  
        cantUse: 1,  
        description: "Hueso para perros" 
      }
    ]

    this.product = "s";
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



  getProducts(){

  }

  /** Método para seleccionar productos 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
   */
  selectProducts(product: Product){
    this.selectedProducts.push(product); 
    console.log(this.selectedProducts); 
    
  }

  /** Método para eliminar un producto 
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
