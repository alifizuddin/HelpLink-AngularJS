import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HelpRequest {
  selectedCategories: string[];
  urgency: string;
  formData: {
    fullName: string;
    phone: string;
    email: string;
    contactMethod: string;
    language: string;
    state: string;
    city: string;
    situation: string;
    consent: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  private apiUrl = 'http://localhost:3000/api/help';

  constructor(private http: HttpClient) {}

  submitHelpRequest(request: HelpRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  getHelpRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
