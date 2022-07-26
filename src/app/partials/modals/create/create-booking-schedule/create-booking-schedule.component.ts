import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiceAvailableDayModule } from 'src/app/modules/service-available-day.module';
import { ServiceAvailableHourModule } from 'src/app/modules/service-available-hour.module';
import { ApiServiceAvailableDayService } from 'src/app/services/api-service-available-day.service';
import { ApiServiceAvailableHourService } from 'src/app/services/api-service-available-hour.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-create-booking-schedule',
  templateUrl: './create-booking-schedule.component.html',
  styleUrls: ['./create-booking-schedule.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class CreateBookingScheduleComponent implements OnInit {

  @ViewChild('createBookingSchedule') private createBookingSchedule!: CreateBookingScheduleComponent

  allServiceData
  allAvailableDaysData

  schedule_errors

  availableDaysModule : ServiceAvailableDayModule = new ServiceAvailableDayModule
  availableHoursModule : ServiceAvailableHourModule =  new ServiceAvailableHourModule

  todaysDate = new Date();
  today = this.todaysDate.getDate()
  tomorrow = this.today + 1;
  tomorrowplus1 = this.today + 2;
  tomorrowplus2 = this.today + 3;
  tomorrowplus3 = this.today + 4;
  tomorrowplus4 = this.today + 5;
  tomorrowplus5 = this.today + 6;
  aWeekFromToday = this.today + 7;
  firstday = new Date(this.todaysDate.setDate(this.today)).toUTCString();
  secondday = new Date(this.todaysDate.setDate(this.tomorrow)).toUTCString();
  thirdday = new Date(this.todaysDate.setDate(this.tomorrowplus1)).toUTCString();
  forthday = new Date(this.todaysDate.setDate(this.tomorrowplus2)).toUTCString();
  fifthday = new Date(this.todaysDate.setDate(this.tomorrowplus3)).toUTCString();
  sixthday = new Date(this.todaysDate.setDate(this.tomorrowplus4)).toUTCString();
  seventhday = new Date(this.todaysDate.setDate(this.tomorrowplus5)).toUTCString();
  lastday = new Date(this.todaysDate.setDate(this.aWeekFromToday)).toUTCString();

  bookingScheduleForm !: FormGroup
  bookingSchedulev2Form !: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private modalAvailableDates: NgbModal,
    private api_availableDays: ApiServiceAvailableDayService,
    private api_availableHours: ApiServiceAvailableHourService,
    private api_service: ApiServiceService,
    private toastr: ToastrService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getServiceData()
    this.getAvailableDays()
    this.bookingScheduleForm = this.formBuilder.group({
      service_id: 0,
      day: ['']
    })
    this.bookingSchedulev2Form = this.formBuilder.group({
      hour: [''],
      service_available_day_id: 0
    })
    console.log(this.firstday)
    console.log(this.secondday)
    console.log(this.thirdday)
    console.log(this.forthday)
    console.log(this.fifthday)
    console.log(this.sixthday)
    console.log(this.seventhday)
    console.log(this.lastday)
  }

  addAvailableDay(){
    this.availableDaysModule.service_id = this.bookingScheduleForm.value.service_id;
    this.availableDaysModule.day = this.bookingScheduleForm.value.day;
    this.api_availableDays.createServiceAvailableDay(this.availableDaysModule).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.bookingScheduleForm.reset()
      window.location.reload()
    },
    err => {
      this.toastr.error('Erro ao inserir dia')
    })
  }

  addAvailableHour(){
    this.availableHoursModule.hour = this.bookingSchedulev2Form.value.hour;
    this.availableHoursModule.service_available_day_id = this.bookingSchedulev2Form.value.service_available_day_id;
    console.log(this.bookingSchedulev2Form.value)
    this.api_availableHours.createServiceAvailableHour(this.availableHoursModule).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.bookingSchedulev2Form.reset()
      window.location.reload()
    },
    err => {
      this.schedule_errors =  err.error.errors
      console.log(this.schedule_errors)
    })
  }

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data']; 
    })
  }

  getAvailableDays(){
    this.api_availableDays.getServiceAvailableDay().subscribe(res => {
      this.allAvailableDaysData = res['data']; 
    })
  }

  getday(date: number){
    var dt = new Date(); // current date of week
    var currentWeekDay = dt.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
    var requestedDate = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
    requestedDate.setDate(requestedDate.getDate()+date)
    return requestedDate
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

  open(){
    this.modalAvailableDates.open(this.createBookingSchedule, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalAvailableDates.dismissAll();
  }

}
