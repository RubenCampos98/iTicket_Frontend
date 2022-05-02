import { Component, OnInit} from '@angular/core';
import { ApiBookingService } from '../../services/api-booking.service';
import { LoginService } from 'src/app/services/login.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  allBookingData
  sessionData

  constructor(
    private api_booking: ApiBookingService,
    private api_session: LoginService
  ) { }

  ngOnInit(): void {
    this.getBookingData()
    this.getSessionData()
  }

  getBookingData(){
    this.api_booking.getBooking().subscribe(res => {
      this.allBookingData = res['data'];      
    })
  }

  getSessionData(){
    this.api_session.getSession().subscribe((res) => {
      this.sessionData = res['data'];
      console.log('vindo do service', res.name)
    })
  }

}
