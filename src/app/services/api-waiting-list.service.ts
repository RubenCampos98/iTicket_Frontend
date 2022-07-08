import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiWaitingListService {

  constructor(
    private http: HttpClient
  ) { }

  createWaitingLists(data: any){
    return this.http.post<any>(`${environment.api}/waiting_lists`, data, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  getWaitingLists(){
    return this.http.get<any>(`${environment.api}/waiting_lists`, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  getWaitingListsBooking(){
    return this.http.get<any>(`${environment.api}/waiting_lists/1/wl_orderByService`, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  getTicketsByQueue(){
    return this.http.get<any>(`${environment.api}/waiting_lists/1/numberOfTicketByQueue`, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  getBookingsByQueue(){
    return this.http.get<any>(`${environment.api}/waiting_lists/1/numberOfBookingsByQueue`, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  updateWaitingList(data: any, id: number){
    return this.http.put<any>(`${environment.api}/waiting_lists/` + id, data, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  deleteWaitingLists(id: number){
    return this.http.delete<any>(`${environment.api}/waiting_lists/` + id, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

}
