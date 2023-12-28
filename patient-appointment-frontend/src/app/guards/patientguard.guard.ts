import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PatientguardGuard implements CanActivate {

  constructor(private _loginservice:LoginService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._loginservice.isPatientLoggedIn() && this._loginservice.getPatientRole()=="patient"){
        return true;
      }
  
      this.router.navigate(['login']);
      return false;
  }
  
}
