import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingModule } from 'src/app/modules/booking.module';
import { TicketModule } from 'src/app/modules/ticket.module';
import { ApiBookingService } from 'src/app/services/api-booking.service';
import { ApiTicketService } from 'src/app/services/api-ticket.service';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {

  bookingModule :BookingModule = new BookingModule
  ticketModule :TicketModule = new TicketModule

  allBookingData
  allTodayTicketsData
  allWaitingListData
  allTodayTicketsFromBookings

  servicoo
  senhaTirada = 0

  toKen = this.route.snapshot.queryParamMap.get('token')
  verifica = this.route.snapshot.queryParamMap.get('token')

  constructor(
    private api_booking: ApiBookingService,
    private route: ActivatedRoute,
    private api_ticket: ApiTicketService,
    private api_waitingList: ApiWaitingListService,
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    console.log('Verifica: ', this.verifica)
    this.getWaitingListsData()//3
    this.getBookingData()//5
    this.getTodayTickets()//4
    //this.updateBooking()//1
    //this.createTicketforThisBooking()//2
    this.getTodayBookingTickets()
  }

  getBookingData(){
    this.api_booking.getBooking().subscribe(res => {
      this.allBookingData = res['data'];  
      console.log(this.allBookingData)    
    })
  }

  getWaitingListsData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];
      console.log("Filas: ", this.allWaitingListData)
    })
  }

  getTodayBookingTickets(){
    this.api_ticket.getTodayBookingTickets().subscribe(res => {
      this.allTodayTicketsFromBookings = res['data'];
      console.log("adada: ", this.allTodayTicketsFromBookings)
    })
  }

  getTodayTickets(){
    this.api_ticket.getCurrentDayTickets().subscribe(res => {
      this.allTodayTicketsData = res['data'];
      console.log('senhas tiradas hoje: ', this.allTodayTicketsData)
    })
  }

  updateBooking(){
    this.bookingModule.id = this.verifica;
    this.bookingModule.status = 'confirmed';
    console.log("ID: ", this.bookingModule.id)
    console.log("Status: ", this.bookingModule.status)
    this.api_booking.updateBooking(this.bookingModule, this.bookingModule.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
    },
    err => {
    })
  }

  createTicketforThisBooking(){
    for(let a = 0; this.allBookingData[a]; a++){
      if(this.allBookingData[a].id == this.verifica){
        this.servicoo = this.allBookingData[a].service_id  
        this.ticketModule.ticket_type = 1;
        this.ticketModule.email = this.allBookingData[a].email
        this.ticketModule.start_time = this.allBookingData[a].start_time
        for(let b = 0; this.allWaitingListData[b]; b++){
          if(this.allWaitingListData[b].service_id == this.servicoo){
            this.ticketModule.waiting_list_id = this.allWaitingListData[b].id
            if(this.allTodayTicketsFromBookings?.length == 1){
              this.ticketModule.number = this.allTodayTicketsFromBookings[0].number + 1
            }else{
              this.ticketModule.number = 1
            }
            this.api_ticket.createTicket(this.ticketModule).subscribe(res => {
              let ref = document.getElementById('clear')
              ref?.click()
              //window.location.reload()
            },
            err => {
              this.toastr.error('Erro ao confirmar')
            })
            break;
          }
        }
      }
    }
  }

}
