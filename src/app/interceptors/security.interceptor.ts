import {HttpEvent, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {from} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {HttpHeaders} from '@angular/common/http';



@Injectable()
export class SecurityInterceptor   implements HttpInterceptor  {
  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authService.loadToken();
    debugger;
    const request = req.clone({
      headers: new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Authorization', this.authService.authToken)
    });
    return from(next.handle(request)
      .toPromise()
      .then((response: HttpResponse<any>) => {
        const result = response.body;
        if (!result.codeResult) {
          return response;
        } else {
          throw response;
        }
      }));
  }

}

