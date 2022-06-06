import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BookingModule } from 'src/app/modules/booking.module';
import { CreateBookingComponent } from 'src/app/partials/modals/create/create-booking-client/create-booking.component';
import { ApiBookingService } from 'src/app/services/api-booking.service';
import { ApiLocationService } from 'src/app/services/api-location.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';

@Component({
  selector: 'app-booking-page2',
  templateUrl: './booking-page2.component.html',
  styleUrls: ['./booking-page2.component.scss']
})
export class BookingPage2Component implements OnInit {

  @ViewChild('createBooking') private createBooking!: CreateBookingComponent

  today = new Date();

  bookingModule :BookingModule = new BookingModule

  bookingFormGroup !: FormGroup

  allLocationData
  allServiceData
  
  isEditable = true;
  checked: boolean = true

  booking_errors

  avaiableTimes = ['9:30', '10:30', '11:30', '12:30', '14:30', '15:30']
  availableDays = Array(7).fill(0).map((x,i)=>i);

  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private api_location: ApiLocationService,
    private api_service: ApiServiceService,
    private api_booking: ApiBookingService,
    private api_waitingList: ApiWaitingListService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getLocationData()
    this.getServiceData()
    this.day1()
    this.day2()
    this.day3()
    this.day4()
    this.day5()
    this.day6()
    this.day7()
    this.bookingFormGroup = this._formBuilder.group({
      id: 0,
      name: [''],
      email: [''],
      start_time: [''],
      priority: 0,
      status: ['pending'],
      notes: [''],
      service_id: [''],
      location_id: ['']
    });
  }

  getLocationData(){
    this.api_location.getLocation().subscribe(res => {
      this.allLocationData = res['data'];
      console.log(this.allLocationData)
    })
  } 

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];      
      console.log(this.allServiceData)
    })
  }

  addBooking(){
    this.bookingModule.name = this.bookingFormGroup.value.name;
    this.bookingModule.status = this.bookingFormGroup.value.status;
    this.bookingModule.start_time = this.bookingFormGroup.value.start_time;
    this.bookingModule.priority = this.bookingFormGroup.value.priority;
    //this.waitingListModule.notes = this.waitingListFormValue.value.notes;
    this.bookingModule.location_id = this.bookingFormGroup.value.user_id;
    this.bookingModule.service_id = this.bookingFormGroup.value.service_id;
    this.api_booking.createBooking(this.bookingModule).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.bookingFormGroup.reset()
      window.location.reload()
    },
    err => {
      console.log('Deu erro')
      this.booking_errors = err.error.errors
      console.log(this.booking_errors)
    })
  }

  openFinishBookingModal(){
    this.createBooking.open();
  }
  //--------------------display das datas--------------------
  day1(){
    const tomorrow = new Date(this.today)
    tomorrow.setDate(new Date().getDate() + 1)
    return tomorrow
  }
  getday(date: number){
    var currentDate = new Date();
    var requestedDate = new Date();
    requestedDate.setDate(requestedDate.getDate()+date)
    console.log(requestedDate)
    //console.log( new Date(currentDate.getDate() + date))
    return requestedDate
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

  checkClicked(val){
    if(val){
      this.checked = false;
    } else{
      this.checked = true;
    }
    console.log(val);
  }

  viewData(){
    console.log(this.bookingFormGroup)
  }

}
