import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';




@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.isLoggedIn()){
        const authToken = this.authService.getAuthToken();
        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + authToken
            }
        });

        }
        return next.handle(req);
    }
}