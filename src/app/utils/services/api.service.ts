import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getMain() {
    return this.http
      .get<any>(`${config.apiUrl}/home`)
      .pipe(map((data) => data.value));
  }
}
