import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(
    private http: HttpClient,
    public router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
     }

  //Register
  register(user: User): Observable<any> {
    let url = AppConstants.ENDPOINT_URL + 'user/register';
    return this.http.post(url, user);
    // .pipe (
    //   catchError(this.handelError)
    // )
  }

  //Login
  login(email: string, password: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<any>(AppConstants.ENDPOINT_URL + 'user/login', {email: email, password: password}, {headers: reqHeader})
    // .subscribe((res: any) => {
    //   localStorage.setItem('access-token', res.token)
    // })
    .pipe(map(user => {
      if(user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isLoggedIn() {
    if(localStorage.getItem('access-token')) {
      return true;
    }
    return false;
  }

  getAuthToken() {
    return localStorage.getItem('access-token');
  }

  logout() {
    let removeToken = localStorage.removeItem('access-token');
    localStorage.removeItem('currentUser');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  handelError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
