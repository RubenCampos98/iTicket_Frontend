import { Component, OnInit } from '@angular/core';
import { faUser, faArrowRightFromBracket, faBook, faClock, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faUser = faUser
  faArrowRightFromBracket = faArrowRightFromBracket
  faBook = faBook
  faClock = faClock
  faAddressCard = faAddressCard

  sessionData
  home: boolean = true

  constructor(
    private api_session: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSessionData()
  }

  getSessionData(){
    this.api_session.getSession().subscribe((res) => {
      this.sessionData = res['data'];
      console.log('vindo do service', res.name)
    })
  }

  Logout(data: any){
    this.api_session.LogoutSession(data.id).subscribe(res => {
      this.getSessionData()
      this.router.navigate(['']);
    })
  }

  changeNavItem(){
    if(this.home == true){
      this.home = !this.home
      this.router.navigate(['settings'])  
    }else{
      this.home = !this.home
      this.router.navigate(['home']);
    }
  }

}
