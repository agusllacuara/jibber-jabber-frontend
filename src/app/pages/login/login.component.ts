import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../../../services/auth.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mode: 'login' | 'register' = 'login';
  loginLoading: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loggedObserver.subscribe((loginEvent) => {
      this.loginLoading = false;
    })
  }

  loginEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  loginPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  registerEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  registerPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  stringFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);

  matcher = new MyErrorStateMatcher();
  registerUsername: string = '';

  toggleMode(mode: 'register' | 'login') {
    this.mode = mode;
  }

  login() {
    this.loginLoading = true;
    this.authService.login(this.loginEmailFormControl.value, this.loginPasswordFormControl.value)
  }

  createAccount(): void {
    this.loginLoading = true;
    this.authService.createAccount(this.registerUsername, this.registerEmailFormControl.value, this.registerPasswordFormControl.value)
      .then((registerSuccess: boolean) => {
        this.loginLoading = false
        this.toggleMode('login')
      })
      .catch((registerFalse: boolean) => {
        this.loginLoading = false;
      });
  }
}


