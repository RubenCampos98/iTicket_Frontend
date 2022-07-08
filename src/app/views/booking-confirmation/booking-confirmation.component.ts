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
    //console.log('ID: ', this.route.snapshot.queryParamMap.get('token').split("3D", 2)[1])
    console.log('Verifica: ', this.verifica)
    this.getWaitingListsData()//3
    this.getBookingData()//5
    this.getTodayTickets()//4
    this.updateBooking()//1
    //this.createTicketforThisBooking()//2
  }

  getBookingData(){
    this.api_booking.getBooking().subscribe(res => {
      this.allBookingData = res['data'];      
      console.log("bookings: ",this.allBookingData[0].id)
    })
  }

  getWaitingListsData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];
      console.log("Filas: ", this.allWaitingListData)
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
      console.log('Deu erro')
    })
  }

  createTicketforThisBooking(){
    console.log("rp")
    for(let a = 0; this.allBookingData[a]; a++){
      console.log("Entrou 2.0")
      console.log("ID booking: ",this.allBookingData[a].id)
      console.log("Id do url: ", this.verifica)
      if(this.allBookingData[a].id == this.verifica){
        this.servicoo = this.allBookingData[a].service_id

        console.log("Serviço: ", this.servicoo)
        console.log("Email: ", this.allBookingData[a].email)

        this.ticketModule.name = this.allBookingData[a].email

        for(let b = 0; this.allWaitingListData[b]; b++){
          console.log('2º FOR')
          if(this.allWaitingListData[b].service_id == this.servicoo){
            this.ticketModule.waiting_list_id = this.allWaitingListData[b].id
            console.log("Fila: ", this.ticketModule.waiting_list_id)
            if(this.allTodayTicketsData.length != 0){
              console.log("If do tamanho")
                for(let c = 0; this.allTodayTicketsData[c]; c++){
                  console.log('3º FOR')
                  if(this.allTodayTicketsData[c].waiting_list_id == this.ticketModule.waiting_list_id){
                    this.ticketModule.number = this.allTodayTicketsData[c].number + 1;
                    console.log('Numero', this.ticketModule.number)
                    this.api_ticket.createTicket(this.ticketModule).subscribe(res => {
                      let ref = document.getElementById('clear')
                      ref?.click()
                      this.toastr.success('Senha tirada com sucesso')
                      //window.location.reload()
                    },
                    err => {
                      this.toastr.error('Erro ao tirar senha')
                    })
                    break;
                  }
                }
            }else{
              console.log("elseeee")
              this.ticketModule.number = 1;
              this.api_ticket.createTicket(this.ticketModule).subscribe(res => {
                let ref = document.getElementById('clear')
                ref?.click()
                this.toastr.success('Senha tirada com sucesso')
                //window.location.reload()
              },
              err => {
                this.toastr.error('Erro ao tirar senha')
              })
              break;
            }
          }
        }
      }
    }
  }

}
