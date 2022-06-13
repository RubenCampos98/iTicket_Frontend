import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingModule } from 'src/app/modules/booking.module';
import { ApiBookingService } from 'src/app/services/api-booking.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {

  bookingModule :BookingModule = new BookingModule

  toKen = this.route.snapshot.queryParamMap.get('token')

  constructor(
    private api_booking: ApiBookingService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    console.log('Token: ', this.route.snapshot.queryParamMap.get('token'))
    console.log('ID: ', this.route.snapshot.queryParamMap.get('token.id'))
    this.updateBooking()
  }

  updateBooking(){
    this.bookingModule.id = this.route.snapshot.queryParamMap.get('token')
    this.bookingModule.status = 'confirmed';
    this.api_booking.updateBooking(this.bookingModule, this.bookingModule.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
    })
  }

}
