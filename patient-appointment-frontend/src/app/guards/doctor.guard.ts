import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {

  constructor(private _loginservice:LoginService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._loginservice.isLoggedin() && this._loginservice.getUserRole()=="doctor"){
      return true;
    }

    this.router.navigate(['doctorlogin']);
    return false;
  }
  
}
