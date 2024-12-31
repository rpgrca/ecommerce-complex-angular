import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterLink]
})

export class HeaderComponent implements OnInit {
  title = 'El Iglú de Roberto';
  name = "";
  page: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.page = this.route.snapshot.paramMap.get('page') || '';
  }

  ngDoCheck() {
    this.name = localStorage.getItem('name');
  }
}
