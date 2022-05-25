import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserSessionService } from 'src/app/services/user-session.service';
import { LoginService } from '../../../../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: LoginService,
    private userSession: UserSessionService
  ){}

  canActivate(){
    Promise.all([
      this.userSession.get()
    ])
    .then((results) => {})
    .catch(() => {
      this.router.navigate([''])
    });
    return true
  }
  
}
