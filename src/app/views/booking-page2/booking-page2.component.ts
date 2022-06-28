import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { BookingModule } from 'src/app/modules/booking.module';
import { CreateBookingComponent } from 'src/app/partials/modals/create/create-booking-client/create-booking.component';

import { ApiBookingService } from 'src/app/services/api-booking.service';
import { ApiLocationService } from 'src/app/services/api-location.service';
import { ApiServiceAvailableDayService } from 'src/app/services/api-service-available-day.service';
import { ApiServiceAvailableHourService } from 'src/app/services/api-service-available-hour.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';

@Component({
  selector: 'app-booking-page2',
  templateUrl: './booking-page2.component.html',
  styleUrls: ['./booking-page2.component.scss'],
  providers: [{
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    }],
})
export class BookingPage2Component implements OnInit {

  @ViewChild('createBooking') private createBooking!: CreateBookingComponent

  today = new Date();

  bookingModule :BookingModule = new BookingModule

  bookingFormGroup !: FormGroup

  allLocationData
  allServiceData
  
  isEditable = true;
  checked = false

  booking_errors

  allAvailableDays
  allAvailableHours

  selectedTicket = false;

  avaiableTimes = ['9:30', '10:30', '11:30', '12:30', '14:30', '15:30']
  availableDays = Array(7).fill(0).map((x,i)=>i);
  renderer: any;

  emailFormControl 

  horaSchedule
  dataSchedule

  constructor(
    private _formBuilder: FormBuilder,
    private api_location: ApiLocationService,
    private api_service: ApiServiceService,
    private api_booking: ApiBookingService,
    private api_availableDay: ApiServiceAvailableDayService,
    private api_availableHour: ApiServiceAvailableHourService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getLocationData()
    this.getServiceData()
    this.getAvailableDays()
    this.getAvailableHours()
    this.bookingFormGroup = this._formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      start_time: [''],
      priority: [''],
      status: ['pending'],
      notes: [''],
      service_id: [''],
      location_id: ['']
    });
  }

  getLocationData(){
    this.api_location.getLocation().subscribe(res => {
      this.allLocationData = res['data'];
    })
  } 

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];  
    })
  }

  getAvailableDays(){
    this.api_availableDay.getServiceAvailableDay().subscribe((res) => {
      this.allAvailableDays = res['data'];
    })
  }

  getAvailableHours(){
    this.api_availableHour.getServiceAvailableHour().subscribe(res => {
      this.allAvailableHours = res['data'];
    })
  }

  getHourOfDay(day: any){
    return this.allAvailableHours.filter(h => h.service_available_day.id == day.id)
  }

  addBooking(){
    this.bookingModule.name = this.bookingFormGroup.value.name;
    this.bookingModule.email = this.bookingFormGroup.value.email;
    this.bookingModule.phone = this.bookingFormGroup.value.phone;
    this.bookingModule.status = this.bookingFormGroup.value.status;
    this.bookingModule.start_time = this.bookingFormGroup.value.start_time;
    this.bookingModule.priority = this.bookingFormGroup.value.priority;
    this.bookingModule.notes = this.bookingFormGroup.value.notes;
    this.bookingModule.location_id = this.bookingFormGroup.value.location_id;
    this.bookingModule.service_id = this.bookingFormGroup.value.service_id;
    this.api_booking.createBooking(this.bookingModule).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.bookingFormGroup.reset()
      //console.log(this.bookingModule)
      //window.location.reload()
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

  viewData(){
    console.log(this.bookingFormGroup)
    console.log(this.bookingModule)
  }
  //--------------------display das datas--------------------
  getday(date: number){
    var dt = new Date(); // current date of week
    var currentWeekDay = dt.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
    var requestedDate = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
    requestedDate.setDate(requestedDate.getDate()+date)
    return requestedDate
  }

  checkClicked(val){
    if(val){
      this.checked = false;
    } else{
      this.checked = true;
    }
    console.log(val);
  }

/*   changeTicket(event: any){
    const haveClass = event.target.classList.contains('ticketTime')
    if(haveClass){
      event.target.classList.remove('ticketTime')
      event.target.classList.add('ticketTime_clicked')
    }else{
      event.target.classList.remove('ticketTime_clicked')
      event.target.classList.add('ticketTime')
    }
  } */
  changeTicket(event: any, classOne: string, classTwo: string){
    const haveClass = event.target.classList.contains(classOne)
    if(haveClass){
      event.target.classList.remove(classOne)
      event.target.classList.add(classTwo)
    }else{
      event.target.classList.remove(classTwo)
      event.target.classList.add(classOne)
    }
  }

  onMouseClick(e: MouseEvent) {
    //this.bookingFormGroup.patchValue({start_time: e.target['outerText']})
    console.log(e)
    //console.log('Hora na div: ', e.target['outerText'])
    //console.log('Hora selecionada: ', e['path'][0]);
    //this.bookingFormGroup.value.start_time = e.target['outerText'];
    //console.log(this.bookingModule.start_time)
    //console.log(PointerEvent);
  }

  onMouseClickTudo(e: MouseEvent) {
    this.bookingFormGroup.patchValue({start_time: e['path'][3]['innerText']})
    this.horaSchedule = e['path'][0]['innerText']
    this.dataSchedule = e['path'][3]['childNodes'][0]['innerText']
    console.log('Module: ', e['path'][3]['innerText'])
    console.log('Hora: ', e['path'][0]['innerText'])
    console.log('Data: ', e['path'][3]['childNodes'][0]['innerText'])
  }

}
