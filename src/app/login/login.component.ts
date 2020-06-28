import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  isLoginError: boolean = false;
  errMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.authService.logout();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  loginUser() {
    this.submitted = true;
    this.authService.login(this.email.value, this.password.value).subscribe((data: any) => {
      localStorage.setItem('access-token', data.token);
      this.router.navigate(['/customer']);
    },
    (err: HttpErrorResponse) => {
      console.log('ERROR==>', err);
      this.isLoginError = true;
      // this.errMessage = AppConstants.LOGIN_ERROR_MESSAGE;
      this.errMessage = err.error.message;
    });
  }

}
