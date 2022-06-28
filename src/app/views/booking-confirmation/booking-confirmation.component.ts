import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingModule } from 'src/app/modules/booking.module';
import { ApiBookingService } from 'src/app/services/api-booking.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {

  bookingModule :BookingModule = new BookingModule

  toKen = this.route.snapshot.queryParamMap.get('token').split("3D", 2)[1];
  verifica = this.route.snapshot.queryParamMap.get('token').split("3D", 2)[1];

  constructor(
    private api_booking: ApiBookingService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    console.log('ID: ', this.route.snapshot.queryParamMap.get('token').split("3D", 2)[1])
    this.updateBooking()
  }

  updateBooking(){
    this.bookingModule.id = this.verifica;
    this.bookingModule.status = 'confirmed';
    this.api_booking.updateBooking(this.bookingModule, this.bookingModule.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
    },
    err => {
      console.log('Deu erro')
    })
  }

}
