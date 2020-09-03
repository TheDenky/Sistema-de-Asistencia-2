import { Injectable } from '@angular/core';
import { getMatFormFieldPlaceholderConflictError } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  constructor(private http: HttpClient) {}
  getunreporte(id: string) {
    return this.http.get(`/api/asistencia/${id}`);
  }
  getreporte() {
    return this.http.get('/api/asistencia');
  }
}
