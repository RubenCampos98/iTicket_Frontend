import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceAvailableHourService {

  constructor(
    private http: HttpClient
  ) { }

  getServiceAvailableHour(){
    return this.http.get<any>(`${environment.api}/services_available_hours`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  createServiceAvailableHour(data: any){
    return this.http.post<any>(`${environment.api}/services_available_hours`, data, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  updateServicevHour(data: any, id: number){
    return this.http.put<any>(`${environment.api}/services_available_hours/` + id, data, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  deleteServiceAvailableHour(id: number){
    return this.http.delete<any>(`${environment.api}/services_available_hours/` + id, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }
}
