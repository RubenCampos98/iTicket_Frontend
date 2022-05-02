import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiBookingService } from 'src/app/services/api-booking.service';
import { ApiLocationService } from 'src/app/services/api-location.service';
import { ApiTicketService } from 'src/app/services/api-ticket.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  allServiceData
  allBookingData
  allTicketData
  allWaitingListData
  allLocationData: any[]
  allUserData

  isChecked = true;
  searchName
  page = 1
  pageSize = 5

  locations: Location[]

  constructor(
    private api_service: ApiServiceService,
    private api_booking: ApiBookingService,
    private api_location: ApiLocationService,
    private api_ticket: ApiTicketService,
    private api_user: ApiUserService,
    private api_waitingList: ApiWaitingListService
  ) { }

  ngOnInit(): void {
    this.getServiceData()
    this.getBookingData()
    this.getLocationData()
    this.getUserData()
    this.getWaitingListData()
    this.getTicketData()
    this.refreshTable()
  }
  
  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];      
    })
  }

  getBookingData(){
    this.api_booking.getBooking().subscribe(res => {
      this.allBookingData = res['data'];      
    })
  }

  getWaitingListData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];
    })
  }

  getTicketData(){
    this.api_ticket.getTicket().subscribe(res => {
      this.allTicketData = res['data'];      
    })
  }

  getLocationData(){
    this.api_location.getLocation().subscribe(res => {
      this.allLocationData = res['data'];
    })
  } 

  getUserData(){
    this.api_user.getUser().subscribe(res => {
      this.allUserData = res['data'];
    })
  } 

  sWitch(){
    this.isChecked == false
  }

  refreshTable(){
    this.locations = this.allLocationData
      .map((location, i) => ({id: i + 1, ...location}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


}
