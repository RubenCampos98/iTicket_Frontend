import { Component, OnInit } from '@angular/core';
import { ApiBookingService } from '../../services/api-booking.service'; 
import { ApiWaitingListService } from '../../services/api-waiting-list.service';
import { ApiTicketService } from '../../services/api-ticket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  /*animations: [
    trigger('calling', [
      state('true', style({transform: 'translateX(-100%)'})),
      state('false', style({transform: 'translateX(100%)'}))
    ])
  ]*/
})
export class HomeComponent implements OnInit {

  allBookingData
  allWaitingListData
  allTicketData
  logoutData

  isHidden: boolean
  startTime
  running = false

  ms: any = '0' + 0
  sec: any = '0' + 0
  min: any = '0' + 0
  hour: any = '0' + 0


  constructor(
    private api_booking: ApiBookingService,
    private api_waitingList: ApiWaitingListService,
    private api_ticket: ApiTicketService
  ) { }

  ngOnInit(): void {
    this.getBookingData()
    this.getWaitingListsData()
    this.getTicketData()
  }

  getBookingData(){
    this.api_booking.getBooking().subscribe(res => {
      this.allBookingData = res['data'];      
    })
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

  get totalRows(): number {
    return this.allWaitingListData.length;
  }

  start(): void{
    if(!this.running){
      this.running = true;
      this.startTime = setInterval(() => {
        this.ms++;
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms;

        if(this.ms === 100){
          this.sec++;
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
          this.ms = '0' + 0
        }

        if(this.sec === 60){
          this.min++;
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }

        if(this.min === 60){
          this.hour++;
          this.hour = this.hour < 10 ? '0' + this.hour : this.hour;
          this.min = '0' + 0;
        }
      }, 10);
    }
  }

  stop(): void{
    clearInterval(this.startTime);
    this.running = false;
    this.hour = this.min = this.sec = this.ms = '0' + 0;
  }
  
}
