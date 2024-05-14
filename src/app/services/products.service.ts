import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product';
import { api } from '../settings/api';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient); 
  private apiUrl: any; 

  constructor() { 
    this.apiUrl = api.url + "Productos/";
  }
}
