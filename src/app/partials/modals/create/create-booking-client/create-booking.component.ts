import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class CreateBookingComponent implements OnInit {
  
  @ViewChild('createBooking') private createBooking!: CreateBookingComponent

  constructor(
    private formBuilder: FormBuilder,
    private modalBooking: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  open(){
    this.modalBooking.open(this.createBooking, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalBooking.dismissAll();
  }

}
