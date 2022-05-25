import { Component, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LoginService } from './services/login.service';

registerLocaleData(ptBr)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-PT' }]
})
export class AppComponent {
  title = 'iTicket-Frontend';

  sessionData

  constructor(
    private api_login: LoginService
  ) { }

  ngOnInit(): void {
    
  }

  getSessionData(){
    this.api_login.getSession().subscribe((res) => {
      this.sessionData = res;
      console.log('App_component')
    })
  }
}
