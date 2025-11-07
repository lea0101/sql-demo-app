import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsList } from './components/patients-list/patients-list';
import { PatientDetails } from './components/patient-details/patient-details';
import { AddPatient } from './components/add-patient/add-patient';
import { PhysicianList } from './components/physicians-list/physicians-list';

const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientsList },
  { path: 'patients/:id', component: PatientDetails },
  { path: 'physicians', component: PhysicianList},
  { path: 'add', component: AddPatient },
  { path: 'appointments', component: PatientDetails}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
