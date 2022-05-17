import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Time } from '@angular/common';

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

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig, 
  ) { 
    config.backdrop = 'static';
    config.keyboard = false; 
  }

  ngOnInit(): void {}  

  open(id: number, number: number, duration: Time, priority: number, status: number, notes: string, waiting_list_id: number){
    this.ticketForm = this.formBuilder.group({
      number: number,
      duration: duration,
      status: status,
      priority: priority,
      notes: notes,
      waiting_list_id: waiting_list_id
    })
    this.modalService.open(this.editTicketModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
