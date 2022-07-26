import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from 'src/app/modules/user.module';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class CreateUserComponent implements OnInit {

  @ViewChild('createUser') private createUser!: CreateUserComponent

  userModule :UserModule = new UserModule

  userFormValue !:FormGroup

  checked: boolean = true

  user_errors


  constructor(
    private formBuilder: FormBuilder,
    private modalUser: NgbModal,
    private api_user: ApiUserService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.userFormValue = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      phone: 0,
      admin: [''],
      address: ['']
    })
  }

  addUser(){
    this.userModule.name = this.userFormValue.value.name;
    this.userModule.email = this.userFormValue.value.email;
    this.userModule.password = this.userFormValue.value.password;
    this.userModule.phone = this.userFormValue.value.phone;
    this.userModule.admin = this.userFormValue.value.admin;
    this.userModule.address = this.userFormValue.value.address;
    this.api_user.createUser(this.userModule).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.userFormValue.reset()
      window.location.reload()
    },
    err => {
      this.user_errors = err.error.errors
      console.log(this.user_errors)
    })
  }

  checkClicked(val){
    if(val){
      this.checked = false;
    } else{
      this.checked = true;
    }
    console.log(val);
  }

  open(){
    this.modalUser.open(this.createUser, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalUser.dismissAll();
  }

}
