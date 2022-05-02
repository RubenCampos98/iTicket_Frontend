import { Component, OnInit } from '@angular/core';
import { ApiTicketService } from '../../services/api-ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  allTicketData

  constructor(
    private api_ticket: ApiTicketService
  ) { }

  ngOnInit(): void {
    this.getTicketData()
  }

  getTicketData(){
    this.api_ticket.getTicket().subscribe(res => {
      this.allTicketData = res['data'];      
    })
  }

}
