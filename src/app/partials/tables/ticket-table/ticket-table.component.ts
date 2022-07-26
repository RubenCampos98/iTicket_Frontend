import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiTicketService } from 'src/app/services/api-ticket.service';
import { LoginService } from 'src/app/services/login.service';
import { DeleteModalComponent } from '../../modals/delete/delete.component';
import { EditTicketModalComponent } from '../../modals/edit/edit-ticket-modal/edit-ticket-modal.component';
import { WarningComponent } from '../../modals/warning/warning.component';

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.scss']
})
export class TicketTableComponent implements OnInit {

  @ViewChild('editTicket') private editTicket!: EditTicketModalComponent
  @ViewChild('deleteModal') private deleteModal!: DeleteModalComponent
  @ViewChild('warningModal') private warningModal!: WarningComponent

  allTicketData
  sessionData
  ticketSearchBar

  page = 1
  pageSize = 5
  TicketPagination: Location[]

  constructor(
    private api_ticket: ApiTicketService,
    private modalService: NgbModal,
    private api_session: LoginService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getTicketData()
    this.TicketTablePagination()
    this.getSessionData()
  }

  getTicketData(){
    this.api_ticket.getTicket().subscribe(res => {
      this.allTicketData = res['data'];      
    })
  }

  openTicketEditModal(id: number, number: number, waiting_list_id: number, duration: Time, priority: number, status: number, 
    notes: string) {
    if(this.sessionData?.admin == false){
      this.warningModal.open()
    }else{
      this.editTicket.open(id, number, waiting_list_id, duration, priority, status, notes);
    }
  }

  TicketTablePagination(){
    this.TicketPagination = this.allTicketData && this.allTicketData
      .map((ticket, i) => ({id: i + 1, ...ticket}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  openDeleteModal(id: number){
    if(this.sessionData?.admin == false){
      this.warningModal.open()
    }else{
      this.deleteModal.open('Tem a certeza de que pretende apagar este registo?', () => {
        this.api_ticket.deleteTicket(id).subscribe(res => {
          window.location.reload()
        })
      });
    }
  }

  getSessionData(){
    this.api_session.getSession().subscribe((res) => {
      this.sessionData = res;
    })
  }

}
