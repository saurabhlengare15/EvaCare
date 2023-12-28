import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-doclogin',
  templateUrl: './doclogin.component.html',
  styleUrls: ['./doclogin.component.css']
})
export class DocloginComponent {
  loginError: boolean = false;

  constructor(private _service:LoginService, private snack:MatSnackBar, private router:Router){
  }

  public submit(login:any){
    const loginData = {
      "username":login.value.username,
      "password":login.value.password
    }

    //username validation
    if(login.value.username.trim()=='' || login.value.username==null || login.value.username.length<4){
      this.snack.open("Please enter valid username!!!",'Ok',{
        duration:3000,
      });
      return;
    }

    //password
    if(login.value.password.trim()=='' || login.value.password==null || login.value.password.length<6){
      this.snack.open("Please enter valid password!!!",'Ok',{
        duration:3000,
      });
      return;
    }

    //request server to generate token
    this._service.generateToken(loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);

        //login
        this._service.loginUser(data.token);

        this._service.getCurrentUser().subscribe(
          (user:any)=>{
            this._service.setUser(user);
            console.log(user);

            //redirect....DOCTOR:doctor-dashboard(doctordash)
            if(this._service.getUserRole()=="doctor"){
              //doctor dash
              this.router.navigate(['doctordashboard']);
            }else if(this._service.getUserRole()=="patient"){
              //redirect....PATIENT:patient_dashboard(home)
              this.router.navigate(['']);
            }else{
              this._service.logout();
            }
          }
        );

      },
      (error)=>{
        console.log("Error");
        console.log(error);
        this.snack.open(error.error,'Ok',{
          duration:3000,
        });
      }
    )

    // this._service.checkLogin(loginData).subscribe(()=>{
    //   this.router.navigate(['doctordashboard']);
    // },
    // (error:any)=>{
    //   this.snack.open(error.error, "Ok", {
    //     duration: 5000,
    //   })
    // })
  }
}
