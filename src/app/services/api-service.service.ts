import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  Services

  constructor(
    private http: HttpClient
  ) { }

  getService(){
    return this.http.get<any>(`${environment.api}/services`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }
  
  getActiveService(){
    return this.http.get<any>(`${environment.api}/services/1/activeServices`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  getServiceById(id){
    return this.http.get<any>(`${environment.api}/services/` + id, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  createService(data: any){
    return this.http.post<any>(`${environment.api}/services`, data, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  //Update Service
  updateService(data: any, id: number){
    return this.http.put<any>(`${environment.api}/services/` + id, data, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  deleteService(id: number){
    return this.http.delete<any>(`${environment.api}/services/` + id, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

}
