import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
// import { AppointmentserviceService } from '../services/appointmentservice.service';
import { DoctorserviceService } from '../services/doctorservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-doctordash',
  templateUrl: './doctordash.component.html',
  styleUrls: ['./doctordash.component.css']
})
export class DoctordashComponent {
  constructor(private _service:DoctorserviceService, private router:Router, private snack:MatSnackBar, private _loginservice:LoginService){}
  allAppointment:any = [];
  status!:string;
  doctorid!:number;

  ngOnInit():void{
    this.getUser();
  }

  dataSource = new MatTableDataSource();

  public getUser(){
    this._service.getDoctorByUsername(this._loginservice.getUser().username).subscribe(result=>{
      this.doctorid = result.doctorID;
      console.log(result);
    });
  }

  public getAppointments(status:string):void{
    //to get details of loggedin user

    console.log("hello"+this.doctorid);

    this._service.getAppointmentsByDoctorIdAndStatus(this.doctorid,status).subscribe(result=>{
      this.allAppointment = result;
      this.dataSource = new MatTableDataSource(this.allAppointment);
    })
  }

  public updateStatus(id:number,status:string):void{
    this._service.updateStatus(id,status).subscribe(result=>{
      // this.snack.open(result, "Ok", {
      //   duration: 5000
      // })
    });

    this.snack.open("Status Updated", "Ok", {
      duration: 5000,
    })
  }

  public logout(){
    this._loginservice.logout();
    this.router.navigate(['doctorlogin']);
  }

  displayedColumns: string[] = ['id', 'name', 'doctor', 'date','status','action'];

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
}
