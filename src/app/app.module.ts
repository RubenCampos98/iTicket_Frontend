import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { LocationComponent } from './views/location/location.component';
import { BookingComponent } from './views/booking/booking.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { ServiceComponent } from './views/service/service.component';
import { WaitingListComponent } from './views/waiting-list/waiting-list.component';
import { TicketComponent } from './views/ticket/ticket.component';
import { HomePipesPipe } from './views/home/pipes/home-pipes.pipe';
import { SettingsComponent } from './views/settings/settings.component';
import { RecoverPasswordComponent } from './views/recover-password/recover-password.component';
import { ProfileComponent } from './views/profile/profile.component';

import { SearchBarPipe } from './views/settings/pipes/Service_search-bar.pipe';

import { DeleteModalComponent } from './partials/modals/delete-modal/delete-modal.component';
import { EditServiceModalComponent } from './partials/modals/edit-service-modal/edit-service-modal.component';
import { EditBookingModalComponent } from './partials/modals/edit-booking-modal/edit-booking-modal.component';
import { EditLocationModalComponent } from './partials/modals/edit-location-modal/edit-location-modal.component';
import { EditUserModalComponent } from './partials/modals/edit-user-modal/edit-user-modal.component';
import { EditTicketModalComponent } from './partials/modals/edit-ticket-modal/edit-ticket-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LocationComponent,
    BookingComponent,
    NavbarComponent,
    ServiceComponent,
    WaitingListComponent,
    TicketComponent,
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
    EditTicketModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [
    CookieService
  ],
  entryComponents: [
    DeleteModalComponent,
    EditServiceModalComponent,
    EditBookingModalComponent,
    EditLocationModalComponent,
    EditUserModalComponent,
    EditTicketModalComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
