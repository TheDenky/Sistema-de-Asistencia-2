import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Institucion } from '../models/institucion';
import { Observable } from 'rxjs';

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
}
