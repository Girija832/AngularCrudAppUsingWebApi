import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordPattern: string = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*\d).{8,}$";
  isError: boolean = false;
  errorMsg: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.pattern(this.passwordPattern)]]
    })
   }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.register(this.registerForm.value).subscribe((data) => {
      console.log('Registration Data', data);
      this.registerForm.reset()
      this.router.navigate(['login']);
    },
    (err: HttpErrorResponse) => {
      console.log('ERROR==>', err);
      this.isError = true;
      this.errorMsg = err.error.message;
    });  
  }

}
