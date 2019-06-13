import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductosService]
})
export class HomeComponent implements OnInit {
  productos;

  constructor(public usrservice:ProductosService) {
  }

  ngOnInit() {
    this.usrservice.getProducts().subscribe(datos => {
      this.productos = datos;
    })
  }
}
