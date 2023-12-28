import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _loginservice: LoginService) { }

        intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
        //add jwt token(which is in localstorage) request
        let authReq = req;
        const token = this._loginservice.getToken();
        const patienttoken = this._loginservice.getPatientToken();
        if (token != null) {
            authReq = authReq.clone({setHeaders:{Authorization:`Bearer ${token}`}});
        }else if(patienttoken!=null){
            authReq = authReq.clone({setHeaders:{Authorization:`Bearer ${patienttoken}`}});
        }
        return next.handle(authReq);
    }

}

export const authInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
];