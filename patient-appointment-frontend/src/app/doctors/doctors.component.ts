import { Component } from '@angular/core';
import { DoctorserviceService } from '../services/doctorservice.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent{
  constructor(private _service:DoctorserviceService){}
  allDoctors:any = [];

  ngOnInit():void{
    this._service.getAllDoctors().subscribe((result)=>{
      this.allDoctors = result;
      console.log(this.allDoctors);
    })
  }
}
