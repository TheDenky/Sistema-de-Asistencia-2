import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  register(user: {
    username: string;
    estado: string;
    tipo: string;
    password: string;
  }) {
    return this.http.post(`${config.apiUrl}/register`, user);
  }
}
