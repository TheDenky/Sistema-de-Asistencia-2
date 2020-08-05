import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VacacionService {
  constructor(private http: HttpClient) {}

  vaca() {
    return this.http.get('/api/vacaciones');
  }
}
