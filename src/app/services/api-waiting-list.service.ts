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

  getWaitingLists(){
    return this.http.get<any>(`${environment.api}/waiting_lists`, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

}
