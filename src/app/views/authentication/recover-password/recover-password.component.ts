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

  ngOnInit(): void {}

  resetPassword(){
    this.api_resetPass.resetPassword(this.resetPassForm.value['email']).subscribe(res => {
      this.toastr.success("Foi enviado um email de recuperação de palavra-passe para o email inserido!", "Sucesso!", {
        closeButton: true,
        disableTimeOut: true
      }); 
    },
    err => {
      this.toastr.error("Não foi possível enviar o email de recuperação de palavra-passe. Por favor tente novamente.", "Erro!", {
        closeButton: true,
        disableTimeOut: true
      })
    });
  }

}
