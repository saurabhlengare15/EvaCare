import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public _loginservice:LoginService,private router:Router){}

  public logout(){
    this._loginservice.patientLogout();
    this.router.navigate(['login']);
  }
}
