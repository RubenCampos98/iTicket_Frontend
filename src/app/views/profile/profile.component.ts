import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModule } from 'src/app/modules/user.module';
import { ApiUserService } from 'src/app/services/api-user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  sessionData 
  show: boolean = true
  show1: boolean = true
  show2: boolean = true

  editar: boolean = false

  user_errors
  user_errorsV2

  userForm!: FormGroup
  
  userModule :UserModule = new UserModule

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private api_session: LoginService,
    private api_user: ApiUserService,
  ) { }

  ngOnInit(): void {
    this.getSessionData()
  }

  updateUser(){
    this.userModule.id = this.sessionData.id
    this.userModule.name = this.userForm.value.name;
    this.userModule.email = this.userForm.value.email;
    this.userModule.phone = this.userForm.value.phone;
    this.userModule.address = this.userForm.value.address;
    if(this.userForm.value.newpassword?.length > 0 && this.userForm.value.passwordconfirmation?.length > 0){
      this.userModule.password = this.userForm.value.newpassword
      this.userModule.passwordconfirmation = this.userForm.value.passwordconfirmation
    }
    this.api_user.updateUser(this.userModule, this.userModule.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.userForm.reset()
      window.location.reload()
    },
    err => {
      this.user_errors = err.error
      this.user_errorsV2 = err.error.errors
    })
  }

  getSessionData(){
    this.api_session.getSession().subscribe((res) => {
      this.sessionData = res;
      this.userForm = this.formBuilder.group({
        name: [res.name],
        email: [res.email],
        phone: [res.phone],
        address: [res.address],
        newpassword: [res.password],
        passwordconfirmation: ['']
      })
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

  editarCurrentUser(){
    if(this.editar == false){
      this.toastr.info('Pronto a atualizar!')
    }
    return this.editar =! this.editar 
  }

  deuErrado(){
    this.toastr.error('GG')
  }

}
