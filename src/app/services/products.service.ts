import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product';
import { api } from '../settings/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);
  private apiUrl: any;

  constructor() {
    this.apiUrl = api.url;
  }

  /** Método para cargar los productos en bd */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + "Productos");
  }


}
