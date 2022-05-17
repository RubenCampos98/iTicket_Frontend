import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiBookingService } from 'src/app/services/api-booking.service';
import { ApiLocationService } from 'src/app/services/api-location.service';
import { ApiTicketService } from 'src/app/services/api-ticket.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ApiWaitingListService } from 'src/app/services/api-waiting-list.service';

import { ServiceModule } from 'src/app/modules/service.module';
import { BookingModule } from 'src/app/modules/booking.module';
import { LocationModule } from 'src/app/modules/location.module';
import { UserModule } from 'src/app/modules/user.module';
import { TicketModule } from 'src/app/modules/ticket.module';

import { DeleteModalComponent } from 'src/app/partials/modals/delete-modal/delete-modal.component';
import { EditServiceModalComponent } from 'src/app/partials/modals/edit-service-modal/edit-service-modal.component';
import { EditBookingModalComponent } from 'src/app/partials/modals/edit-booking-modal/edit-booking-modal.component';
import { EditLocationModalComponent } from 'src/app/partials/modals/edit-location-modal/edit-location-modal.component';
import { EditUserModalComponent } from 'src/app/partials/modals/edit-user-modal/edit-user-modal.component';
import { EditTicketModalComponent } from 'src/app/partials/modals/edit-ticket-modal/edit-ticket-modal.component';
import { Time } from '@angular/common';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [
    NgbModalConfig, 
    NgbModal,
    NgbActiveModal
  ]
})
export class SettingsComponent implements OnInit {

  @ViewChild('editService') private editService!: EditServiceModalComponent
  @ViewChild('editBooking') private editBooking!: EditBookingModalComponent
  @ViewChild('editLocation') private editLocation!: EditLocationModalComponent
  @ViewChild('editUser') private editUser!: EditUserModalComponent
  @ViewChild('editTicket') private editTicket!: EditTicketModalComponent

  @ViewChild('wizard')
  public wizardRef: TemplateRef<any>;

  allServiceData
  allBookingData
  allTicketData
  allWaitingListData
  allLocationData
  allUserData

  serviceSearchBar
  bookingSearchBar
  locationSearchBar
  userSearchBar
  ticketSearchBar

  serviceModelObj :ServiceModule = new ServiceModule
  bookingModelObj :BookingModule = new BookingModule
  locationModelObj :LocationModule = new LocationModule
  userModelObj :UserModule = new UserModule
  ticketModelObj :TicketModule = new TicketModule

  //---------paginator-----------------
  page = 1
  pageSize = 5
  page1 = 1
  pageSize1 = 5

  pageLocation = 1
  pageSizeLocation = 5

  SettingsPagination: Location[]

  servicesPagination: Location[]
  bookingsPagination: Location[]
  locationsPagination: Location[]
  usersPagination: Location[]
  ticketsPagination: Location[]
  waitingListsPagination: Location[] 
  
  //-----------------------------------

  isChecked = true

  serviceForm !:FormGroup
  locationForm !:FormGroup

  address: any[]

