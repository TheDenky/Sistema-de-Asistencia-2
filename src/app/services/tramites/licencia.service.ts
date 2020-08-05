import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../../models/personal';
import { Licencia } from '../../models/licencia';
@Injectable({
  providedIn: 'root',
})
export class LicenciaService {
  constructor(private http: HttpClient) {}

  getLice() {
    return this.http.get('/api/licencia');
  }
  getDNI() {
    return this.http.get('/api/personal');
  }
}
