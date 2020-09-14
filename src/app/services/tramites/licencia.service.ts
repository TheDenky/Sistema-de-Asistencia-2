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
  licenciaget(id: string) {
    return this.http.get(`/api/licencia/${id}`);
  }
  deleteLicencia(id: string) {
    return this.http.delete(`/api/licencia/${id}`);
  }
  saveLicencia(licencia: Licencia) {
    return this.http.post('/api/licencia', licencia);
  }
  
}
