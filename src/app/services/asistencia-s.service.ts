import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asistencia } from '../models/asistencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaSService {

  constructor(private http: HttpClient) { }
  getAsis() {
    return this.http.get('/api/asistencia');
  }
  asisget(id: string) {
    return this.http.get(`/api/asistencia/${id}`);
  }
  deleteAsistencia(id: string) {
    return this.http.delete(`/api/asistencia/${id}`);
  }
  saveAsistencia(asistencia: Asistencia) {
    return this.http.post('/api/asistencia', asistencia);
  }
  updateAsistencia(
    id: string | number,
    updatedAsistencia: Asistencia
  ): Observable<Asistencia> {
    return this.http.put(`/api/asistencia/${id}`, updatedAsistencia);
  }
}
