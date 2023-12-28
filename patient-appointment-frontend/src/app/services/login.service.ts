import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //user which is logged in
  public getCurrentUser() {
    return this.http.get(`http://localhost:8080/login/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`http://localhost:8080/login/generate-token`, loginData);
  }

  //login user: set token in localstorage
  public loginUser(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  //login patient: set token in localstorage
  public loginPatient(token: string) {
    localStorage.setItem("patienttoken", token);
    return true;
  }

  //isLogin: check if doctor is login or not
  public isLoggedin() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == "" || token == null) {
      return false;
    } else {
      return true;
    }
  }

  //isPatientLoggedIn: check if patient is login or not
  public isPatientLoggedIn() {
    let patienttoken = localStorage.getItem("patienttoken");
    if (patienttoken == undefined || patienttoken == "" || patienttoken == null) {
      return false;
    } else {
      return true;
    }
  }

  //logout: remove token from localstorage
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //patientlogout: remove token from localstorage
  public patientLogout() {
    localStorage.removeItem("patienttoken");
    localStorage.removeItem("patient");
    return true;
  }

  //getToken: get token from localstorage
  public getToken() {
    return localStorage.getItem("token");
  }

  //getPatientToken: get token from localstorage
  public getPatientToken() {
    return localStorage.getItem("patienttoken");
  }

  //set userdetails
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //set patientdetails
  public setPatient(patient: any) {
    localStorage.setItem("patient", JSON.stringify(patient));
  }

  //get user
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getPatient() {
    let patientStr = localStorage.getItem("patient");
    if (patientStr != null) {
      return JSON.parse(patientStr);
    } else {
      this.patientLogout();
      return null;
    }
  }

  //get userRole
  public getUserRole() {
    let userData = this.getUser();
    console.log(userData);
    return userData.authorities[0].authority;
  }

  public getPatientRole(){
    let patientData = this.getPatient();
    console.log(patientData);
    return patientData.authorities[0].authority;
  }

  public checkLogin(login: any): Observable<any> {
    return this.http.post(`http://localhost:8080/login`, login);
  }
}
