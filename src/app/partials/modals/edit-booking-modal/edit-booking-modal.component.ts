import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Time } from '@angular/common';

@Component({
  selector: 'app-edit-booking-modal',
  templateUrl: './edit-booking-modal.component.html',
  styleUrls: ['./edit-booking-modal.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class EditBookingModalComponent implements OnInit {

  @ViewChild('editBooking') private editBookingModal!: TemplateRef<EditBookingModalComponent>

  bookingForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false; 
  }

  ngOnInit(): void {}

  open(id: number, name: string, email: string, start_time: Time, priority: number, status: boolean,
    notes: string, service_id: number, location_id: number){
    this.bookingForm = this.formBuilder.group({
      name: name,
      email: email,
      start_time: start_time,
      priority: priority,
      status: status,
      notes: notes,
      service_id: service_id,
      location_id: location_id
    })
    this.modalService.open(this.editBookingModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
  
}
