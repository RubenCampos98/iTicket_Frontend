import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserModule } from '../modules/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  public user: UserModule | undefined;

  public userSubject = new Subject<UserModule | undefined>();

  constructor(
    private http: HttpClient
  ) {
    this.userSubject.next(this.user);
   }

   public getUserContent(): Observable<UserModule | undefined> {
    return this.userSubject.asObservable();
  }

  public get(): Promise<UserModule> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.api}/account`, {
        withCredentials: true
      })
      .subscribe(
        (user: any) => {
          this.user = user;
          this.userSubject.next(this.user);
          resolve(this.user!);
        },
        (err) => {
          this.user = undefined;
          this.userSubject.next(this.user);
          reject(err);
        }
      );
    });
  }

  

}
