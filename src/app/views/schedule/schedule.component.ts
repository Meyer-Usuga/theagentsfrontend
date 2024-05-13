import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { VeterinaryServicesService } from '../../services/veterinary-services.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [MatDatepickerModule, MatCardModule, RouterLink],
  providers: [provideNativeDateAdapter()],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export default class ScheduleComponent {

  /** Inyección del servicio */
  private vetService = inject(VeterinaryServicesService)

  public dateSelected: Date | null | undefined;
  public idService: any;

  constructor() {
    this.idService = this.vetService.getIdService();
  }

  /** Método para agendar un servicio 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  scheduleService() {
    if (this.idService != null) {
      //lógica
    }
    else {
      this.showAlert('warning', 'Debes seleccionar un servicio');
    }
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
