import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from '../productos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  imports: [CommonModule,RouterLink]
})
export class DetailsComponent implements OnInit {
  producto;

  constructor(private route: ActivatedRoute, public usrservice:ProductosService) {
  }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      const code = params['code'];

      this.usrservice.getProduct(code).subscribe(datos => {
        this.producto = datos;
      })
    });
  }
}
