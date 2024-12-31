import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductosService],
  imports: [RouterLink, CommonModule]  
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
