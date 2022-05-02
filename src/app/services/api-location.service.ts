import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiLocationService {

  constructor(
    private http: HttpClient
  ) { }

  //Methods: POST, GET, PUT, DELETE
  //Create Location
  postLocation(data: any){
    return this.http.post<any>(`${environment.api}/locations`, data, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  //Get Location
  getLocation(){
    return this.http.get<any>(`${environment.api}/locations`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  //Update Location
  updateLocation(data: any, id: number){
    return this.http.put<any>(`${environment.api}/locations/` + id, data, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  //Delete Location
  deleteLocation(id: number){
    return this.http.delete<any>(`${environment.api}/locations/` + id, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  getLocationById(id: number){
    return this.getLocation().subscribe(location => {
      return location.id === id;
    })
  }

}
