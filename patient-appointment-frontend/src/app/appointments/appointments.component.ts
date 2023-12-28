import { Component } from '@angular/core';
import { AppointmentserviceService } from '../services/appointmentservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DoctorserviceService } from '../services/doctorservice.service';
import { PatientService } from '../services/patient.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  minDate!: Date;
  maxDate!: Date;
  currentDate!:Date;
  Name!:any;
  Gender!:any;

  allDoctors:any = [];
  selectedValue!: string;
  // selectedGender!: string;

  ngOnInit():void{
    this._doctorservice.getAllDoctors().subscribe((result)=>{
      this.allDoctors = result;
      // console.log(this.allDoctors);
    });

    this._patientservice.getPatientByUsername(this._loginservice.getPatient().username).subscribe(result=>{
      this.Name = result.name;
      this.Gender = result.gender;
    });
  }

  constructor(private _doctorservice:DoctorserviceService,private _service:AppointmentserviceService, private _patientservice:PatientService, private snack:MatSnackBar, private router:Router,private _loginservice:LoginService){
    this.minDate = new Date();
    this.currentDate = new Date();
    this.currentDate.setMonth(new Date().getMonth()+3);
    this.maxDate = this.currentDate;
  }



  public submit(appointment:any){
    const appointmentData = {
      "paitentName":this.Name,
      "gender":this.Gender,
      "appointmentDate":appointment.value.date,
      "doctor":{
        "doctorID":appointment.value.doctor
    }
    }

    console.log(appointment);

    this._service.createAppointment(appointmentData).subscribe(result=>{
      console.log(result);
      this.snack.open("Appointment Created Successfully !!", "Ok", {
        duration: 5000,
      })
      this.router.navigate(['']);
    })
  }
}
