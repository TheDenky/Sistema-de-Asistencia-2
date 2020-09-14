import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacaciones } from 'src/app/models/vacaciones';

@Injectable({
  providedIn: 'root',
})
export class VacacionService {
  constructor(private http: HttpClient) {}

  obtenerAllVacaciones() {
    return this.http.get('/api/vacaciones');
  }
  obtenerAllVacacionesNombres() {
    return this.http.get('/api/vacaciones/ln');
  }
  getOneVacacion(id: string) {
    return this.http.get(`/api/vacaciones/${id}`);
  }
  deleteVacacion(id: string) {
    return this.http.delete(`/api/vacaciones/${id}`);
  }
  saveVacacion(vacaciones: Vacaciones) {
    return this.http.post('/api/vacaciones', vacaciones);
  }
  
}
