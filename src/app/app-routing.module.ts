import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { SettingsComponent } from './views/settings/settings.component';
import { RecoverPasswordComponent } from './views/authentication/recover-password/recover-password.component';
import { AuthGuard } from './views/authentication/login/shared/auth.guard';
import { ProfileComponent } from './views/profile/profile.component';
import { BookingComponent } from './views/booking/booking.component';
import { UpdatePasswordComponent } from './views/authentication/update-password/update-password.component';
import { Page404Component } from './views/page404/page404.component';
import { BookingPage2Component } from './views/booking-page2/booking-page2.component';
import { BookingConfirmationComponent } from './views/booking-confirmation/booking-confirmation.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'definicoes', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'recuperar_password', component: RecoverPasswordComponent},
  {path: 'nova_password', component: UpdatePasswordComponent},
  {path: 'senhas', component: BookingComponent},
  {path: 'agendar', component: BookingPage2Component},
  {path: 'agendamento_concluido', component: BookingConfirmationComponent},
  {path: '', component: LoginComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
    ]
  },
  {path: '**', component: Page404Component, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
