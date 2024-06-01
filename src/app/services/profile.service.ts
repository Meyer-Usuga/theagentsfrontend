import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { api } from '../settings/api';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Manager } from '../models/manager';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);
  public apiUrl: any;

  constructor() {
    this.apiUrl = api.url;
  }

  /** Métodos para traer empleados y gerentes de bd
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  getManagers(): Observable<Manager[]> {
    /** hacemos la petición */
    return this.http.get<Manager[]>(this.apiUrl + "Gerentes/Get/Gerentes");
  }

  getEmployees(): Observable<Employee[]> {
    /** hacemos la petición */
    return this.http.get<Employee[]>(this.apiUrl + "Empleados/Get/Usuarios");
  }

  /** Métodos para eliminar gerentes, empleados
   * @author Meyer Usuga Restrepo <theagentsfrontend>
  */

  deleteManager(idManager: number): Observable<any> {
    /** hacemos la petición enviando el id del usuario */
    return this.http.delete<any>(this.apiUrl + "Gerentes/" + idManager, { observe: 'response' });
  }

  deleteEmployee(idEmployee: number): Observable<any> {
    /** hacemos la petición enviando el id del empleado */
    return this.http.delete<any>(this.apiUrl + "Empleados/" + idEmployee, { observe: 'response' })
  }


  /** Métodos para editar gerentes, empleados por id
  * @author Meyer Usuga Restrepo <theagentsfrontend>
  * @author Diego Alexander Valencia <theagentsfrontend> 
  */
  updateManager(manager: Manager): Observable<any> {
    /** Capturamos el id */
    const idManager = manager.usuarioId;
    /** Hacemos la petición */
    return this.http.put<any>(this.apiUrl + 'Gerentes/' + idManager, manager, { observe: 'response' })
  }

  updateEmployee(employee: Employee): Observable<any> {
    /** capturamos el id */
    const idEmployee = employee.usuarioId;
    /** Hacemos la petición */
    return this.http.put<any>(this.apiUrl + 'Empleados/' + idEmployee, employee, { observe: 'response' })

  }

}
