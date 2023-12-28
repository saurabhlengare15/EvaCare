import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { HttpClientModule } from '@angular/common/http';
import { HistoryComponent } from './history/history.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewappointmentComponent } from './viewappointment/viewappointment.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { DoctordashComponent } from './doctordash/doctordash.component';
import { DocregistrationComponent } from './docregistration/docregistration.component';
import { LoginComponent } from './login/login.component';
import { DocloginComponent } from './doclogin/doclogin.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { RegistrationComponent } from './registration/registration.component';
import { PatientaccountComponent } from './patientaccount/patientaccount.component';
import { DoctornavbarComponent } from './doctornavbar/doctornavbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AppointmentsComponent,
    DoctorsComponent,
    HistoryComponent,
    ViewappointmentComponent,
    DoctordashComponent,
    DocregistrationComponent,
    LoginComponent,
    DocloginComponent,
    LoginComponent,
    RegistrationComponent,
    PatientaccountComponent,
    DoctornavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
