import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Personal } from '../models/personal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  constructor(private http: HttpClient) {}

  getPersonal() {
    return this.http.get('/api/personal');
  }
  getPersonalConsolidado() {
    return this.http.get('/api/personal/cons');
  }
  getPersonalAsistencia() {
    return this.http.get('/api/personal/asis');
  }
  getOnePersonal(id: string) {
    return this.http.get(`/api/personal/${id}`);
  }

  savePersonal(personal: Personal) {
    return this.http.post(`/api/personal`, personal);
  }

  updatePersonal(
    id: string | number,
    updatedPersonal: Personal
  ): Observable<Personal> {
    return this.http.put(`/api/personal/${id}`, updatedPersonal);
  }

  deletePersonal(id: string) {
    return this.http.delete(`/api/personal/${id}`);
  }
}
