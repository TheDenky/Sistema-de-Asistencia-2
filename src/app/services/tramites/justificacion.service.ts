import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Justificacion } from '../../models/justificacion';

@Injectable({
  providedIn: 'root',
})
export class JustificacionService {
  constructor(private http: HttpClient) {}
  getjusti() {
    return this.http.get('/api/justificacion');
  }
}
