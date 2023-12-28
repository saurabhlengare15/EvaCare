import { Component } from '@angular/core';
import { AppointmentserviceService } from '../services/appointmentservice.service';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewappointment',
  templateUrl: './viewappointment.component.html',
  styleUrls: ['./viewappointment.component.css']
})
export class ViewappointmentComponent {

  appointmentData:any;
  idn!:number;
  appointmentDate:any;
  appointmentID:any;
  gender:any;
  paitentName:any;
  doctorID:any;
  specialization:any;
  resident:any;
  doctorName:any;

  constructor(private rt:Router, private snack:MatSnackBar, private route: ActivatedRoute, private _service:AppointmentserviceService){}

  ngOnInit():void{

    this.idn = this.route.snapshot.params['id'];
    // console.log(this.idn);

    this._service.getAppointmentById(this.idn).subscribe((data => {
      this.appointmentData = data;
      this.appointmentID = this.appointmentData.appointmentID;
      this.appointmentDate = this.appointmentData.appointmentDate;
      this.gender = this.appointmentData.gender;
      this.paitentName = this.appointmentData.paitentName;
      this.doctorID = this.appointmentData.doctor.doctorID;
      this.specialization = this.appointmentData.doctor.specialization;
      if((this.appointmentData.doctor.resident)==1){
        this.resident = "Yes";
      }else{
        this.resident = "No";
      }
      this.doctorName = this.appointmentData.doctor.firstName+" "+this.appointmentData.doctor.lastName;
      console.log(this.appointmentData);
    }))
  }

  public submit(updatedDetails:any){
    const updateAppointmentData = {
      "paitentName":updatedDetails.value.patientname,
      "gender":updatedDetails.value.gender,
      "appointmentDate":updatedDetails.value.date,
      "doctor":{
        "doctorID":updatedDetails.value.doctorid
    }
  }

  this._service.updateAppointment(this.idn,updateAppointmentData).subscribe(result=>{
    console.log(result);
    this.snack.open("Data Updated Successfully !!", "Ok", {
      duration: 5000,
    })

    this.rt.navigate(['/history']);
  })
}

}
