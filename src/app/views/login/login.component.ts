import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  userSubject: any
  user: any
  isLoggedIn: true
  public email: string = '';
  public password: string = '';

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
  }
//data: { email: string, password: string }
  onLogin() {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);
      this.http.post(`${environment.api}/sessions`, formData, { withCredentials: true })
      .subscribe({
        next: user => {
          this.user = user;
          this.userSubject?.next(this.user);
          resolve(this.user!);
          this.router.navigate(['home']);
          alert('Login Certo!');
          console.log(this.email, this.password)
        },
        error: err => {
          this.user = undefined;
          this.userSubject?.next(this.user);
          reject(err);
          console.log(err.error.message);
          alert('Login Errado!');
        }
      });
    });
  }

}
