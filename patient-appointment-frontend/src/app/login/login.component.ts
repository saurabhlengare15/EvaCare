import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError: boolean = false;

  constructor(private _service: LoginService, private snack: MatSnackBar, private router: Router) {
  }

  public submit(login: any) {
    const loginData = {
      "username": login.value.username,
      "password": login.value.password
    }

    //username validation
    if (login.value.username.trim() == '' || login.value.username == null || login.value.username.length < 4) {
      this.snack.open("Please enter valid username!!!", 'Ok', {
        duration: 3000,
      });
      return;
    }

    //password
    if (login.value.password.trim() == '' || login.value.password == null || login.value.password.length < 6) {
      this.snack.open("Please enter valid password!!!", 'Ok', {
        duration: 3000,
      });
      return;
    }

    //request server to generate token
    this._service.generateToken(loginData).subscribe(
      (data: any) => {
        console.log("success");
        console.log(data);

        //login
        this._service.loginPatient(data.token);

        this._service.getCurrentUser().subscribe(
          (patient: any) => {
            this._service.setPatient(patient);
            console.log(patient);

            //redirect....DOCTOR:doctor-dashboard(doctordash)
            if (this._service.getPatientRole() == "doctor") {
              //doctor dash
              this.router.navigate(['doctordashboard']);
            } else if (this._service.getPatientRole() == "patient") {
              //redirect....PATIENT:patient_dashboard(home)
              this.router.navigate(['']);
            } else {
              this._service.patientLogout();
            }
          }
        );

      },
      (error) => {
        console.log("Error");
        console.log(error);
        this.snack.open(error.error, 'Ok', {
          duration: 3000,
        });
      }
    )

  }
}

