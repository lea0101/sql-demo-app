import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/db.model';

const baseUrl = 'https://express-480420-847180932712.us-east1.run.app/api/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  httpClient: HttpClient;
  constructor(private http: HttpClient) { this.httpClient  = http;}

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(baseUrl);
  }

  getNamesAndIds(): Observable<Map<number, string>>
  {
    return this.http.get<Map<number, string>>(`${baseUrl}/names`);
  }

  get(id: any): Observable<Patient> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${baseUrl}?title=${title}`);
  }
}
