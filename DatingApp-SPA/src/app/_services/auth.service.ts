import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baesUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

constructor(private Http: HttpClient) { }
 login(model: any) {
  return  this.Http.post(this.baesUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token' , user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodedToken);
      }
    })
  );
 }
 register(model: any) {
   return this.Http.post(this.baesUrl + 'register' , model);
 }
 loggedIn() {
   const token = localStorage.getItem('token');
   return !this.jwtHelper.isTokenExpired(token);
   }
}
