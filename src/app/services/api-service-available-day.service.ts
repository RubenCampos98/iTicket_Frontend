import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceAvailableDayService {

  constructor(
    private http: HttpClient
  ) { }

  getServiceAvailableDay(){
    return this.http.get<any>(`${environment.api}/services_available_days`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  createServiceAvailableDay(data: any){
    return this.http.post<any>(`${environment.api}/services_available_days`, data, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  updateServiceAvailableDay(data: any, id: number){
    return this.http.put<any>(`${environment.api}/services_available_days/` + id, data, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  deleteServiceAvailableDay(id: number){
    return this.http.delete<any>(`${environment.api}/services_available_days/` + id, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }
}
