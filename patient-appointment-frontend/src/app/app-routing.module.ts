import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DocloginComponent } from './doclogin/doclogin.component';
import { DocregistrationComponent } from './docregistration/docregistration.component';
import { DoctordashComponent } from './doctordash/doctordash.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorGuard } from './guards/doctor.guard';
import { PatientguardGuard } from './guards/patientguard.guard';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientaccountComponent } from './patientaccount/patientaccount.component';
import { RegistrationComponent } from './registration/registration.component';
import { ViewappointmentComponent } from './viewappointment/viewappointment.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
    canActivate:[PatientguardGuard]
  },
  {
    path:'bookappointment',
    component:AppointmentsComponent,
    pathMatch:'full',
    canActivate:[PatientguardGuard]
  },
  {
    path:'alldoctors',
    component:DoctorsComponent,
    pathMatch:'full',
    canActivate:[PatientguardGuard]
  },
  {
    path:'history',
    component:HistoryComponent,
    pathMatch:'full',
    canActivate:[PatientguardGuard]
  },
  {
    path:'view/:id',
    component:ViewappointmentComponent,
    pathMatch:'full',
    canActivate:[PatientguardGuard]
  },
  {
    path:'doctordashboard',
    component:DoctordashComponent,
    pathMatch:'full',
    canActivate: [DoctorGuard]
  },
  {
    path:'doctorregistration',
    component:DocregistrationComponent,
    pathMatch:'full',
  },
  {
    path:'doctorlogin',
    component:DocloginComponent,
    pathMatch:'full',
  },
  {
    path:'register',
    component:RegistrationComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'accountdetails',
    component:PatientaccountComponent,
    pathMatch:'full',
    canActivate:[PatientguardGuard]
  }
  // {
  //   path:''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
