import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

/** Función que redirige un usuario al login si
 * no está logueado y no tiene token de acceso
 * @author Meyer Usuga Restrepo <theagensfrontend>
 */

export const authGuard: CanActivateFn = (route, state) => {

  /** Inyectamos el servicio de login */
  const loginService = inject(LoginService);

  /** Inyectamos el router */
  const router = inject(Router);

  if (loginService.getToken()) {
    return true
  }
  else {
    router.navigate(['/login']);
    return false
  }
};

export const profileGuard: CanActivateFn = (route, state) => {

  /** Inyectamos el servicio de login */
  const loginService = inject(LoginService);

  /** Inyectamos el router */
  const router = inject(Router);

  if (loginService.getProfile() === 'Gerente') {
    return true
  }
  else {
    router.navigate(['theagents/']);
    return false
  }
};
