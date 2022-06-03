import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { WaitingListModule } from 'src/app/modules/waiting-list.module';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';

@Component({
  selector: 'app-create-waiting-list',
  templateUrl: './create-waiting-list.component.html',
  styleUrls: ['./create-waiting-list.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class CreateWaitingListComponent implements OnInit {

  @ViewChild('createWaitingList') private createWaitingList!: CreateWaitingListComponent

  waitingListModule :WaitingListModule = new WaitingListModule

  waitingListFormValue !:FormGroup

  checked: boolean = true

  user_errors

  allUserData
  allServiceData

  constructor(
    private formBuilder: FormBuilder,
    private modalWaitingList: NgbModal,
    private api_user: ApiUserService,
    private api_service: ApiServiceService,
    private api_waitingList: ApiWaitingListService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getUserData()
    this.getServiceData()
    this.waitingListFormValue = this.formBuilder.group({
      name: [''],
      status: [''],
      start_time: [''],
      end_time: [''],
      user_id: 0,
      service_id: 0
    })
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

  addWaitingList(){
    this.waitingListModule.name = this.waitingListFormValue.value.name;
    this.waitingListModule.status = this.waitingListFormValue.value.status;
    this.waitingListModule.start_time = this.waitingListFormValue.value.start_time;
    this.waitingListModule.end_time = this.waitingListFormValue.value.end_time;
    //this.waitingListModule.notes = this.waitingListFormValue.value.notes;
    this.waitingListModule.user_id = this.waitingListFormValue.value.user_id;
    this.waitingListModule.service_id = this.waitingListFormValue.get('service_id').setValue('service.id');
    this.api_waitingList.createWaitingLists(this.waitingListModule).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.waitingListFormValue.reset()
      window.location.reload()
    },
    err => {
      console.log('Deu erro')
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
    this.modalWaitingList.open(this.createWaitingList, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalWaitingList.dismissAll();
  }


}
