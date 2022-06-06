import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketModule } from '../../modules/ticket.module'
import { ToastrService } from 'ngx-toastr';

import { ApiBookingService } from '../../services/api-booking.service'; 
import { ApiWaitingListService } from '../../services/api-waiting-list.service';
import { ApiTicketService } from '../../services/api-ticket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  allBookingData
  allWaitingListData
  allTicketData
  allTicketByIdData
  allTicketQueueData
  logoutData

  ticketForm !:FormGroup
  ticketModelObj :TicketModule = new TicketModule

  isHidden: boolean

  changeToCalling: boolean = true
  changeToAttending: boolean = true

  //-------------timer-------------
  startTime
  running = false
  ms: any = '0' + 0
  sec: any = '0' + 0
  min: any = '0' + 0
  hour: any = '0' + 0


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private api_booking: ApiBookingService,
    private api_waitingList: ApiWaitingListService,
    private api_ticket: ApiTicketService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBookingData()
    this.getWaitingListsData()
    this.getTicketData()
    this.getTicket_QueueData()
    this.ticketForm = this.formBuilder.group({
      name: [],
      status: 0,
      duration: 0,
      start_time: [''],
      end_time: [''],
      notes: ['']
    })
  }

  //--------------------------------------------Booking--------------------------------------------

  getBookingData(){
    this.api_booking.getBooking().subscribe(res => {
      this.allBookingData = res['data'];      
    })
  }

  //--------------------------------------------Waiting_lists--------------------------------------------

  getWaitingListsData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];
    })
  }

  get NumberOfQueues(): number {
    return this.allWaitingListData.length;
  }

  //--------------------------------------------Ticket--------------------------------------------

  getTicketData(){
    this.api_ticket.getTicket().subscribe(res => {
      this.allTicketData = res['data'];   
    })
  }

  getTicketById(id){
    this.api_ticket.getTicketById(id).subscribe(res => {
      console.log(res.data)
      this.allTicketByIdData = res['data'];   
    })
  }

  EditTicket(data: any){
    console.log('Edit: Start-time= ', this.ticketForm.value.start_time, 'End-time: ', this.ticketForm.value.end_time)
    this.ticketModelObj.id = data.id
    //this.ticketModelObj.status = 'started';
    this.ticketForm.controls['name'].setValue(data.name);
    this.ticketForm.controls['status'].setValue('started');
    this.ticketForm.controls['duration'].setValue(data.duration);
    this.ticketForm.controls['notes'].setValue(data.notes);
    this.ticketForm.controls['start_time'].setValue(new Date());
    console.log("Status: ", this.ticketForm.value.status)
    console.log('Edit: Start-time= ', this.ticketForm.value.start_time, 'End-time: ', this.ticketForm.value.end_time)
  }

  updateTicket(){
    this.ticketModelObj.name = this.ticketForm.value.name;
    this.ticketModelObj.status = 'finished'
    this.ticketModelObj.notes = this.ticketForm.value.notes;    
    this.ticketModelObj.start_time = this.ticketForm.value.start_time;    
    this.ticketModelObj.end_time = new Date();  
    this.ticketModelObj.duration = this.hour + ':' + this.min + ':' + this.sec;
    this.api_ticket.updateTicket(this.ticketModelObj, this.ticketModelObj.id).subscribe(res => {
    console.log("Status: ", this.ticketModelObj.status)
    console.log('Update: Start-time= ', this.ticketModelObj.start_time, 'End-time: ', this.ticketModelObj.end_time)
      this.toastr.success("Concluido!")
      let ref = document.getElementById('clear')
      ref?.click()
      this.ticketForm.reset()
      this.getTicketData()
    })
  }

  getTicket_QueueData(){
    this.api_ticket.getTicket_Queues().subscribe(res => {
      this.allTicketQueueData = res['data'];      
    })
  }

  //---------------------------------------------Mudar de ecrã------------------------------------------------

  CallingScreen(){
    this.changeToCalling =!this.changeToCalling
  }

  AttendingScreen(){
    this.changeToAttending =!this.changeToAttending
  }

  FinishAttending(){
    this.changeToAttending =!this.changeToAttending
    this.changeToCalling =!this.changeToCalling
    let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

  //---------------------------------------------Timer------------------------------------------------

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
  }
  
}
