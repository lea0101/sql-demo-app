import { Routes } from '@angular/router';
import { PatientsList } from './components/patients-list/patients-list';
import { PatientDetails } from './components/patient-details/patient-details';
import { AddPatient } from './components/add-patient/add-patient';
import { AppointmentEditor } from './appointment-editor/appointment-editor';
import { ReportGen } from './report-gen/report-gen';

export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientsList },
  { path: 'patients/:id', component: PatientDetails },
  { path: 'add', component: AddPatient },
  { path: 'appointments', component: AppointmentEditor},
  { path: 'reports', component: ReportGen}
];