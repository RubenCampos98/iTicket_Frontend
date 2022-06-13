import { Component, OnInit } from '@angular/core';
import { ApiServiceAvailableDayService } from 'src/app/services/api-service-available-day.service';
import { ApiServiceAvailableHourService } from 'src/app/services/api-service-available-hour.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-booking-schedule-table',
  templateUrl: './booking-schedule-table.component.html',
  styleUrls: ['./booking-schedule-table.component.scss']
})
export class BookingScheduleTableComponent implements OnInit {

  allAvailableDays
  allAvailableHours
  allServiceData
  bookingScheduleSearchBar

  today = new Date()

  page = 1
  pageSize = 5
  BookingSchedulePagination: Location[]

  constructor(
    private api_service: ApiServiceService,
    private api_availableDay: ApiServiceAvailableDayService,
    private api_availableHour: ApiServiceAvailableHourService,
  ) {}

  ngOnInit(): void {
    this.getAvailableDays()
    this.getAvailableHours()
    this.BookingScheduleTablePagination()
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

  BookingScheduleTablePagination(){
    this.BookingSchedulePagination = this.allServiceData && this.allServiceData
      .map((service, i) => ({id: i + 1, ...service}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  getday(date: number){
    var dt = new Date(); // current date of week
    var currentWeekDay = dt.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
    var requestedDate = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
    requestedDate.setDate(requestedDate.getDate()+date)
    return requestedDate
  }

}
