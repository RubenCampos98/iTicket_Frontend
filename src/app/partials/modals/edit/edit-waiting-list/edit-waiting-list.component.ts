import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Time } from '@angular/common';
import { WaitingListModule } from 'src/app/modules/waiting-list.module';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

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

  allUserData
  allServiceData

  waitingListModule :WaitingListModule = new WaitingListModule

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api_waitingList: ApiWaitingListService,
    private api_user: ApiUserService,
    private api_service: ApiServiceService,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false; 
   }

  ngOnInit(): void {
    this.getServiceData()
    this.getUserData()
  }

  getUserData(){
    this.api_user.getUser().subscribe(res => {
      this.allUserData = res['data'];
    })
  } 

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];      
    })
  }

  updateWaitingList(){
    this.waitingListModule.name = this.waitingListForm.value.name;
    this.waitingListModule.status = this.waitingListForm.value.status;
    this.waitingListModule.start_time = this.waitingListForm.value.start_time;
    this.waitingListModule.end_time = this.waitingListForm.value.end_time;
    //this.waitingListModule.notes = this.waitingListFormValue.value.notes;
    this.waitingListModule.user_id = this.waitingListForm.value.user_id;
    this.waitingListModule.service_id = this.waitingListForm.value.service_id;
    this.api_waitingList.updateWaitingList(this.waitingListModule, this.waitingListModule.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.waitingListForm.reset()
      window.location.reload()
    },
    err => {
      console.log('Deu erro')
    })
  }

  open(id: number, name: string, status: number, start_time: Time, end_time: Time, service_id: number, user_id: boolean){
    this.waitingListModule.id = id
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
