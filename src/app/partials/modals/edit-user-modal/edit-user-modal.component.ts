import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig
    ) {
      config.backdrop = 'static';
      config.keyboard = false; 
    }

  ngOnInit(): void {}

  open(id: number, name: string, email: string, phone: number, admin: boolean){
    this.userForm = this.formBuilder.group({
      name: name,
      email: email,
      phone: phone,
      admin: admin
    })
    this.modalService.open(this.editUserModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
