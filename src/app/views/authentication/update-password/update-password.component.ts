import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserModule } from 'src/app/modules/user.module';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  userModelObj :UserModule = new UserModule

  updatePassForm = new FormGroup({
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required)
  })

  constructor(
    private route: ActivatedRoute,
    private api_user: ApiUserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParamMap.get('token'))
    this.updatePassForm = this.formBuilder.group({
      id: 0,
      password: [''],
      password_confirmation: ['']
    })
  }

  editUserPassword(data: any){
    this.userModelObj.id = data.id
    this.updatePassForm.controls['password'].setValue(data.password);
  }

/*   updateUserPassword(){
    this.userModelObj.password = this.updatePassForm.value.password
    this.api_user.updateUser(this.updatePassForm, this.updatePassForm.id).subscribe(res => {
      this.toastr.success("Palavra-passe atualizada com sucesso!")
    },
    err => {
      this.toastr.error("Não foi possivel atualizar a palavra-passe")
    })
  } */

}
