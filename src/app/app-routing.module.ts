import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LocationComponent } from './views/location/location.component';
import { LoginComponent } from './views/login/login.component';
import { BookingComponent } from './views/booking/booking.component';
import { ServiceComponent } from './views/service/service.component';
import { WaitingListComponent } from './views/waiting-list/waiting-list.component';
import { TicketComponent } from './views/ticket/ticket.component';
import { SettingsComponent } from './views/settings/settings.component';
import { RecoverPasswordComponent } from './views/recover-password/recover-password.component';
import { AuthGuard } from './views/login/shared/auth.guard';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'locations', component: LocationComponent},
  {path: 'bookings', component: BookingComponent},
  {path: 'services', component: ServiceComponent},
  {path: 'waiting_lists', component: WaitingListComponent},
  {path: 'ticket', component: TicketComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'recover_password', component: RecoverPasswordComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', component: LoginComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
