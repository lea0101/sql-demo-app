import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppointmentService } from '../../services/appointments.service';
import { PatientsList } from '../patients-list/patients-list';
import { PhysicianList } from '../physicians-list/physicians-list';

@Component({
  selector: 'appt-form',
  imports: [ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatOption, MatSelectModule, MatInputModule, MatFormFieldModule  ],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentForm implements OnInit{
  patientList: Map<number, string>;
  physicianList: Map<number, string>;
  patientListProvider = inject(PatientsList)
  physicianListProvider = inject(PhysicianList)
  appointmentService = inject(AppointmentService);
  httpClient = inject(HttpClient);

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
  }
  patientNameControl = new FormControl('');
  physicianIdControl = new FormControl('');
  roomIdControl = new FormControl('');
  purposeControl = new FormControl('');
  dateControl = new FormControl('');

  patientChange($event: any): void {
    this.patientId = $event.value;
  }

  physicianChange($event: any): void {
    this.physicianId = $event.value;
  }

  namesToMap(value: any)
    {
      return new Map(Object.keys(value).map(key => [+key, value[key]]));
    }

  addNewAppt()
  {
    var appt =
    {
      "patient_id": this.patientId,
      "physician_id": this.physicianId,
      "room_id": this.roomIdControl.getRawValue(),
      "purpose": this.purposeControl.getRawValue(),
      "appt_date": this.dateControl.getRawValue()
    };
    this.appointmentService.create(appt).subscribe();
  }

}
