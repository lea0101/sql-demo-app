import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Appointment } from '../../models/db.model';
import { AppointmentService } from '../../services/appointments.service';
import { PatientsList } from '../patients-list/patients-list';
import { PhysicianList } from '../physicians-list/physicians-list';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'appt-view',
  imports: [ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatOption, MatSelectModule, MatInputModule, MatFormFieldModule, MatButton  ],
  templateUrl: './appt-view.html',
  styleUrl: './appt-view.css',
})
export class ApptView implements OnInit {
  @Input() appt: Appointment
  
  patientList: Map<number, string>;
  physicianList: Map<number, string>;
  patientListProvider = inject(PatientsList)
  physicianListProvider = inject(PhysicianList)
  appointmentService = inject(AppointmentService);
  httpClient = inject(HttpClient);

  patientId: string | undefined;
  physicianId: string | undefined;

  patientNameControl = new FormControl('');
  physicianIdControl = new FormControl();
  roomIdControl = new FormControl('');
  purposeControl = new FormControl('');
  dateControl = new FormControl('');

  selectedPatient: number;
  selectedPhysician: number;

  ngOnInit(): void {
    this.patientListProvider.getPatientsList().subscribe(value =>
    {
      this.patientList = this.namesToMap(value);
      for (const [key, value] of this.patientList.entries())
      {
        if (value === this.appt.patient_name)
        {
          this.selectedPatient = key;
          break;
        }
      }
    });
    this.physicianListProvider.getPhysiciansList().subscribe(value =>
    {
      this.physicianList = this.namesToMap(value)
      for (const [key, value] of this.physicianList.entries())
      {
        if (value === this.appt.physician_name)
        {
          this.selectedPhysician = key;
          break;
        }
      }
    });
    this.appointmentService.httpClient = this.httpClient;
    this.roomIdControl = new FormControl(this.appt.room_id);
    this.purposeControl = new FormControl(this.appt.purpose);
    this.dateControl = new FormControl(this.appt.appt_date?.toString() ?? "");
    }
  
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

  updateAppt()
  {
    console.log(this.appt);
    var appt =
    {
      "appt_id": this.appt.appt_id,
      "patient_id": this.patientId ?? this.selectedPatient,
      "physician_id": this.physicianId ?? this.selectedPhysician,
      "room_id": this.roomIdControl.getRawValue(),
      "purpose": this.purposeControl.getRawValue(),
      "appt_date": this.dateControl.getRawValue()
    };
    this.appointmentService.update(appt).subscribe();
  }
  
}
