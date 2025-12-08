import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/db.model';
const baseUrl = 'http://localhost:8080/api/appointments';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  httpClient: HttpClient;
  constructor(private http: HttpClient) { this.httpClient  = http;}

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(baseUrl);
  }

  get(id: any): Observable<Appointment> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/new`, data);
  }

  update(data: any): Observable<any> {
    console.log("POSTIN");
    return this.http.post(`${baseUrl}/update`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete?id=${id}`);
  }

  getFiltered(query: any): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${baseUrl}/filtered${query}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${baseUrl}?title=${title}`);
  }
}
