import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiTicketService } from 'src/app/services/api-ticket.service';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  allWaitingListData
  allWaitingListBookingData
  allTicketData
  allServiceData

  constructor(
    private api_service: ApiServiceService,
    private api_ticket: ApiTicketService,
    private api_waitingList: ApiWaitingListService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getServicData()
    this.getWaitingListsData()
    this.getTicketData()
    this.getWaitingListsBookingData()
  }

  getWaitingListsData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];
    })
  }

  getWaitingListsBookingData(){
    this.api_waitingList.getWaitingListsBooking().subscribe(res => {
      this.allWaitingListBookingData = res['data'];
    })
  }

  getTicketData(){
    this.api_ticket.getTicket().subscribe(res => {
      this.allTicketData = res['data'];   
    })
  }

  getServicData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];   
    })
  }

  booking_step2(){
    this.route.navigate(['/agendar'])
  }

}
