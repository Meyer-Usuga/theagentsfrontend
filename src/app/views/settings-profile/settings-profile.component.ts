import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-settings-profile',
  standalone: true,
  imports: [FormsModule,MatPaginatorModule],
  templateUrl: './settings-profile.component.html',
  styleUrl: './settings-profile.component.css'
})
export default class SettingsProfileComponent implements OnInit {

  /** Inyeccion de servicios */
  profilesService = inject(ProfileService);
  loginService = inject(LoginService);

  /** Lista de usuarios */
  public listUsers: User[] = [];
  /** Usuario logueado */
  public userLogin: any;
  /** Usuario a editar o eliminar */
  public detailsUser!: User; 

  constructor() { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllEmployees();
    this.getAllManagers();
    this.userLogin = this.loginService.getUser();
  }


  /** Método que selecciona el usuario para editar, o eliminar 
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  * @author Diego Alexander Valencia <theagentsfrontend> 
  */

  selectUser(user:User){
    this.detailsUser = user; 
  }

  /** Método que nos lista todos los usuarios en bd 
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  getAllUsers() {
    this.profilesService.getUsers().subscribe({
      next: (data: User[]) => {
        this.listUsers = data;
      },
      error: error => {
        console.log(<any>error);
      }
    })
  }

  getAllEmployees() { }

  getAllManagers() { }

  /** Método que nos permite eliminar un usuario por id
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  deleteUser(user: User) {
    /** Validamos que no se elimine el usuario que esta logueado */
      /** Hacemos la petición mediante el servicio */
      this.profilesService.deleteUser(user.id).subscribe({
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

  deleteEmployee(){}

  deleteManager(){}


  /** Método que nos permite editar un usuario por id  
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  * @author Diego Alexander Valencia <theagentsfrontend> 
  */

  updateUser(user: User){
    /** Nos suscribimos al servicio, enviando el objeto con nuevos datos */
    this.profilesService.updateUser(user).subscribe({
      next: response =>{
        if(response.status == 204){
          window.location.reload();
        }
        else{
          window.alert('Ocurrió un error durante el proceso');
        }
      },
      error: error=>{
        console.log(<any>error); 
      }
    })
  }

}