  constructor(
    private api_service: ApiServiceService,
    private api_booking: ApiBookingService,
    private api_location: ApiLocationService,
    private api_ticket: ApiTicketService,
    private api_user: ApiUserService,
    private api_waitingList: ApiWaitingListService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {
    this.getServiceData()
    this.getBookingData()
    this.getLocationData()
    this.getUserData()
    this.getWaitingListData()
    this.getTicketData()

    this.ServiceTablePagination()
    this.BookingTablePagination()
    this.LocationTablePagination()
    this.UserTablePagination()
    this.TicketTablePagination()
    this.WaitingListTablePagination()
  }
  
  //--------------------------------------------Services--------------------------------------------

  getServiceData(){
    this.api_service.getService().subscribe(res => {
      this.allServiceData = res['data'];      
    })
  }

  onEditService(data: any){
    this.serviceModelObj.id = data.id;
    this.serviceForm.controls['name'].setValue(data.name);
    this.serviceForm.controls['status'].setValue(data.status);
  }

  getServiceById(id){
    this.api_ticket.getTicketById(id).subscribe(res => {
      console.log(res.data)
      this.allServiceData = res['data'];   
    })
  }

  openServiceEditModal(id: number, name: string, status: boolean) {
    console.log(id, name, status)
    this.editService.open(id, name, status);
  }

  ServiceTablePagination(){
    this.SettingsPagination = this.allServiceData && this.allServiceData
      .map((service, i) => ({id: i + 1, ...service}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  //--------------------------------------------Bookings--------------------------------------------

  getBookingData(){
    this.api_booking.getBooking().subscribe(res => {
      this.allBookingData = res['data'];      
    })
  }

  openBookingEditModal(id: number, name: string, email: string, start_time: Time, priority: number, status: boolean,
    notes: string, service_id: number, location_id: number) {
    console.log(id, name, email, start_time, priority, status, notes, service_id, location_id);
    this.editBooking.open(id, name, email, start_time, priority, status, notes, service_id, location_id);
  }

  BookingTablePagination(){
    this.SettingsPagination = this.allBookingData && this.allBookingData
      .map((booking, i) => ({id: i + 1, ...booking}))
      .slice((this.page - 1) * this.pageSize1, (this.page - 1) * this.pageSize + this.pageSize)
  }

  //--------------------------------------------Locations--------------------------------------------

  getLocationData(){
    this.api_location.getLocation().subscribe(res => {
      this.allLocationData = res['data'];
    })
  } 

  onEditLocation(data: any){
    this.locationModelObj.id = data.id;
    this.locationForm.controls['address'].setValue(data.address);
    this.locationForm.controls['status'].setValue(data.status);
    this.locationForm.controls['notes'].setValue(data.notes);
  }

  openLocationEditModal(id: number, address: string, status: boolean, notes: string) {
    console.log(id, address, status, notes)
    this.editLocation.open(id, address, status, notes);
  }

  LocationTablePagination(){
    this.locationsPagination = this.allLocationData && this.allLocationData
      .map((location, i) => ({id: i + 1, ...location}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  //--------------------------------------------Users--------------------------------------------

  getUserData(){
    this.api_user.getUser().subscribe(res => {
      this.allUserData = res['data'];
    })
  } 

  openUserEditModal(id: number, name: string, email: string, phone: number, admin: boolean) {
    console.log(id, name, email, phone, admin)
    this.editUser.open(id, name, email, phone, admin);
  }

  UserTablePagination(){
    this.SettingsPagination = this.allUserData && this.allUserData
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  //--------------------------------------------Tickets--------------------------------------------

  getTicketData(){
    this.api_ticket.getTicket().subscribe(res => {
      this.allTicketData = res['data'];      
    })
  }

  openTicketEditModal(id: number, number: number, duration: Time, status: number, priority: number, 
    notes: string, waiting_list_id: number) {
    console.log(id, ',',  number, ',', duration, ',', priority, ',', status, ',', notes, ',', waiting_list_id);
    this.editTicket.open(id, number, duration, priority, status, notes, waiting_list_id);
  }

  TicketTablePagination(){
    this.SettingsPagination = this.allTicketData && this.allTicketData
      .map((ticket, i) => ({id: i + 1, ...ticket}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  //--------------------------------------------Waiting_Lists--------------------------------------------

  getWaitingListData(){
    this.api_waitingList.getWaitingLists().subscribe(res => {
      this.allWaitingListData = res['data'];
    })
  }

  WaitingListTablePagination(){
    this.SettingsPagination = this.allWaitingListData && this.allWaitingListData
      .map((waitingList, i) => ({id: i + 1, ...waitingList}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }


  //---------------------------------------------------------------------------------------------

  sWitch(){
    if(this.allServiceData?.status == 'active'){
      this.isChecked == true
    }
    if(this.allServiceData?.status == 'inactive'){
      this.isChecked == false
    }
  }

  openDeleteModal(){
    this.modalService.open(DeleteModalComponent, {centered: true});
  }

}
