import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export default class InvoiceComponent {

}
