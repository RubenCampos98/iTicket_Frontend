import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedOut

  sessionData
  home: boolean = true

  url = window.location.toString()

  constructor(
    public api_session: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSessionData()
  }

  getSessionData(){
    this.api_session.getSession().subscribe((res) => {
      this.sessionData = res;
    })
  }

  Logout(data: any){
    this.api_session.LogoutSession(data.id).subscribe(res => {
      this.router.navigate([''])
    })
  }


}
