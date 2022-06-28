import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Time } from '@angular/common';
import { TicketModule } from 'src/app/modules/ticket.module';
import { ApiTicketService } from 'src/app/services/api-ticket.service';

@Component({
  selector: 'app-edit-ticket-modal',
  templateUrl: './edit-ticket-modal.component.html',
  styleUrls: ['./edit-ticket-modal.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class EditTicketModalComponent implements OnInit {

  @ViewChild('editTicket') private editTicketModal!: TemplateRef<EditTicketModalComponent>

  ticketForm!: FormGroup

  ticketModelObj :TicketModule = new TicketModule

  user_errors

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api_ticket: ApiTicketService,
    config: NgbModalConfig, 
  ) { 
    config.backdrop = 'static';
    config.keyboard = false; 
  }

  ngOnInit(): void {}  

  updateTicket(){
    this.ticketModelObj.notes = this.ticketForm.value.notes;    
    this.api_ticket.updateTicket(this.ticketModelObj, this.ticketModelObj.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.ticketForm.reset()
    })
  }

  open(id: number, number: number, waiting_list_id: number, duration: Time, priority: number, status: number, notes: string){
    this.ticketModelObj.id = id
    this.ticketForm = this.formBuilder.group({
      number: number,
      waiting_list_id: waiting_list_id,
      duration: duration,
      priority: priority,
      status: status,
      notes: notes
    })
    this.modalService.open(this.editTicketModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
