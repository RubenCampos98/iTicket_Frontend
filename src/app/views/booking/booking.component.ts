import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TicketModule } from 'src/app/modules/ticket.module';
import { CreatedTicketComponent } from 'src/app/partials/modals/create/created-ticket/created-ticket.component';

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

  allWaitingListData
  allWaitingListBookingData
  allTicketData
  allServiceData
  allTodayTicketsData
  currentWaitingListID
  senhaTirada = 0

  newNumber
  queue

  ticketModule :TicketModule = new TicketModule

  ticketFormValue !: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private api_service: ApiServiceService,
    private api_ticket: ApiTicketService,
    private api_waitingList: ApiWaitingListService,
    private toastr: ToastrService,
    private route: Router,
    config: NgbModalConfig
    ) { 
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit(): void {
    this.getServiceData()
    this.getWaitingListsData()
    this.getTicketData()
    this.getWaitingListsBookingData()
    this.getTodayTickets()
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

  getTodayTickets(){
    this.api_ticket.getCurrentDayTickets().subscribe(res => {
      this.allTodayTicketsData = res['data'];
      console.log('senhas tiradas hoje: ', this.allTodayTicketsData)
    })
  }

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];   
    })
  }

  createTicket(){
    console.log('id da fila onde cliquei: ', this.currentWaitingListID)
    for(let i = 0; this.allTodayTicketsData[i]; i++){
      console.log('id da fila da senha de hoje: ', this.allTodayTicketsData[i].waiting_list_id)
      if(this.allTodayTicketsData[i].waiting_list_id == this.currentWaitingListID){

        console.log('numero atual: ', this.allTodayTicketsData[i].number)
        console.log('numero novo: ', this.allTodayTicketsData[i].number + 1)
        console.log('fila da nova senha: ', this.allTodayTicketsData[i].waiting_list_id)

        this.newNumber = this.allTodayTicketsData[i].number + 1
        this.queue = this.allTodayTicketsData[i].waiting_list_id

/*         this.ticketModule.number = this.allTodayTicketsData[i].number + 1;
        this.ticketModule.waiting_list_id = this.currentWaitingListID;
         this.api_ticket.createTicket(this.ticketModule).subscribe(res => {
          let ref = document.getElementById('clear')
          ref?.click()
          this.toastr.success('Senha tirada com sucesso')
          //window.location.reload()
        },
        err => {
          this.toastr.error('Erro ao tirar senha')
        }) */
        this.senhaTirada = 1
        break;
      }
    }
    console.log('1ª feita')
    if(this.senhaTirada == 0){ 
      console.log('Na 2ª')
      for(let i = 0; this.allTodayTicketsData[i]; i++){
        if(this.allTodayTicketsData[i].waiting_list_id != this.currentWaitingListID){

          console.log('novo numero atual: 1')
          console.log('fila da nova senha e: ', this.currentWaitingListID)

          this.newNumber = 1
          this.queue = this.allTodayTicketsData[i].waiting_list_id

/*            this.ticketModule.number = 1;
          this.ticketModule.waiting_list_id = this.currentWaitingListID;
           this.api_ticket.createTicket(this.ticketModule).subscribe(res => {
            let ref = document.getElementById('clear')
            ref?.click()
            this.toastr.success('Senha tirada com sucesso')
            //window.location.reload()
          },
          err => {
            this.toastr.error('Erro ao tirar senha')
          }) */
          break; 
        }
      }   
    }
    //this.createdTicket.open(number ,waiting_list_id)
  }

  openCreatedTicket(number: number, waiting_list_id: number){
    this.createdTicket.open(number ,waiting_list_id)
    console.log(this.newNumber)
    console.log(this.queue)
  }

  onMouseClick(e: MouseEvent){
    //console.log(e['path'][3]['firstElementChild']['attributes'][0]['ownerElement']['childNodes'][2]['innerHTML'])
    this.currentWaitingListID = e['path'][3]['firstElementChild']['attributes'][0]['ownerElement']['childNodes'][2]['innerHTML']
    //this.ticketFormValue.patchValue({waiting_list_id: e['path'][3]['firstElementChild']['attributes'][0]['ownerElement']['childNodes'][2]['innerHTML']})
  }

}
