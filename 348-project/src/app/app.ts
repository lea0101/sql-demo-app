import { Component, signal, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from './services/patients';
import { HttpClient } from '@angular/common/http';
import { Patient } from './models/db.model';
import { of } from 'rxjs';
import { ApptTable } from './components/appt-table/appt-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ApptTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class App implements OnInit {
  protected readonly title = signal('cs348-project');
  constructor(private router: Router  ) {}
  ngOnInit(): void {
  }

  goToAppointments()
  {
    this.router.navigateByUrl('/appointments');
 
  }
  goToReports()
  {
    this.router.navigateByUrl('/reports');
  }
}