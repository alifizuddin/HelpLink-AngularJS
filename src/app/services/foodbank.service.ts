// src/app/services/foodbank.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodbankService {
  private apiUrl = 'http://localhost:3001/search?q=food bank';

  constructor(private http: HttpClient) {}

  getFoodBanks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(results => results.map(item => ({
        name: item.display_name,
        lat: item.lat,
        lon: item.lon
      })))
    );
  }
}
