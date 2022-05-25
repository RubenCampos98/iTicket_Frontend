import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';

import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { EditWaitingListComponent } from '../../modals/edit-waiting-list/edit-waiting-list.component';

@Component({
  selector: 'app-waiting-list-table',
  templateUrl: './waiting-list-table.component.html',
  styleUrls: ['./waiting-list-table.component.scss']
})
export class WaitingListTableComponent implements OnInit {

  @ViewChild('editWaitingList') private editWaitingList!: EditWaitingListComponent

  allWaitingListData

  page = 1
  pageSize = 5
  WaitingListPagination: Location[]

  constructor(
    private api_waitingList: ApiWaitingListService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getWaitingListData()
  }

  getWaitingListData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];
    })
  }

  openWaitingListEditModal(id: number, name: string, user_id: boolean, start_time: Time, end_time: Time, 
    service_id: number, status: number) {
    console.log(id, name, user_id, start_time, end_time, service_id, status);
    this.editWaitingList.open(id, name, status, start_time, end_time, service_id, user_id);
  }
  
  WaitingListTablePagination(){
    this.WaitingListPagination = this.allWaitingListData && this.allWaitingListData
      .map((waitingList, i) => ({id: i + 1, ...waitingList}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  openDeleteModal(){
    this.modalService.open(DeleteModalComponent, {centered: true});
  }


}
