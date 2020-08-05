import { Injectable } from '@angular/core';
import { registro } from '../models/registro';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private http: HttpClient) {}

  getper() {
    return this.http.get('/api/personal');
  }
}
