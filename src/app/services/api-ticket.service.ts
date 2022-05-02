import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiTicketService {

  constructor(
    private http: HttpClient 
  ) { }

  getTicket(){
    return this.http.get<any>(`${environment.api}/tickets`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }
}
