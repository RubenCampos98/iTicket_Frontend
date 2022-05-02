import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  getServicos(
    serviceId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<any>{

      return this.http.get<any>(`${environment.api}/services`, {
        params: new HttpParams()
          .set('serviceId', serviceId.toString())
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
      }).pipe(
        map(res => res['payload'])
      )
    }

  getServiceById(id: number){
    return this.getService().subscribe(service => {
      return service.id === id;
    })
  }

}
