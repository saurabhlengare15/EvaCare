import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentserviceService {

  constructor(private http:HttpClient) { }

  public getAppointmentCountByPatientName(name:string):Observable<any>{
    return this.http.get(`http://localhost:8080/appointment/count/${name}`);
  }

  public getAppointmentById(id:number):Observable<any>{
    return this.http.get(`http://localhost:8080/appointment/${id}`);
  }

  public getAppointmentHistory(name:string):Observable<any>{
    return this.http.get(`http://localhost:8080/appointment/patient/${name}`);
  }

  public deleteAppointment(id:number):Observable<any>{
    return this.http.delete(`http://localhost:8080/appointment/delete/${id}`);
  }

  public createAppointment(appointment:any):Observable<any>{
    return this.http.post(`http://localhost:8080/appointment/add`,appointment);
  }

  public updateAppointment(id:number,appointment:any):Observable<any>{
    return this.http.put(`http://localhost:8080/appointment/update/${id}`,appointment);
  }
}
