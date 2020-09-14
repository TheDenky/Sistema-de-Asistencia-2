import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permiso } from '../../models/permiso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermisoService {
  constructor(private http: HttpClient) {}

  obper() {
    return this.http.get('/api/permiso');
  }
  obperUser(id: string) {
    return this.http.get(`/api/permiso/my/${id}`);
  }
  getOnePermiso(id: string) {
    return this.http.get(`/api/permiso/${id}`);
  }
  deletePermiso(id: string) {
    return this.http.delete(`/api/permiso/${id}`);
  }
  savePermiso(permiso: Permiso) {
    return this.http.post('/api/permiso', permiso);
  }
  updatePermiso(
    id: string | number,
    updatedPermiso: Permiso
  ): Observable<Permiso> {
    return this.http.put(`/api/permiso/${id}`, updatedPermiso);
  }
}
