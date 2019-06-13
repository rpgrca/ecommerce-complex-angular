import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm = this.fb.group({
    email:["", [Validators.required, Validators.minLength(2)]],
    clave:["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    confirmarClave:["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    nombre:["", [Validators.required]],
    apellido:["", [Validators.required]],
    dni:[""],
    telefono:[""]
  })
  message;

  constructor(private fb:FormBuilder, public usr:UsuariosService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    if (this.registerForm['clave'] === this.registerForm['confirmarClave']) {
      this.usr.register(this.registerForm.value)
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
          setTimeout(function() { this.message = null; }, 3000);
        }
      );
    }
  }
}
