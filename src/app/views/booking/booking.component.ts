import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TicketModule } from 'src/app/modules/ticket.module';
import { BookingsdisallowedComponent } from 'src/app/partials/modals/bookingsdisallowed/bookingsdisallowed.component';
import { CreatedTicketComponent } from 'src/app/partials/modals/create/created-ticket/created-ticket.component';
import { ApiLocationService } from 'src/app/services/api-location.service';
import { ApiServiceAvailableDayService } from 'src/app/services/api-service-available-day.service';
import { ApiServiceAvailableHourService } from 'src/app/services/api-service-available-hour.service';

import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiTicketService } from 'src/app/services/api-ticket.service';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  @ViewChild('createdTicket') private createdTicket!: CreatedTicketComponent
  @ViewChild('bookingsDisallowed') private bookingsDisallowed!: BookingsdisallowedComponent

  allWaitingListData
  allWaitingListBookingData
  allTicketData
  allServiceData
  allLocationData
  allAvailableDays
  allAvailableHours
  allTodayTicketsData
  currentWaitingListID
  senhaTirada = 0
  size
  newNumber
  queue
  newTicketNumber
  newestNumber

  ticketModule :TicketModule = new TicketModule

  ticketFormValue !: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private api_service: ApiServiceService,
    private api_ticket: ApiTicketService,
    private api_waitingList: ApiWaitingListService,
    private api_location: ApiLocationService,
    private api_availableDay: ApiServiceAvailableDayService,
    private api_availableHour: ApiServiceAvailableHourService,
    private toastr: ToastrService,
    private route: Router,
    config: NgbModalConfig
    ) { 
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit(): void {
    this.getServiceData()
    this.getLocationData()
    this.getAvailableDays()
    this.getAvailableHours()
    this.getWaitingListsData()
    this.getTicketData()
    this.getTodayTickets()
    //this.createTicket()
  }

  getWaitingListsData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];
    })
  }

  getTicketData(){
    this.api_ticket.getTicket().subscribe(res => {
      this.allTicketData = res['data'];   
    })
  }

  getTodayTickets(){
    this.api_waitingList.getWaitingListsBooking().subscribe(res => {
      this.allWaitingListBookingData = res['data'];
    })
    this.api_ticket.getCurrentDayTickets().subscribe(res => {
      this.allTodayTicketsData = res['data'];
    })
  }

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];   
    })
  }

  getLocationData(){
    this.api_location.getLocation().subscribe(res => {
      this.allLocationData = res['data'];   
    })
  }

  getAvailableDays(){
    this.api_availableDay.getServiceAvailableDay().subscribe((res) => {
      this.allAvailableDays = res['data'];
    })
  }

  getAvailableHours(){
    this.api_availableHour.getServiceAvailableHour().subscribe(res => {
      this.allAvailableHours = res['data'];
    })
  }

  bookingsUnavailable(){
    if(this.allServiceData?.length == 0 || this.allLocationData?.length == 0 ||
    this.allAvailableDays?.length == 0 || this.allAvailableHours?.length == 0){
      this.bookingsDisallowed.open()
    }else{
      this.route.navigate(['/agendar'])
    }
  }

  createTicket(){
    this.size = this.allTodayTicketsData?.length
    for(let i = this.size - 1; this.allTodayTicketsData[i]; i--){
      if(this.allTodayTicketsData[i].waiting_list_id == this.currentWaitingListID){
        this.newNumber = this.allTodayTicketsData[i].number + 1
        this.queue = this.allTodayTicketsData[i].waiting_list_id
        this.senhaTirada = 1
        break;
      }
    }
    if(this.senhaTirada == 0){ 
      if(this.allTodayTicketsData.length == 0){
        this.newNumber = 1
        this.queue = this.currentWaitingListID
      }
      for(let i = 0; this.allTodayTicketsData[i]; i++){
        if(this.allTodayTicketsData[i].waiting_list_id != this.currentWaitingListID ||
        this.allTodayTicketsData[i].waiting_list_id == null){
          this.newNumber = 1
          this.queue = this.allTodayTicketsData[i].waiting_list_id
          break; 
        }
      }   
    }
  }

  openCreatedTicket(number: any, waiting_list_id: number){
    this.createdTicket.open(number ,waiting_list_id)
  }

  onMouseClick(e: MouseEvent){
    this.newTicketNumber = e['path'][2]['childNodes'][1]['outerText']
    this.newestNumber = this.newTicketNumber.substring(3)
  }

}
