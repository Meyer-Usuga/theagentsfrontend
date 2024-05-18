import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {

  /** Inyección de servicios */
  loginService = inject(LoginService);
  router = inject(Router);

  public token: any;

  /** Formulario */
  loginForm!: FormGroup;

  /** formBuilder nos permite construir un formulario reactivo */
  constructor(private formBuilder: FormBuilder) {
  }

  /** Método que se ejecuta después de cargar el componente 
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.validateLogin();
  }

  /** Método para loguear un usuario 
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  onSubmit() {
    if (this.loginForm.valid) {

      /** Obtenemos los datos del formulario  */
      let username = this.loginForm.get('username')?.value; 
      let password = this.loginForm.get('password')?.value; 

      /** Usamos el servicio del login enviando los datos */
      this.loginService.loginUsuer(username, password).subscribe({
        next: response => {
          if (response.message == 'Inicio de sesión exitoso') {

            //generamos un token y guardamos datos
            this.token = this.loginService.createToken();
            localStorage.setItem('token', this.token);
            localStorage.setItem('userlogin',username);

            //llevamos al inicio
            const urlTree = this.router.createUrlTree(['theagents/']);
            window.location.href = this.router.serializeUrl(urlTree);
          }
        },
        error: error => {
          console.log(<any>error);
          if (error.status == 401) {
            window.alert('Credenciales inválidas');
          }
        }
      })
    }
    else {
      window.alert('No se llenaron todos los campos');
    }
  }

  /** Método que verifica si el usuario ya está logueado
  * y lo redirige al schdule si ya lo está
  * @author Meyer Usuga Restrepo <theagents>
  */

  validateLogin() {
    if (this.loginService.getToken()) {
      this.router.navigate(['theagents/schdule']);
    }
  }
}
