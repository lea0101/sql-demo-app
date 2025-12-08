import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { AppointmentService } from '../../services/appointments.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Appointment } from '../../models/db.model';

@Component({
  selector: 'appt-table',
  imports: [MatTableModule],
  templateUrl: './appt-table.html',
  styleUrl: './appt-table.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class ApptTable implements OnInit {
    dataSource: MatTableDataSource<any>;
    
    http = inject(HttpClient);
    apptService = inject(AppointmentService);
    @Output() editOutlet: EventEmitter<any> = new EventEmitter();
    @Output() deleteOutlet: EventEmitter<any> = new EventEmitter();

    displayedColumns = ['appt_id', 'physician_name', 'patient_name', 'room_id', 'appt_date', 'purpose', 'edit-appt', 'del-appt'];

    constructor() { }

    ngOnInit(): void {
      this.apptService.httpClient = this.http;
      this.fetchData();
    }

    fetchData(): void {
      this.apptService.getAll().subscribe(
        (value: any) => 
        {
          this.valToAppts(value)
          this.dataSource = new MatTableDataSource(value);
        }
      );
    }

    filter($event: any): void {
        this.dataSource.filter = 
            $event.target.value.trim().toLowerCase();
    }

    valToAppts(value: any)
    {
      Object.keys(value).forEach(function (key){
      });
    }

    editAppt(value: any): void {
      this.editOutlet.emit([value]);
  }

    deleteAppt(value: any): void {
      this.apptService.delete(value.appt_id).subscribe();
    }

    parseDate(value: any)
    {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      var date = new Date(value);
      // return date.toDateString();
      return date.toLocaleString("en-US").substring(0, 10).replaceAll(",", "");
    }
}
