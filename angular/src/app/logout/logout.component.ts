import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private usr: UsuariosService) {
  }

  ngOnInit() {
    this.usr.logout();
    this.router.navigateByUrl('/');
  }

}
