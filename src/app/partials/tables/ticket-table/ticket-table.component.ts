import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiTicketService } from 'src/app/services/api-ticket.service';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { EditTicketModalComponent } from '../../modals/edit-ticket-modal/edit-ticket-modal.component';

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.scss']
})
export class TicketTableComponent implements OnInit {

  @ViewChild('editTicket') private editTicket!: EditTicketModalComponent

  allTicketData

  page = 1
  pageSize = 5
  TicketPagination: Location[]

  constructor(
    private api_ticket: ApiTicketService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getTicketData()
    this.TicketTablePagination()
  }

  getTicketData(){
    this.api_ticket.getTicket().subscribe(res => {
      this.allTicketData = res['data'];      
    })
  }

  openTicketEditModal(id: number, number: number, waiting_list_id: number, duration: Time, priority: number, status: number, 
    notes: string) {
    console.log(id, ',',  number, ',', waiting_list_id, ',', duration, ',', priority, ',', status, ',', notes);
    this.editTicket.open(id, number, waiting_list_id, duration, priority, status, notes);
  }

  TicketTablePagination(){
    this.TicketPagination = this.allTicketData && this.allTicketData
      .map((ticket, i) => ({id: i + 1, ...ticket}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  openDeleteModal(){
    this.modalService.open(DeleteModalComponent, {centered: true});
  }

}
