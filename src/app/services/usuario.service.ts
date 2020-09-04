import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  getUsuario() {
    return this.http.get('/api/usuario');
  }
  usuarioget(id: string) {
    return this.http.get(`/api/usuario/${id}`);
  }
  deleteUsuario(id: string) {
    return this.http.delete(`/api/usuario/${id}`);
  }
  saveUsuario(usuario: Usuario) {
    return this.http.post('/api/usuario', usuario);
  }
  updateUsuario(
    id: string | number,
    updatedUsuario: Usuario
  ): Observable<Usuario> {
    return this.http.put(`/api/usuario/${id}`, updatedUsuario);
  }
}