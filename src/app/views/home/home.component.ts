import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketModule } from '../../modules/ticket.module'
import { ToastrService } from 'ngx-toastr';

import { ApiBookingService } from '../../services/api-booking.service'; 
import { ApiWaitingListService } from '../../services/api-waiting-list.service';
import { ApiTicketService } from '../../services/api-ticket.service';
import { ApiServiceAvailableDayService } from 'src/app/services/api-service-available-day.service';
import { ServiceAvailableDayModule } from 'src/app/modules/service-available-day.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  allBookingData
  allWaitingListData
  allTicketsByQueueData
  allBookingsByQueueData
  allTicketData
  allTicketFromBookingsData
  allTicketNotAttendedData
  allAvailableDaysData  
  allTicketByIdData
  allTicketQueueData
  allTodayTicketsFromBookings
  logoutData

  ticketForm !:FormGroup
  
  ticketModelObj :TicketModule = new TicketModule
  availableDaysModule : ServiceAvailableDayModule = new ServiceAvailableDayModule

  isHidden: boolean

  data
  //.toISOString()

  date = new Date();
  numberOfMlSeconds = this.date.getTime();
  addMlSeconds = 60 * 60 * 1000;
  newDateObj = new Date(this.numberOfMlSeconds + this.addMlSeconds).toISOString();


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
    private api_availableDays: ApiServiceAvailableDayService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBookingData()
    this.getWaitingListsData()
    this.getTicketData()
    this.getfirstTicketbyQueueData()
    this.getnumberOfTicketsByQueue()
    this.getnumberOfBookingsByQueue()
    this.getTicketsNotAttendedData()
    this.getTicketsFromBookingsData()
    this.getTodayBookingTickets()
    this.ticketForm = this.formBuilder.group({
      name: [],
      status: 0,
      duration: 0,
      start_time: [''],
      end_time: [''],
      notes: ['']
    })
  }

  addHoursToDate(date: Date, hours: number): Date {
    return this.data = new Date(new Date(date).setHours(date.getHours() + hours));
  }

  //--------------------------------------------Booking--------------------------------------------

  getBookingData(){
    this.api_booking.getBooking().subscribe(res => {
      this.allBookingData = res['data'];      
    })
  }

  getnumberOfBookingsByQueue(){
    this.api_waitingList.getBookingsByQueue().subscribe(res => {
      this.allBookingsByQueueData = res['data'];
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
      this.allTicketByIdData = res['data'];  
    })
  }


  getTodayBookingTickets(){
    this.api_ticket.getTodayBookingTickets().subscribe(res => {
      this.allTodayTicketsFromBookings = res['data'];
    })
  }


  getfirstTicketbyQueueData(){
    this.api_ticket.getTicket_Queues().subscribe(res => {
      this.allTicketQueueData = res['data'];
    })
  }

  getnumberOfTicketsByQueue(){
    this.api_waitingList.getTicketsByQueue().subscribe(res => {
      this.allTicketsByQueueData = res['data'];
    })
  }

  getTicketsNotAttendedData(){
    this.api_ticket.getTicketNotAttended().subscribe(res => {
      this.allTicketNotAttendedData = res['data'];   
    })
  }

  getTicketsFromBookingsData(){
    this.api_ticket.getTicketFromBooking().subscribe(res => {
      this.allTicketFromBookingsData = res['data'];   
    })
  }

  EditNotMetTicket(){
    this.ticketModelObj.id = this.allTicketByIdData.id;
    this.ticketModelObj.status = 1;
    this.api_ticket.updateTicket(this.ticketModelObj, this.ticketModelObj.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.ticketForm.reset()
      setTimeout(function () { 
        location.reload(); 
      }, 1000);
    })
  }
  
  CancelTicket(){
    this.ticketModelObj.id = this.allTicketByIdData.id;
    this.ticketModelObj.status = 2;
    this.api_ticket.updateTicket(this.ticketModelObj, this.ticketModelObj.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.ticketForm.reset()
      setTimeout(function () { 
        location.reload(); 
      }, 1000);
    })
  }

  EditTicket(data: any){
    this.ticketModelObj.id = data.id
    this.ticketForm.controls['name'].setValue(data.name);
    this.ticketForm.controls['status'].setValue('started');
    this.ticketForm.controls['duration'].setValue(data.duration);
    this.ticketForm.controls['notes'].setValue(data.notes);
    this.ticketForm.controls['start_time'].setValue(new Date());
  }

  updateTicket(){
    this.ticketModelObj.name = this.ticketForm.value.name;
    this.ticketModelObj.status = 'finished'
    this.ticketModelObj.notes = this.ticketForm.value.notes;    
    this.ticketModelObj.start_time = this.ticketForm.value.start_time;    
    this.ticketModelObj.end_time = new Date();  
    this.ticketModelObj.duration = this.hour + ':' + this.min + ':' + this.sec;
    this.api_ticket.updateTicket(this.ticketModelObj, this.ticketModelObj.id).subscribe(res => {
      this.toastr.success("Atendimento concluido com sucesso!", "Senha", {
        closeButton: true,
        disableTimeOut: true
      })
      let ref = document.getElementById('clear')
      ref?.click()
      this.ticketForm.reset()
      this.getTicketData()
      setTimeout(function () { 
        location.reload(); 
      }, 3000);
    })
  }

  //---------------------------------------------Mudar de ecrã------------------------------------------------

  getAvailableDays(){
    this.api_availableDays.getServiceAvailableDay().subscribe(res => {
      this.allAvailableDaysData = res['data']; 
    })
  }

  addAvailableDays(){
    if(this.allAvailableDaysData.length == 0 || this.allAvailableDaysData.length == null){
      this.api_availableDays.createServiceAvailableDay(this.availableDaysModule).subscribe(res => {
        let ref = document.getElementById('clear')
        ref?.click()
      })
    }
  }

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

  changeTicket(event: any, classOne: string, classTwo: string){
    const haveClass = event.target.classList.contains(classOne)
    if(haveClass){
      event.target.classList.remove(classOne)
      event.target.classList.add(classTwo)
    }else{
      event.target.classList.remove(classTwo)
      event.target.classList.add(classOne)
    }
  }
  
}
