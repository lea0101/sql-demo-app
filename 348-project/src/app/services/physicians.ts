import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Physician } from '../models/db.model';

const baseUrl = 'http://localhost:8080/api/physicians';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {

  httpClient: HttpClient;
  constructor(private http: HttpClient) { this.httpClient  = http;}

  getAll(): Observable<Physician[]> {
    return this.http.get<Physician[]>(baseUrl);
  }

  getNamesAndIds(): Observable<Map<number, string>>
  {
    return this.http.get<Map<number, string>>(`${baseUrl}/names`);
  }

  get(id: any): Observable<Physician> {
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

  findByTitle(title: any): Observable<Physician[]> {
    return this.http.get<Physician[]>(`${baseUrl}?title=${title}`);
  }
}
