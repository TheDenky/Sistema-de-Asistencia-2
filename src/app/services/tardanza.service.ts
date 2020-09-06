import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tardanza } from '../models/tardanza';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TardanzaService {

  constructor(private http: HttpClient) { }
  getAllTardanza() {
    return this.http.get('/api/tardanza');
  }
  getOneTardanza(id: string) {
    return this.http.get(`/api/institucion/${id}`);
  }
  deleteTardanza(id: string) {
    return this.http.delete(`/api/tardanza/${id}`);
  }
  saveTardanza(tardanza: Tardanza) {
    return this.http.post('/api/tardanza', tardanza);
  }
  updateTardanza(
    id: string | number,
    updatedTardanza: Tardanza
  ): Observable<Tardanza> {
    return this.http.put(`/api/tardanza/${id}`, updatedTardanza);
  }
}
