import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baesUrl = 'http://localhost:5000/api/auth/';

constructor(private Http: HttpClient) { }
 login(model: any) {
  return  this.Http.post(this.baesUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token' , user.token);
      }
    })
  );
 }
 register(model: any) {
   return this.Http.post(this.baesUrl + 'register' , model);
 }
}
