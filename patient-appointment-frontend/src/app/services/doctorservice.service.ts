import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorserviceService {

  constructor(private http:HttpClient) { }

  public getAllDoctors():Observable<any>{
    return this.http.get("http://localhost:8080/doctor/all");
  }

  public getDoctorsCount():Observable<any>{
    return this.http.get("http://localhost:8080/doctor/count")
  }

  public getAppointmentsByDoctorId(id:number):Observable<any>{
    return this.http.get(`http://localhost:8080/appointment/doctor/${id}`);
  }

  public getAppointmentsByDoctorIdAndStatus(id:number,status:string):Observable<any>{
    return this.http.get(`http://localhost:8080/appointment/${id}/${status}`)
  }

  public updateStatus(id:number,status:string):Observable<any>{
    return this.http.put(`http://localhost:8080/appointment/updatestatus/${id}/${status}`,'');
  }

  public addDoctor(doctor:any):Observable<any>{
    return this.http.post(`http://localhost:8080/doctor/add`,doctor);
  }

  public getDoctorByUsername(username:any):Observable<any>{
    return this.http.get(`http://localhost:8080/doctor/username/${username}`);
  }
}
