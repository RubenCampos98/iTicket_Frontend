import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ApiBookingService } from 'src/app/services/api-booking.service';
import { LoginService } from 'src/app/services/login.service';
import { DeleteModalComponent } from '../../modals/delete/delete.component';
import { EditBookingModalComponent } from '../../modals/edit/edit-booking-modal/edit-booking-modal.component';
import { WarningComponent } from '../../modals/warning/warning.component';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss']
})
export class BookingTableComponent implements OnInit {

  @ViewChild('editBooking') private editBooking!: EditBookingModalComponent
  @ViewChild('deleteModal') private deleteModal!: DeleteModalComponent
  @ViewChild('warningModal') private warningModal!: WarningComponent

  allBookingData
  bookingSearchBar
  bookingSearchBar1
  sessionData

  page = 1
  pageSize = 5
  BookingPagination: Location[]

  constructor(
    private api_booking: ApiBookingService ,
    private modalService: NgbModal,
    private api_session: LoginService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getBookingData()
    this.BookingTablePagination()
    this.getSessionData()
  }

  getBookingData(){
    this.api_booking.getBooking().subscribe(res => {
      this.allBookingData = res['data'];      
    })
  }

  openBookingEditModal(id: number, name: string, email: string, start_time: Time, priority: number, status: boolean,
    notes: string, service_id: number, location_id: number) {
    if(this.sessionData?.admin == false){
      this.warningModal.open()
    }else{
      console.log(id, name, email, start_time, priority, status, notes, service_id, location_id);
      this.editBooking.open(id, name, email, start_time, priority, status, notes, service_id, location_id);
    }
  }

  BookingTablePagination(){
    this.BookingPagination = this.allBookingData && this.allBookingData
      .map((booking, i) => ({id: i + 1, ...booking}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  openDeleteModal(id: number){
    if(this.sessionData?.admin == false){
      this.warningModal.open()
    }else{
      this.deleteModal.open('Tem a certeza de que pretende apagar este registo?', () => {
        this.api_booking.deleteBooking(id).subscribe(res => {
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
