import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/api.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  haserror: boolean;
  msg: string;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public authService: AuthService

  ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }



  onSubmit() {

    // console.log(this.registerForm.value.email)
    this.submitted = true;
    if (this.registerForm.value.email != '' && this.registerForm.value.password != '') {
      if (this.registerForm.value.email == "demo@plateauinc.com" && this.registerForm.value.password == "Demo@123") {
        var self = this;
        self.router.navigate(['/search']);
      } else {
        this.msg = 'Invalid Username / Password.'
      }
    }
  }

}
