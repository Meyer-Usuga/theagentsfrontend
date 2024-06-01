import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Manager } from '../../models/manager';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-settings-profile',
  standalone: true,
  imports: [FormsModule, MatPaginatorModule],
  templateUrl: './settings-profile.component.html',
  styleUrl: './settings-profile.component.css'
})
export default class SettingsProfileComponent implements OnInit {

  /** Inyeccion de servicios */
  profilesService = inject(ProfileService);
  loginService = inject(LoginService);

  /** Usuario logueado */
  public userLogin: any;

  /** Listas de usuarios, empleados y gerentes */
  public listUsers: User[] = [];
  public listManagers: Manager[] = [];
  public listEmployees: Employee[] = [];

  /** Gerente/Empleado a editar o eliminar */
  public detailsManager!: Manager;
  public detailsEmployee!: Employee;

  /** Variable para controlar el contenido de los modal */
  public optionModal: any;

  constructor() { }

  /** Método que se ejecuta después de que se carga el componente */
  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllManagers();
    this.userLogin = this.loginService.getUser();
  }

  /** Métodos para listar empleados, gerentes de bd
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  getAllManagers() {
    this.profilesService.getManagers().subscribe({
      next: (data: Manager[]) => {
        this.listManagers = data;
        console.log(this.listManagers)
      },
      error: error => {
        console.log(<any>error);
      }
    })
  }

  getAllEmployees() {
    this.profilesService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.listEmployees = data;
        console.log(this.listEmployees);
      },
      error: error => {
        console.log(<any>error);
      }
    })
  }

  /** Métodos que seleccionar empleados, gerentes
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  * @author Diego Alexander Valencia <theagentsfrontend> 
  */

  selectManager(manager: Manager) {
    this.detailsManager = manager;
    this.optionModal = 'optManager';
  }

  selectEmployee(employee: Employee) {
    this.detailsEmployee = employee;
    this.optionModal = 'optEmployee';
  }

  /** Métodos para actualizar empleados, gerentes 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  updateManager(manager: Manager) {
    /** Nos suscribimos al servicio, enviando el objeto con nuevos datos */
    this.profilesService.updateManager(manager).subscribe({
      next: response => {
        if (response.status == 204) {
          window.location.reload();
        }
        else {
          window.alert('Ocurrió un error durante el proceso');
        }
      },
      error: error => {
        console.log(<any>error);
      }
    })
  }

  updateEmployee(employee: Employee) {
      /** Nos suscribimos al servicio, enviando el objeto con nuevos datos */
      this.profilesService.updateEmployee(employee).subscribe({
        next: response =>{
          if(response.status == 204){
            window.location.reload();
          }
          else{
            window.alert('Ocurrió un error durante el proceso');
          }
        },
        error: error =>{
          window.alert('Ocurrió un error durante el proceso');
          console.log(<any>error);        
        }
      })
   }

  /** Métodos para eliminar empleados, gerentes 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  deleteManager(manager: Manager) {
    /** Hacemos la petición mediante el servicio */
    this.profilesService.deleteManager(manager.usuarioId).subscribe({
      next: response => {
        if (response.status == 204) {
          window.location.reload();
        }
      },
      error: error => {
        console.log(<any>error);
      }
    })
  }

  deleteEmployee(employee: Employee) { 
    /** Hacemos la petición mediante el servicio */
    this.profilesService.deleteEmployee(employee.usuarioId).subscribe({
      next: response =>{
        if (response.status == 204) {
          window.location.reload();
        }
      },
      error: error =>{
        console.log(<any>error);
      }
    })    
  }

}
