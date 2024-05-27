import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });

            console.log('Request is sent with token - URL: ', cloned.url);
            // console.log('Headers: ', cloned.headers.keys().map(key => `${key}: ${cloned.headers.get(key)}`));
            return next.handle(cloned);
        } else {
            console.log('Request is sent without token - URL: ', req.url);
            return next.handle(req);
        }
    }
}