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

  getTicketById(id){
    return this.http.get<any>(`${environment.api}/tickets/` + id, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  getTicket_Queues(){
    return this.http.get<any>(`${environment.api}/tickets/1/ticket_queues`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  //Update Location
  updateTicket(data: any, id: number){
    return this.http.put<any>(`${environment.api}/tickets/` + id, data, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }
}
