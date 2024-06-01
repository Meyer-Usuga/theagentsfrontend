import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '../../services/spinner.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

/** interceptor de solucitudes http, donde mostramos el spinner
 * cuando inician y finalizan peticiones al backend
 * @author Meyer Usuga Restrepo <theagentsfrontend>
 */

export const requestInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner = inject(SpinnerService);
  spinner.showSpinner();
  return next(req).pipe(finalize(() => spinner.hideSpinner()));
};
