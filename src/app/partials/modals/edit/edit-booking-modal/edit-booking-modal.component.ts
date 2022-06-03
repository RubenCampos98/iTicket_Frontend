import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Time } from '@angular/common';
import { BookingModule } from 'src/app/modules/booking.module';
import { ApiBookingService } from 'src/app/services/api-booking.service';

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

  checked: boolean = true

  bookingModule :BookingModule = new BookingModule

  user_errors

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api_booking: ApiBookingService,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false; 
  }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      name: [''],
      email:[''],
      start_time:[''],
      priority:[''],
      status:[''],
      notes: ['']
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

  updateBooking(){
    this.bookingModule.name = this.bookingForm.value.name;
    this.bookingModule.notes = this.bookingForm.value.notes;
    this.bookingModule.status = this.bookingForm.value.status;
    console.log(this.bookingForm)
    this.api_booking.updateBooking(this.bookingModule, this.bookingModule.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.bookingForm.reset()
      window.location.reload()
    },
    err => {
      console.log('Deu erro')
      this.user_errors = err.error.errors
      console.log(this.user_errors)
    })
  }

  open(id: number, name: string, email: string, start_time: Time, priority: number, status: boolean,
    notes: string, service_id: number, location_id: number){
    this.bookingModule.id = id
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