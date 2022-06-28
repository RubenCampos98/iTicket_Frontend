import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
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

  availableDaysModule : ServiceAvailableDayModule = new ServiceAvailableDayModule
  availableHoursModule : ServiceAvailableHourModule =  new ServiceAvailableHourModule

  todaysDate = new Date();

  bookingScheduleForm !: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private modalAvailableDates: NgbModal,
    private api_availableDays: ApiServiceAvailableDayService,
    private api_availableHours: ApiServiceAvailableHourService,
    private api_service: ApiServiceService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    console.log(this.todaysDate)
    this.getServiceData()
    this.bookingScheduleForm = this.formBuilder.group({
      service_id: [''],
      day: [''],
      hour: ['']
    })
  }

  addBookingSchedule(){
    this.availableDaysModule.service_id = this.bookingScheduleForm.value.service_id;
    this.availableDaysModule.day = this.bookingScheduleForm.value.day;
    this.availableHoursModule.hour = this.bookingScheduleForm.value.hour;
    this.api_availableDays.createServiceAvailableDay(this.bookingScheduleForm).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.bookingScheduleForm.reset()
      window.location.reload()
    })
    this.api_availableHours.createServiceAvailableHour(this.bookingScheduleForm).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.bookingScheduleForm.reset()
      window.location.reload()
    })
  }

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data']; 
    })
  }

  open(){
    this.modalAvailableDates.open(this.createBookingSchedule, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalAvailableDates.dismissAll();
  }

}
