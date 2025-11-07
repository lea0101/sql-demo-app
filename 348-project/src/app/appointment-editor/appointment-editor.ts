import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ApptTable } from '../components/appt-table/appt-table';
import { AppointmentForm } from '../components/appointment-form/appointment-form';
import { ApptView } from '../components/appt-view/appt-view';
import { Appointment } from '../models/db.model';
@Component({
  selector: 'app-appointment-editor',
  imports: [ApptTable, AppointmentForm, ApptView],
  templateUrl: './appointment-editor.html',
  styleUrl: './appointment-editor.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentEditor implements OnInit {

  scheduling: boolean = false;
  currentAppointment: Appointment

  ngOnInit(): void {
    this.scheduling = false;
  }

  editSelectedAppt($event: any)
  {
    this.scheduling = true;
    this.currentAppointment = $event[0];
  }
}

