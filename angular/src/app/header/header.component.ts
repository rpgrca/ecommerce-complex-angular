import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'El Iglú de Roberto';
  name = "";

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.name = localStorage.getItem('name');
  }
}
