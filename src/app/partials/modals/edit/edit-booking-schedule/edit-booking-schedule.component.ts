import { Time } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServiceAvailableDayModule } from 'src/app/modules/service-available-day.module';
import { ServiceAvailableHourModule } from 'src/app/modules/service-available-hour.module';
import { ApiServiceAvailableDayService } from 'src/app/services/api-service-available-day.service';
import { ApiServiceAvailableHourService } from 'src/app/services/api-service-available-hour.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-edit-booking-schedule',
  templateUrl: './edit-booking-schedule.component.html',
  styleUrls: ['./edit-booking-schedule.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal
  ]
})
export class EditBookingScheduleComponent implements OnInit {

  @ViewChild('editBookingSchedule') private editBookingScheduleModal!: TemplateRef<EditBookingScheduleComponent>

  availableHours: ServiceAvailableHourModule = new ServiceAvailableHourModule
  availableDates: ServiceAvailableDayModule = new ServiceAvailableDayModule

  availableDatesForms!: FormGroup
  availableHourForms!: FormGroup
  availableDayForms!: FormGroup

  allAvailableDays
  allServiceData

  constructor(
    private formBuilder: FormBuilder,
    private modalAvailableDates: NgbModal,
    private api_service: ApiServiceService,
    private api_availableDays: ApiServiceAvailableDayService,
    private api_availableHours: ApiServiceAvailableHourService,
    config: NgbModalConfig, 
  ) { 
    config.backdrop = 'static';
    config.keyboard = false; 
  }

  ngOnInit(): void {
    this.getServiceData()
    this.getAvailableDays()
  }

  updateBookingSchedule(){
    this.availableHours.hour = this.availableDatesForms.value.hour;
    this.availableDates.day = this.availableDatesForms.value.day;
    this.availableDates.service_id = this.availableDayForms.value.service_id;
    this.api_availableHours.updateServiceAvailableHour(this.availableHours, this.availableHours.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.availableDatesForms.reset()
      window.location.reload()
    })
    this.api_availableDays.updateServiceAvailableDay(this.availableDates, this.availableDates.id).subscribe(res => {
      let ref = document.getElementById('clear')
      ref?.click()
      this.availableDatesForms.reset()
      window.location.reload()
    })
  }

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];   
    })
  }

  getAvailableDays(){
    this.api_availableDays.getServiceAvailableDay().subscribe((res) => {
      this.allAvailableDays = res['data'];
    })
  }

  open(id: number, hour: Time, service_available_day_id: number, service_available_day: any){     
    console.log(id, hour, service_available_day_id)
    this.availableDates.id = id
    this.availableDatesForms = this.formBuilder.group({
      hour: hour,
      service_available_day_id: service_available_day_id,
      service_available_day: service_available_day
    })
    this.modalAvailableDates.open(this.editBookingScheduleModal, {centered: true,  size: 'lg' });
  }

  closeModal() {
    this.modalAvailableDates.dismissAll();
  }

}
