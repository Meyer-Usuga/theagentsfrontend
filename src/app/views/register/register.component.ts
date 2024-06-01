import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {

  /** Inyección del servicio */
  registerService = inject(RegisterService);
  router = inject(Router);

  /** Formulario */
  registerForm!: FormGroup;

  /** Modelo usuario */
  public user!: User; 

  /** Controlamos el sexo */
  public sex: string = ""; 

  constructor(private formBuilder: FormBuilder) {

      /** Definimos validaciones del formulario de registro */
      this.registerForm = this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        sex: ['', Validators.required],
        age: ['', Validators.required]
      });

      /** Instanciamos el objeto usuario que se envia al backend */
      this.user = new User(0,"",0,"","","","",0); 
  }

  /** Método para registrar usuarios con formulario reactivo
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */
  onSubmit(){
    /** Si se llenaron todos los campos */
    if(this.registerForm.valid){

      /** Capturamos el sexo seleccionado */
      this.defineSex();

      /** Enviamos el objeto usuario para la petición al backend */
      this.registerService.createUser(this.user).subscribe({
        next: response =>{
          if(response){
            this.showAlert('success', 'Registro éxitoso.')
          }
          else{
            window.alert('Ocurrió un error durante el registro');
          }
        },
        error: error =>{
          console.log(<any>error);
        }
      })
    }else{
      window.alert('Debes llenar todos los campos del formulario');
    }
  }

  /** Método que obtiene el sexo seleccionado
   * @author Meyer Usuga Restrepo <theagentsfrontend>
   */
  defineSex(){
    const female = document.getElementById('cbFemale') as HTMLInputElement;
    const male = document.getElementById('cbMale') as HTMLInputElement;

    if(female.checked)
      this.user.sexo = 'M';
    if(male.checked)
      this.user.sexo = 'H';
  }


  /** Método para mostrar un mensaje responsive
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
      willClose: () =>{
        if(status == 'success'){
          this.router.navigate(['/login']);
        }
      }
    })
  }
}
