import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
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
