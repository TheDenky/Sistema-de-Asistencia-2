import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Institucion } from '../models/institucion';
import { Observable } from 'rxjs';
import { InstitucionComponent } from '../views/institucion/institucion.component';

@Injectable({
  providedIn: 'root',
})
export class InstitucionService {
  constructor(private http: HttpClient) {}

  getinst() {
    return this.http.get('/api/institucion');
  }
  instget(id: string) {
    return this.http.get(`/api/institucion/${id}`);
  }
  deleteInstitucion(id: string) {
    return this.http.delete(`/api/institucion/${id}`);
  }
  saveInstitucion(institucion: Institucion) {
    return this.http.post('/api/institucion', institucion);
  }
  updateInstitucion(
    id: string | number,
    updatedInstitucion: Institucion
  ): Observable<Institucion> {
    return this.http.put(`/api/institucion/${id}`, updatedInstitucion);
  }
}
