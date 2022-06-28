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

/*   editUserPassword(data: any){
    this.userModelObj.id = data.id
    this.updatePassForm.controls['password'].setValue(data.password);
  } */

  dados(){
    console.log(this.updatePassForm.value.password)
    console.log(this.updatePassForm.value.passwordconfirmation)
  }

  updateUserPassword(){
/*     this.userModelObj.id = this.route.snapshot.queryParamMap.get('token');
    this.userModelObj.password = this.updatePassForm.value.password
    if(this.updatePassForm.value.password == this.updatePassForm.value.password_confirmation){
      this.api_user.updateUser(this.updatePassForm, this.updatePassForm.value.id).subscribe(res => {
        this.toastr.success("Palavra-passe atualizada com sucesso!")
      },
      err => {
        this.toastr.error("Não foi possivel atualizar a palavra-passe")
      })
    }else
    this.toastr.error("Os dois campos têm que ser iguais!") */
    this.userModelObj.password = this.updatePassForm.value.password;
    this.userModelObj.passwordconfirmation = this.updatePassForm.value.passwordconfirmation;
    this.userModelObj.token = this.route.snapshot.queryParamMap.get('token');
    if(this.updatePassForm.value.password == this.updatePassForm.value.passwordconfirmation){
      this.login.updatePassword(this.userModelObj).subscribe(res => {
        this.toastr.success("Palavra-passe atualizada com sucesso!")
      },err => {
        this.toastr.error("Não foi possivel atualizar a palavra-passe")
      })
    }
  }

}
