import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PermisoService {
  constructor(private http: HttpClient) {}

  obper() {
    return this.http.get('/api/permiso');
  }
}
