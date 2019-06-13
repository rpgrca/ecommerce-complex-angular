import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})

export class UsuariosService {
  constructor(private http:HttpClient) {

  }

  login(data) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http.post('http://localhost:5000/usuarios/acceder',
      data, { headers });
  }

  register(data) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http.post('http://localhost:5000/usuarios/registrar',
      data, { headers });
  }

  logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.clear();
    return true;
  }
}
