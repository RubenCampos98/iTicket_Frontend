import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserModule } from 'src/app/modules/user.module';
import { ApiUserService } from 'src/app/services/api-user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  userModelObj :UserModule = new UserModule

  user_errors

  updatePassForm = new FormGroup({
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required)
  })

  constructor(
    private route: ActivatedRoute,
    private api_user: ApiUserService,
    private login: LoginService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParamMap.get('token'))
    this.updatePassForm = this.formBuilder.group({
      password: [''],
      passwordconfirmation: ['']
    })
  }

  updateUserPassword(){
    this.userModelObj.password = this.updatePassForm.value.password;
    this.userModelObj.passwordconfirmation = this.updatePassForm.value.passwordconfirmation;
    this.userModelObj.token = this.route.snapshot.queryParamMap.get('token');
    if(this.updatePassForm.value.password == this.updatePassForm.value.passwordconfirmation){
      this.login.updatePassword(this.userModelObj).subscribe(res => {
        this.toastr.success("Palavra-passe atualizada com sucesso!")
        setTimeout(function(){
          window.location.href = 'http://localhost:4200/login';
       }, 3000);
      },err => {
        this.toastr.error("Não foi possivel atualizar a palavra-passe")
      })
    }
  }

}
