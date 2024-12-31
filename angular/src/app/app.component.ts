import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppComponent {
  constructor() {
  }

  ngOnInit() {
  }
}
