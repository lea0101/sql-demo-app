import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { PatientsList } from '../components/patients-list/patients-list';
import { PhysicianList } from '../components/physicians-list/physicians-list';
import { AppointmentService } from '../services/appointments.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-report-gen',
  imports: [ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatOption, MatSelectModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule  ],
  templateUrl: './report-gen.html',
  styleUrl: './report-gen.css',
})
export class ReportGen implements OnInit {
   @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: MatTableDataSource<any>;

    pageSize = 10;
    pageSizeOptions = [10, 50, 100];
    displayedColumns = ['appt_id', 'physician_name', 'patient_name', 'room_id', 'appt_date', 'purpose'];

  reportGenerated = false;

  patientList: Map<number, string>;
  physicianList: Map<number, string>;
  patientListProvider = inject(PatientsList)
  physicianListProvider = inject(PhysicianList)
  appointmentService = inject(AppointmentService);
  httpClient = inject(HttpClient);

  patientNameControl = new FormControl('');
  physicianIdControl = new FormControl();
  roomIdControl = new FormControl();
  startDateControl = new FormControl();
  endDateControl = new FormControl();

  patientId: string | undefined;
  physicianId: string | undefined;

  ngOnInit(): void {
    this.patientListProvider.getPatientsList().subscribe(value =>
      this.patientList = this.namesToMap(value)
    );
    this.physicianListProvider.getPhysiciansList().subscribe(value =>
      this.physicianList = this.namesToMap(value)
    );
    this.appointmentService.httpClient = this.httpClient;
    // this.purposeControl = new FormControl(this.appt.purpose);
    // this.dateControl = new FormControl(this.appt.appt_date?.toString() ?? "");
      this.fetchData();
  }
      filter($event: any): void {
        this.dataSource.filter = 
            $event.target.value.trim().toLowerCase();
    }
  fetchData(): void {
      this.appointmentService.getAll().subscribe(
        (value: any) => 
        {
          this.valToAppts(value)
          this.dataSource = new MatTableDataSource(value);
          this.dataSource.paginator = this.paginator;
        }
      );
    }
  patientChange($event: any): void {
    this.patientId = $event.value;
    console.log(this.patientId);
  }

  physicianChange($event: any): void {
    this.physicianId = $event.value;
  }

  namesToMap(value: any)
    {
      return new Map(Object.keys(value).map(key => [+key, value[key]]));
    }
  
  generateReport()
  {
    var query = "?";
    const startDate = this.startDateControl.getRawValue();
    const endDate = this.endDateControl.getRawValue();
    if (startDate)
    {
      const date = new Date(startDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      query = query + `startDate=${year}-${month}-${day}`;
    }
    else
    {
      query = query + `startDate=1969-12-31`;
    }
    if (endDate)
    {
      const date = new Date(endDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      query = query + `&&endDate=${year}-${month}-${day}`;
    }
    else
    {
      query = query + `&&endDate=2500-01-01`;
    }
    if (this.patientId)
    {
      query = query + `&&patient_id=${this.patientId}`;
    }
    if (this.physicianId)
    {
      query = query + `&&physician_id=${this.physicianId}`;
    }
    if (this.roomIdControl.getRawValue())
    {
      query = query + `&&room_id=${this.roomIdControl.getRawValue()}`;
    }
    console.log(query);
    this.appointmentService.getFiltered(query).subscribe(
      (value: any) =>
      {
          this.valToAppts(value)
          this.dataSource = new MatTableDataSource(value);
          this.dataSource.paginator = this.paginator;
          this.reportGenerated = true;
      }
    );
  }

  valToAppts(value: any)
    {
      Object.keys(value).forEach(function (key){
      });
    }
}
