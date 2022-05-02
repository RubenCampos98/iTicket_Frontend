import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiBookingService {

  constructor(
    private http: HttpClient
  ) { }

  //Methods: POST, GET, PUT, DELETE

  //Get Location
  getBooking(){
    return this.http.get<any>(`${environment.api}/bookings`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

}
