import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  VariableGlobal: any;

  constructor(private http: HttpClient) { }
  getUsuario() {
    return this.http.get('/api/usuario');
  }
  usuarioget(id: string) {
    return this.http.get(`/api/usuario/${id}`);
  }
  usuarioLoggedGet(user: string) {
    return this.http.get(`/api/usuario/logged/${user}`);
  }
  deleteUsuario(id: string) {
    return this.http.delete(`/api/usuario/${id}`);
  }
  saveUsuario(usuario: Usuario) {
    return this.http.post('/api/usuario/register', usuario);
  }
  updateUsuario(
    id: string | number,
    updatedUsuario: Usuario
  ): Observable<Usuario> {
    return this.http.put(`/api/usuario/${id}`, updatedUsuario);
  }
}
