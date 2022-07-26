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

  getTicketFromBooking(){
    return this.http.get<any>(`${environment.api}/tickets/1/ticketFromBooking`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  getTicketNotAttended(){
    return this.http.get<any>(`${environment.api}/tickets/1/notMetTicket`, { withCredentials: true }).pipe(map((res:any) =>{
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

  getCurrentDayTickets(){
    return this.http.get<any>(`${environment.api}/tickets/100/countTicketsTodayOrderByWL/99`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  getTodayBookingTickets(){
    return this.http.get<any>(`${environment.api}/tickets/100/todayBookingTickets`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  createTicket(data: any){
    return this.http.post<any>(`${environment.api}/tickets`, data, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  updateTicket(data: any, id: number){
    return this.http.put<any>(`${environment.api}/tickets/` + id, data, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  deleteTicket(id: number){
    return this.http.delete<any>(`${environment.api}/tickets/` + id, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }
}
