import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ApiBookingService } from 'src/app/services/api-booking.service';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { EditBookingModalComponent } from '../../modals/edit-booking-modal/edit-booking-modal.component';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss']
})
export class BookingTableComponent implements OnInit {

  @ViewChild('editBooking') private editBooking!: EditBookingModalComponent

  allBookingData
  bookingSearchBar

  page = 1
  pageSize = 5
  BookingPagination: Location[]

  constructor(
    private api_booking: ApiBookingService ,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getBookingData()
    this.BookingTablePagination()
  }

  getBookingData(){
    this.api_booking.getBooking().subscribe(res => {
      this.allBookingData = res['data'];      
    })
  }

  openBookingEditModal(id: number, name: string, email: string, start_time: Time, priority: number, status: boolean,
    notes: string, service_id: number, location_id: number) {
    console.log(id, name, email, start_time, priority, status, notes, service_id, location_id);
    this.editBooking.open(id, name, email, start_time, priority, status, notes, service_id, location_id);
  }

  BookingTablePagination(){
    this.BookingPagination = this.allBookingData && this.allBookingData
      .map((booking, i) => ({id: i + 1, ...booking}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  openDeleteModal(){
    this.modalService.open(DeleteModalComponent, {centered: true});
  }

}
