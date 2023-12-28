import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patientaccount',
  templateUrl: './patientaccount.component.html',
  styleUrls: ['./patientaccount.component.css']
})
export class PatientaccountComponent {

  patientData:any;

  patientId:any;
  patientName:any;
  patientGender:any;
  patientEmail:any;
  patientMobile:any;
  patientUername:any;
  patientPassword:any;

  constructor(private rt:Router, private snack:MatSnackBar, private route: ActivatedRoute, private _loginservice:LoginService, private _patientservice:PatientService){}

  ngOnInit():void{

    this._patientservice.getPatientByUsername(this._loginservice.getPatient().username).subscribe(result=>{
      this.patientId = result.id,
      this.patientName = result.name;
      this.patientGender = result.gender;
      this.patientEmail = result.email;
      this.patientMobile = result.mobileno;
      this.patientUername = result.user.username;
      this.patientPassword = result.user.password;
    });
  }

  public submit(patient:any){
    const ptData = {
      "name":patient.value.name,
      "gender":patient.value.gender,
      "email":patient.value.email,
      "mobileno":patient.value.mobile,
      "user":{
        "username":patient.value.username,
        "password":patient.value.password
      }
    }

    console.log(this.patientId);
    this._patientservice.updatePatient(this.patientId,ptData).subscribe(result=>{
      console.log(result);
      this.snack.open("Data Updated Successfully !!", "Ok", {
        duration: 5000,
      });

      this.rt.navigate(['']);
    })
  }


}
