// src/app/services/job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3000/jobs';

  constructor(private http: HttpClient) {}

  /**
   * Fetch jobs based on query
   * @param query - the search keyword (e.g. developer, designer, etc.)
   */
  getJobs(query: string): Observable<any> {
    const url = `${this.apiUrl}?query=${encodeURIComponent(query)}&country=MY`;
    return this.http.get<any>(url);
  }
}
