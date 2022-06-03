import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModule } from 'src/app/modules/user.module';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class EditUserModalComponent implements OnInit {

  @ViewChild('editUser') private editUserModal!: TemplateRef<EditUserModalComponent>

  userForm!: FormGroup

  checked: boolean = true

  userModule :UserModule = new UserModule

  user_errors

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api_user: ApiUserService,
    config: NgbModalConfig
    ) {
      config.backdrop = 'static';
      config.keyboard = false; 
    }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      admin: [''],
      address: ['']
    })
  }

  updateUser(){
    this.userModule.name = this.userForm.value.name;
    this.userModule.email = this.userForm.value.email;
    this.userModule.phone = this.userForm.value.phone;
    this.userModule.admin = this.userForm.value.admin;
    this.userModule.address = this.userForm.value.address;
    this.api_user.updateUser(this.userModule, this.userModule.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.userForm.reset()
      window.location.reload()
    },
    err => {
      console.log('Deu erro')
      this.user_errors = err.error.errors
      console.log(this.user_errors)
    })
  }

  open(id: number, name: string, email: string, phone: number, admin: boolean, address: string){
    this.userModule.id = id
    this.userForm = this.formBuilder.group({
      name: name,
      email: email,
      phone: phone,
      admin: admin,
      address: address
    })
    this.modalService.open(this.editUserModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  checkClicked(val){
    if(val){
      this.checked = false;
    } else{
      this.checked = true;
    }
    console.log(val);
  }

}
