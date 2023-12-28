import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  public getAllPatients():Observable<any>{
    return this.http.get("http://localhost:8080/patient/all");
  }

  public getPatientById(id:number):Observable<any>{
    return this.http.get(`http://localhost:8080/patient/${id}`);
  }

  public getPatientByUsername(username:string):Observable<any>{
    return this.http.get(`http://localhost:8080/patient/username/${username}`);
  }

  public addPatient(patient:any):Observable<any>{
    return this.http.post(`http://localhost:8080/patient/add`,patient);
  }

  public updatePatient(id:number,patient:any):Observable<any>{
    return this.http.put(`http://localhost:8080/patient/update/${id}`,patient);
  }
}
