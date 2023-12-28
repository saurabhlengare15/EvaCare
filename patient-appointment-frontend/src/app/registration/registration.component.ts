import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private _patientservice:PatientService, private snack:MatSnackBar, private router:Router){}

  public submit(patient:any){

    const patientData = {
      "name":patient.value.name,
      "gender":patient.value.gender,
      "email":patient.value.email,
      "mobileno":patient.value.mobileno,
      "username":patient.value.username,
      "password":patient.value.password
    }

    // this._doctorservice.addDoctor(doctorData).subscribe((result)=>{
    //   console.log(result);
    //   this.snack.open("Signed Up Successfully !!", "Ok", {
    //     duration: 5000,
    //   })
    //   this.router.navigate(['doctorlogin']);
    // });

    this._patientservice.addPatient(patientData).subscribe(result=>{
      console.log(result);
      this.snack.open("Signed Up Successfully !!","Ok",{
        duration:3000,
      })
      this.router.navigate(['login']);
    })
  }

}
