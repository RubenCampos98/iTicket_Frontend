import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { HomePipesPipe } from './views/home/pipes/home-pipes.pipe';
import { SettingsComponent } from './views/settings/settings.component';
import { RecoverPasswordComponent } from './views/authentication/recover-password/recover-password.component';
import { UpdatePasswordComponent } from './views/authentication/update-password/update-password.component';
import { ProfileComponent } from './views/profile/profile.component';
import { BookingComponent } from './views/booking/booking.component';

import { SearchBarPipe } from './partials/tables/service-table/pipes/Service_search-bar.pipe';
import { LocationSearchBarPipe } from './partials/tables/location-table/pipes/location-search-bar.pipe';

import { NavbarComponent } from './partials/navbar/navbar.component';
import { DeleteModalComponent } from './partials/modals/delete/delete.component';
import { EditServiceModalComponent } from './partials/modals/edit/edit-service-modal/edit-service-modal.component';
import { EditBookingModalComponent } from './partials/modals/edit/edit-booking-modal/edit-booking-modal.component';
import { EditLocationModalComponent } from './partials/modals/edit/edit-location-modal/edit-location-modal.component';
import { EditUserModalComponent } from './partials/modals/edit/edit-user-modal/edit-user-modal.component';
import { EditTicketModalComponent } from './partials/modals/edit/edit-ticket-modal/edit-ticket-modal.component';
import { EditWaitingListComponent } from './partials/modals/edit/edit-waiting-list/edit-waiting-list.component';

import { ServiceTableComponent } from './partials/tables/service-table/service-table.component';
import { WaitingListTableComponent } from './partials/tables/waiting-list-table/waiting-list-table.component';
import { BookingTableComponent } from './partials/tables/booking-table/booking-table.component';
import { LocationTableComponent } from './partials/tables/location-table/location-table.component';
import { UserTableComponent } from './partials/tables/user-table/user-table.component';
import { TicketTableComponent } from './partials/tables/ticket-table/ticket-table.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './views/authentication/login/shared/auth.guard';
import { Page404Component } from './views/page404/page404.component';
import { CreateServiceComponent } from './partials/modals/create/create-service/create-service.component';
import { CreateLocationComponent } from './partials/modals/create/create-location/create-location.component';
import { BookingPage2Component } from './views/booking-page2/booking-page2.component';
import { CreateBookingComponent } from './partials/modals/create/create-booking-client/create-booking.component';
import { WarningComponent } from './partials/modals/warning/warning.component';
import { CreateWaitingListComponent } from './partials/modals/create/create-waiting-list/create-waiting-list.component';
import { CreateUserComponent } from './partials/modals/create/create-user/create-user.component';
import { BookingScheduleTableComponent } from './partials/tables/booking-schedule-table/booking-schedule-table.component';
import { CreateBookingScheduleComponent } from './partials/modals/create/create-booking-schedule/create-booking-schedule.component';
import { EditBookingScheduleComponent } from './partials/modals/edit/edit-booking-schedule/edit-booking-schedule.component';
import { BookingConfirmationComponent } from './views/booking-confirmation/booking-confirmation.component';
import { BookingSearchBarPipe } from './partials/tables/booking-table/pipes/booking-search-bar.pipe';
import { CreatedTicketComponent } from './partials/modals/create/created-ticket/created-ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    HomePipesPipe,
    SettingsComponent,
    RecoverPasswordComponent,
    SearchBarPipe,
    DeleteModalComponent,
    EditServiceModalComponent,
    ProfileComponent,
    EditBookingModalComponent,
    EditLocationModalComponent,
    EditUserModalComponent,
    EditTicketModalComponent,
    ServiceTableComponent,
    WaitingListTableComponent,
    EditWaitingListComponent,
    BookingTableComponent,
    LocationTableComponent,
    UserTableComponent,
    TicketTableComponent,
    BookingComponent,
    UpdatePasswordComponent,
    Page404Component,
    CreateServiceComponent,
    CreateLocationComponent,
    BookingPage2Component,
    CreateBookingComponent,
    WarningComponent,
    CreateWaitingListComponent,
    CreateUserComponent,
    BookingScheduleTableComponent,
    CreateBookingScheduleComponent,
    EditBookingScheduleComponent,
    BookingConfirmationComponent,
    LocationSearchBarPipe,
    BookingSearchBarPipe,
    CreatedTicketComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuard
  ],
  entryComponents: [
    DeleteModalComponent,
    EditServiceModalComponent,
    EditBookingModalComponent,
    EditLocationModalComponent,
    EditUserModalComponent,
    EditTicketModalComponent,
    EditWaitingListComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
