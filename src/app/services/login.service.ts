import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLoggedIn: boolean = false

  constructor(
    private http: HttpClient
  ) { }

  getSession(){
    return this.http.get<any>(`${environment.api}/account`, { withCredentials: true }).pipe(map((res: any) =>{
      return res;
    }))
  }

  Login(data: any){
    return this.http.post<any>(`${environment.api}/sessions`, data).pipe(map((res: any) =>{
      return res;
    }))
  }

  LogoutSession(id: number){
    console.log('logout')
    return this.http.delete<any>(`${environment.api}/sessions/` + id, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

  resetPassword(email: string){
    return this.http.get<any>(`${environment.api}/reset_password?email=${email}`).pipe(map((res: any) =>{
      return res;
    }))
  }

  updatePassword(data: any){
    return this.http.post<any>(`${environment.api}/update_password`, data).pipe(map((res: any) =>{
      return res;
    }))
  }

}
