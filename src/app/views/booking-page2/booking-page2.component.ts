import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { BookingModule } from 'src/app/modules/booking.module';
import { CreateBookingComponent } from 'src/app/partials/modals/create/create-booking-client/create-booking.component';

import { ApiBookingService } from 'src/app/services/api-booking.service';
import { ApiLocationService } from 'src/app/services/api-location.service';
import { ApiServiceAvailableDayService } from 'src/app/services/api-service-available-day.service';
import { ApiServiceAvailableHourService } from 'src/app/services/api-service-available-hour.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';
import { ToastrService } from 'ngx-toastr';

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

  bookingAddress
  bookingService

  allAvailableDays
  allAvailableDaysWH
  allAvailableHours
  allActiveServicesData
  allActiveLocationsData

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
    private toastr: ToastrService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getActiveLocationsData()
    this.getActiveServicesData()
    this.getAvailableDays()
    this.getAvailableDaysWithHours()
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

  getActiveLocationsData(){
    this.api_location.getActiveLocations().subscribe(res => {
      this.allActiveLocationsData = res['data'];  
    })
  } 

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];  
    })
  }

  getActiveServicesData(){
    this.api_service.getActiveService().subscribe(res => {
      this.allActiveServicesData = res['data'];  
    })
  }

  getAvailableDays(){
    this.api_availableDay.getServiceAvailableDay().subscribe((res) => {
      this.allAvailableDays = res['data'];    
    })
  }

  getAvailableDaysWithHours(){
    this.api_availableDay.getDaysWithHoursAssociated().subscribe((res) => {
      this.allAvailableDaysWH = res['data'];
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

  locationAddress(){
    for(let a = 0; this.allActiveLocationsData[a]; a++){
      if(this.bookingFormGroup.value.location_id == this.allActiveLocationsData[a].id){
        this.bookingAddress = this.allActiveLocationsData[a].address
      }
    }
    for(let b = 0; this.allActiveServicesData[b]; b++){
      if(this.bookingFormGroup.value.service_id == this.allActiveServicesData[b].id){
        this.bookingService = this.allActiveServicesData[b].name
      }
    }
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
      this.toastr.success("Aceda ao email indicado para confirmar o agendamento", "Agendamento submetido!", {
        closeButton: true,
        disableTimeOut: true
      })
      setTimeout(function () { 
        window.location.reload(); 
      }, 3000);
      this.bookingFormGroup.reset()
    },
    err => {
      this.booking_errors = err.error.errors  
      this.toastr.error("Não foi possível marcar o agendamento!", "Agendamento não submetido!", {
        closeButton: true,
        disableTimeOut: true
      })  
    })
  }

  openFinishBookingModal(){
    this.createBooking.open();
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
  }

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

  onMouseClickTudo(e: MouseEvent) {
    this.bookingFormGroup.patchValue({start_time: e['path'][3]['innerText']})
    this.horaSchedule = e['path'][0]['innerText']
    this.dataSchedule = e['path'][3]['childNodes'][0]['innerText']
  }

}
