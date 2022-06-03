import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CreateBookingComponent } from 'src/app/partials/modals/create/create-booking-client/create-booking.component';

@Component({
  selector: 'app-booking-page2',
  templateUrl: './booking-page2.component.html',
  styleUrls: ['./booking-page2.component.scss']
})
export class BookingPage2Component implements OnInit {

  @ViewChild('createBooking') private createBooking!: CreateBookingComponent

  today = new Date();

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.day1()
    this.day2()
    this.day3()
    this.day4()
    this.day5()
    this.day6()
    this.day7()
  }

  openFinishBookingModal(){
    this.createBooking.open();
  }

  day1(){
    const tomorrow = new Date(this.today)
    tomorrow.setDate(new Date().getDate() + 1)
    return tomorrow
  }
  day2(){
    const tomorrow = new Date(this.today)
    tomorrow.setDate(new Date().getDate() + 2)
    return tomorrow
  }
  day3(){
    const tomorrow = new Date(this.today)
    tomorrow.setDate(new Date().getDate() + 3)
    return tomorrow
  }
  day4(){
    const tomorrow = new Date(this.today)
    tomorrow.setDate(new Date().getDate() + 4)
    return tomorrow
  }
  day5(){
    const tomorrow = new Date(this.today)
    tomorrow.setDate(new Date().getDate() + 5)
    return tomorrow
  }
  day6(){
    const tomorrow = new Date(this.today)
    tomorrow.setDate(new Date().getDate() + 6)
    return tomorrow
  }
  day7(){
    const tomorrow = new Date(this.today)
    tomorrow.setDate(new Date().getDate() + 7)
    return tomorrow
  }

}
