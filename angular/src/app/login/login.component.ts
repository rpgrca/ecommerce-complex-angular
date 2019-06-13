import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    email:["", [Validators.required, Validators.minLength(2)]],
    clave:["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
  })
  message;

  constructor(private fb:FormBuilder, public usr:UsuariosService, private router: Router) {
  }

  login() {
    this.usr.login(this.loginForm.value)
    .subscribe(
      (data) => {
        if (data['status'] == "success") {
          localStorage.setItem("token", data['data'].token);
          localStorage.setItem("name", data['data'].user.nombre);
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.message = error['error'].message;
        setTimeout(function() { this.message = ""; }, 3000);
      }
    );
  }

  ngOnInit() {
  }

}
