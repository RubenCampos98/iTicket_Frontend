import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Time } from '@angular/common';

@Component({
  selector: 'app-edit-waiting-list',
  templateUrl: './edit-waiting-list.component.html',
  styleUrls: ['./edit-waiting-list.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class EditWaitingListComponent implements OnInit {

  @ViewChild('editWaitingList') private editWaitingListModal!: TemplateRef<EditWaitingListComponent>

  waitingListForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false; 
   }

  ngOnInit(): void {}

  open(id: number, name: string, status: number, start_time: Time, end_time: Time, service_id: number, user_id: boolean){
    this.waitingListForm = this.formBuilder.group({
      name: name,
      user_id: user_id,
      start_time: start_time,
      end_time: end_time,
      service_id: service_id,
      status: status
    })
    this.modalService.open(this.editWaitingListModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
