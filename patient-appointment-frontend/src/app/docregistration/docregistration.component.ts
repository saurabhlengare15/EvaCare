import { Component } from '@angular/core';
import { AppointmentserviceService } from '../services/appointmentservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DoctorserviceService } from '../services/doctorservice.service';

@Component({
  selector: 'app-docregistration',
  templateUrl: './docregistration.component.html',
  styleUrls: ['./docregistration.component.css']
})
export class DocregistrationComponent {

  constructor(private _doctorservice:DoctorserviceService, private snack:MatSnackBar, private router:Router){
  }

  public submit(doctor:any){

    const doctorData = {
      "firstName":doctor.value.firstname,
      "lastName":doctor.value.lastname,
      "specialization":doctor.value.specialization,
      "resident":doctor.value.resident,
      "username":doctor.value.username,
      "password":doctor.value.password
    }

    this._doctorservice.addDoctor(doctorData).subscribe((result)=>{
      console.log(result);
      this.snack.open("Signed Up Successfully !!", "Ok", {
        duration: 5000,
      })
      this.router.navigate(['doctorlogin']);
    })
  }
}
