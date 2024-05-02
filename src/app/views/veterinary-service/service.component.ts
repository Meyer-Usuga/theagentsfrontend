import { Component, OnInit } from '@angular/core';
/** Componentes de angular material */
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
/** Interfaz para los servicios de veterinaria */
interface typeService{
  img: any
  name: string
  description: string
}

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export default class ServiceComponent implements OnInit {

  public listServices: typeService[] = []; 

  constructor(){
  }

  ngOnInit():void{
    this.loadServices(); 
  }

  loadServices(){
    this.listServices = [
      {
        img: 'assets/img/card-consulta.png',
        name: 'Consulta',
        description: 'Consulta veterinaria estándar'
      },
      {
        img: 'assets/img/card-peluqueria.png',
        name: 'Peluqueria',
        description: 'Corte de pelo y baño para mascotas'
      }, 
      {
        img: 'assets/img/card-vacuna.png',
        name: 'Vacunación',
        description: 'Vacunación preventiva para mascotas'
      }, 
    ]
  }
}
