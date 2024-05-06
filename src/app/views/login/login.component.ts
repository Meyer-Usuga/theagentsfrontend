import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {

  /** Inyección del servicio */
  loginService = inject(LoginService);

  /** Inyección del router */
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
  }

  /** Método para loguear un usuario 
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  onSubmit() {
    if (this.loginForm.valid) {
      
      //lógica para suscribirse al servicio de login
      
      this.token = this.loginService.createToken();
      if (this.token) {
        localStorage.setItem('token', this.token);
      }
      //solucionar bug, que cuando loguea el toolobar no se actualiza
      this.router.navigate(['theagents/']);
    }
    else {
      window.alert('No se llenaron todos los campos');
    }
  }
}
