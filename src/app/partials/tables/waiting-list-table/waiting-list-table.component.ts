import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';
import { LoginService } from 'src/app/services/login.service';
import { CreateWaitingListComponent } from '../../modals/create/create-waiting-list/create-waiting-list.component';

import { DeleteModalComponent } from '../../modals/delete/delete.component';
import { EditWaitingListComponent } from '../../modals/edit/edit-waiting-list/edit-waiting-list.component';
import { WarningComponent } from '../../modals/warning/warning.component';

@Component({
  selector: 'app-waiting-list-table',
  templateUrl: './waiting-list-table.component.html',
  styleUrls: ['./waiting-list-table.component.scss']
})
export class WaitingListTableComponent implements OnInit {

  @ViewChild('createWaitingList') private createWaitingList!: CreateWaitingListComponent
  @ViewChild('editWaitingList') private editWaitingList!: EditWaitingListComponent
  @ViewChild('deleteModal') private deleteModal!: DeleteModalComponent
  @ViewChild('warningModal') private warningModal!: WarningComponent

  allWaitingListData
  sessionData
  waitingListSearchBar

  page = 1
  pageSize = 5
  WaitingListPagination: Location[]

  constructor(
    private api_waitingList: ApiWaitingListService,
    private modalService: NgbModal,
    private api_session: LoginService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getWaitingListData()
    this.getSessionData()
  }

  getWaitingListData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];
    })
  }

  getSessionData(){
    this.api_session.getSession().subscribe((res) => {
      this.sessionData = res;
    })
  }

  openCreateWaitingListModal(){
    this.createWaitingList.open()
  }

  openWaitingListEditModal(id: number, name: string, user_id: boolean, start_time: Time, end_time: Time, 
    service_id: number, status: number) {
    if(this.sessionData?.admin == false){
      this.warningModal.open()
    }else{
      this.editWaitingList.open(id, name, status, start_time, end_time, service_id, user_id);
    }
  }

  openDeleteModal(id: number){
    if(this.sessionData?.admin == false){
      this.warningModal.open()
    }else{
      this.deleteModal.open('Tem a certeza de que pretende apagar este registo?', () => {
        this.api_waitingList.deleteWaitingLists(id).subscribe(res => {
          window.location.reload()
        })
      });
    }
  }  

  WaitingListTablePagination(){
    this.WaitingListPagination = this.allWaitingListData && this.allWaitingListData
      .map((waitingList, i) => ({id: i + 1, ...waitingList}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

}
