import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ServiceModule } from 'src/app/modules/service.module';
import { BookingModule } from 'src/app/modules/booking.module';
import { LocationModule } from 'src/app/modules/location.module';
import { UserModule } from 'src/app/modules/user.module';
import { TicketModule } from 'src/app/modules/ticket.module';

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

  @ViewChild('wizard')
  public wizardRef: TemplateRef<any>;

  serviceModelObj :ServiceModule = new ServiceModule
  bookingModelObj :BookingModule = new BookingModule
  locationModelObj :LocationModule = new LocationModule
  userModelObj :UserModule = new UserModule
  ticketModelObj :TicketModule = new TicketModule

  constructor(
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {}

  private preventNavigation(): void {
    const location = window.document.location;
    const originalHashValue = location.hash;

    window.setTimeout(() => {
      location.hash = 'preventNavigation' + (9999 * Math.random());
      location.hash = originalHashValue;
    }, 0);
  }

  public disableBrowserNavigation(): void {
    window.addEventListener('beforeunload', this.preventNavigation, false);
    window.addEventListener('unload', this.preventNavigation, false);
  }

  public enableBrowserNavigation(): void {
    window.removeEventListener('beforeunload', this.preventNavigation);
    window.removeEventListener('unload', this.preventNavigation);
  }

}
