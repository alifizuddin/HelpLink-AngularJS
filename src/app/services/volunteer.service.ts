import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VolunteerApplication {
  selectedInterests: string[];
  commitment: string;
  shifts: {
    weekdayMorning: boolean;
    weekdayAfternoon: boolean;
    weekendFullDay: boolean;
    eveningsRemote: boolean;
  };
  formData: {
    fullName: string;
    email: string;
    phone: string;
    state: string;
    district: string;
    motivation: string;
    consent: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private apiUrl = 'http://localhost:3001/api/volunteer';

  constructor(private http: HttpClient) {}

  submitVolunteerApplication(application: VolunteerApplication): Observable<any> {
    return this.http.post(this.apiUrl, application);
  }

  getVolunteerApplications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
