import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-doctornavbar',
  templateUrl: './doctornavbar.component.html',
  styleUrls: ['./doctornavbar.component.css']
})
export class DoctornavbarComponent {
  constructor(private router:Router, public _loginservice:LoginService){}

  public logout(){
    this._loginservice.logout();
    this.router.navigate(['doctorlogin']);
  }
}
