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
import { SearchBarPipe } from './views/settings/pipes/search-bar.pipe';

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
    SearchBarPipe
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
    NgbModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
