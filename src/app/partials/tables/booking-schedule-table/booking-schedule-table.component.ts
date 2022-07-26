import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceAvailableDayService } from 'src/app/services/api-service-available-day.service';
import { ApiServiceAvailableHourService } from 'src/app/services/api-service-available-hour.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { LoginService } from 'src/app/services/login.service';
import { CreateBookingScheduleComponent } from '../../modals/create/create-booking-schedule/create-booking-schedule.component';
import { DeleteModalComponent } from '../../modals/delete/delete.component';
import { EditBookingScheduleComponent } from '../../modals/edit/edit-booking-schedule/edit-booking-schedule.component';
import { WarningComponent } from '../../modals/warning/warning.component';

@Component({
  selector: 'app-booking-schedule-table',
  templateUrl: './booking-schedule-table.component.html',
  styleUrls: ['./booking-schedule-table.component.scss']
})
export class BookingScheduleTableComponent implements OnInit {

  @ViewChild('createBookingSchedule') private createBookingSchedule!: CreateBookingScheduleComponent
  @ViewChild('editBookingSchedule') private editBookingSchedule!: EditBookingScheduleComponent
  @ViewChild('deleteModal') private deleteModal!: DeleteModalComponent
  @ViewChild('warningModal') private warningModal!: WarningComponent


  allAvailableDays
  allAvailableHours
  allServiceData
  bookingScheduleSearchBar

  today : Date = new Date()

  page = 1
  pageSize = 5
  BookingSchedulePagination: Location[]

  sessionData

  constructor(
    private api_service: ApiServiceService,
    private api_availableDay: ApiServiceAvailableDayService,
    private api_availableHour: ApiServiceAvailableHourService,
    private api_session: LoginService,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getAvailableDays()
    this.getAvailableHours()
    this.getSessionData()
    this.getWeekDay(0)
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

  openCreateBookingScheduleModal(){
    this.createBookingSchedule.open()
  }

  openEditBookingScheduleModal(id: number, hour: Time, service_available_day_id: number, service_available_day: any) {
    this.editBookingSchedule.open(id, hour, service_available_day_id, service_available_day);
  }

  openDeleteModal(id: number){
    if(this.sessionData?.admin != true){
      this.warningModal.open()
    }else{
      this.deleteModal.open('Tem a certeza de que pretende apagar este registo?', () => {
        /* this.api_location.deleteLocation(id).subscribe(res => {
          window.location.reload()
        }) */
      });
    }
  }

  getSessionData(){
    this.api_session.getSession().subscribe((res) => {
      this.sessionData = res;
    })
  }

  getWeekDay(date: number){
    var dt = new Date(); // current date of week
    var currentWeekDay = dt.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
    var requestedDate = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
    requestedDate.setDate(requestedDate.getDate()+date)
    return requestedDate
  }

}
