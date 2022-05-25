import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  allResetData
  email: string = ''

  resetPassForm = new FormGroup({
    email: new FormControl('', Validators.required)
  })

  constructor(
    private api_resetPass: LoginService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  resetPassword(){
    this.api_resetPass.resetPassword(this.resetPassForm.value['email']).subscribe(res => {
      this.toastr.success("Sucesso! Foi enviado um email de recuperação de palavra-passe para o email abaixo!"); 
    },
    err => {
      this.toastr.error("Erro, tente novamente."); 
    });
  }

}
