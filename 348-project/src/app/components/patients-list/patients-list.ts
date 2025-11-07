import { Component, Injectable } from '@angular/core';
import { Patient } from '../../models/db.model';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { Observable } from 'rxjs';
import { PatientService } from '../../services/patients';
@Component({
  selector: 'app-patients-list',
  imports: [],
  templateUrl: './patients-list.html',
  styleUrl: './patients-list.css',
})
@Injectable({
  providedIn: 'root'
})
export class PatientsList {
  http = inject(HttpClient);
  patientService = inject(PatientService);

  getPatientsList(): Observable<Map<number, string>>
  {
    this.patientService.httpClient = this.http;
    return this.patientService.getNamesAndIds();
  }
}
