import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, ReactiveFormsModule,
        FormsModule, HttpClientModule],
      declarations: [ LoginComponent ],
      providers: [
        { provide: authService, useValue: {
          login: function(email, pass) {
            return of({
            "auth":true,
            "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTkxMjYxNjgxLCJleHAiOjE1OTEyNjM0ODF9.L_JL0meQmOhC11JIAjuW33QZQzqRq6O82-sa4DTH2Q0","status":200,
            "message":"login successful"
          })
          }
        } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should call loginUser', () => {
    expect(component.loginUser()).toBeUndefined();
  });

  // it('it should call loginUser with error', () => {
  //   spyOn(component['authService'], 'login').and.returnValue(of(new Error()));
  //   expect(component.loginUser()).toBeUndefined();
  // });
});
