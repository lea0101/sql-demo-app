import { Component, signal, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from './services/patients';
import { HttpClient } from '@angular/common/http';
import { Patient } from './models/db.model';
import { of } from 'rxjs';
import { ApptTable } from './components/appt-table/appt-table';
import { Router } from '@angular/router';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatCard, MatCardTitle, MatButton],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class App implements OnInit {
  protected readonly title = signal('cs348-project');
  constructor(private router: Router  ) {}
  selectedPage: number  

  ngOnInit(): void {
    this.selectedPage = 0;
  }

  goToAppointments()
  {
    this.selectedPage = 0;
    this.router.navigateByUrl('/appointments');
  }
  goToReports()
  {
    this.selectedPage = 1;
    this.router.navigateByUrl('/reports');
  }
}