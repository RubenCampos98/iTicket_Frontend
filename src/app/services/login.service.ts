import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  sessionData

  constructor(
    private http: HttpClient
  ) { }

  getSession(){
    /*return new Promise((resolve, reject) => {
      this.http.get(`${environment.api}/account`, { withCredentials: true })
      .subscribe({
        next: user => {
          this.sessionData = user
          console.log(user['name']);
        },
        error: err => {
          console.log(err);
        }
      });
    });*/
    return this.http.get<any>(`${environment.api}/account`, { withCredentials: true }).pipe(map((res: any) =>{
      console.log('vindo da API', res)
      return res;
    }))
  }

  LogoutSession(id: number){
    return this.http.delete<any>(`${environment.api}/sessions/` + id, { withCredentials: true }).pipe(map((res:any) =>{
      return res;
    }))
  }

}
