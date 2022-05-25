import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faEye
  faEyeSlash

  sessionData 
  show: boolean = true
  show1: boolean = true
  show2: boolean = true

  constructor(
    private toastr: ToastrService,
    private api_session: LoginService
  ) { }

  ngOnInit(): void {
    this.getSessionData()
  }

  getSessionData(){
    this.api_session.getSession().subscribe((res) => {
      this.sessionData = res;
    })
  }

  viewPass(){
    this.show = ! this.show
  }

  viewPass1(){
    this.show1 = ! this.show1
  }
  
  viewPass2(){
    this.show2 = ! this.show2
  }

  deuCerto(){
    this.toastr.success('Atualizado')
  }

  deuErrado(){
    this.toastr.error('GG')
  }

}
