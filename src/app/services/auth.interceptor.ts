import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService:LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add the jwt token to all the requests
        let authreq = req;
        const TOKEN = this.loginService.getToken();
        if (TOKEN != null) {
            authreq = authreq.clone({
                setHeaders:{Authorization:`Bearer ${TOKEN}`},
            });
        }
        return next.handle(authreq);
    }
    
}

export const authInterceptorProviders = [
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
]