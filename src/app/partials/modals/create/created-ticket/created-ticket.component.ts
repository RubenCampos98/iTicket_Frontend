import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TicketModule } from 'src/app/modules/ticket.module';
import { ApiTicketService } from 'src/app/services/api-ticket.service';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';

@Component({
  selector: 'app-created-ticket',
  templateUrl: './created-ticket.component.html',
  styleUrls: ['./created-ticket.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class CreatedTicketComponent implements OnInit {

  @ViewChild('createdTicket') private createdTicketModal!: TemplateRef<CreatedTicketComponent>

  createdTicketForm!: FormGroup

  ticketModule :TicketModule = new TicketModule

  checked: boolean = false;

  allWaitingListData

  allWaitingListBookingData
  allTodayTicketsData

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api_ticket: ApiTicketService,
    private api_waitingList: ApiWaitingListService,
    private toastr: ToastrService,
    config: NgbModalConfig, 
  ) { 
    config.backdrop = 'static';
    config.keyboard = false; 
  }

  ngOnInit(): void {}

  open(number: number, waiting_list_id: number){
    this.createdTicketForm = this.formBuilder.group({
      email: [''],
      number: number,
      priority: [''],
      waiting_list_id: waiting_list_id['id'],
      waiting_list_name: waiting_list_id['name'],
      waiting_list_service: waiting_list_id['service']['name']
    })
    this.modalService.open(this.createdTicketModal, {centered: true, size: 'md'});
  }

  createTicket(){
    this.ticketModule.number = this.createdTicketForm.value.number
    this.ticketModule.waiting_list_id = this.createdTicketForm.value.waiting_list_id
    this.ticketModule.email = this.createdTicketForm.value.email
    this.ticketModule.priority = this.createdTicketForm.value.priority
    console.log(this.ticketModule.waiting_list_id)
    this.api_ticket.createTicket(this.ticketModule).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.toastr.success('Senha tirada com sucesso!', "Senha", {
        closeButton: true,
        disableTimeOut: true
      })
      setTimeout(function () { 
        window.location.reload(); 
      }, 2000);
    },
    err => {
      this.toastr.error('Erro ao tirar senha. Tente novamente', "Erro!", {
        closeButton: true,
        disableTimeOut: true
      })
    })
  }

  getWaitingListData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];
    })
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  checkClicked(val){
    if(val){
      this.checked = false;
    } else{
      this.checked = true;
    }
    console.log(val);
  }

}
