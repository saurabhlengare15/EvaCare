import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AppointmentserviceService } from '../services/appointmentservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../services/patient.service';
import { LoginService } from '../services/login.service';


export interface AppointmentHistory {
  appointmentID: number;
  paitentName: string;
  appointmentDate: string;
  firstName: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  
})
export class HistoryComponent {
  constructor(private _patientservice:PatientService,private _service:AppointmentserviceService, private router:Router, private snack:MatSnackBar, private _loginservice:LoginService){}
  allAppointment:any = [];
  patientName!:string;

  ngOnInit():void{
    this.getAppointments();
  }

  dataSource = new MatTableDataSource();

  // public getPatient(){
  //   this._patientservice.getPatientByUsername(this._loginservice.getPatient().username).subscribe(result=>{
  //     this.patientName = result.name;
  //     console.log(this.patientName);
  //   });
  // }

  public getAppointments():void{

    console.log("first");
    this._patientservice.getPatientByUsername(this._loginservice.getPatient().username).subscribe(result=>{
      this.patientName = result.name;
      console.log("name",this.patientName);

      this._service.getAppointmentHistory(this.patientName).subscribe((result)=>{
        this.allAppointment = result;
        console.log(this.allAppointment);
        this.dataSource = new MatTableDataSource(this.allAppointment);
      })
    });
  }

  displayedColumns: string[] = ['id', 'name', 'doctor', 'date','status','action'];

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public deleteAppointment(id:number):void{
    this._service.deleteAppointment(id).subscribe(result=>{
      // this.snack.open("Data Deleted Successfully !!", "Ok", {
      //   duration: 5000,
      // })

      this.snack.open("Appointment Deleted Successfully !!", "Ok", {
        duration: 5000,
      })
      this.router.navigate(['']);
    })

    // alert("Appointment Deleted Successfully.......");
    // this.router.navigate(['/history']);
  }
}
