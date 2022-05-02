import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(){
    return this.http.get<any>(`${environment.api}/users`, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }
}
