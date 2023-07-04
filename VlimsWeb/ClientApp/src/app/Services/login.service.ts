import { Injectable } from '@angular/core';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpbaseService) { }

  login(username: string, password: string) {
    //return this.http.getJson("api/billing/getbill?retailerId=" + retailerId);
    return this.http.getJson("api/login/validate/"+username+"/"+ password);
    // var body={"username":"musername","password":"mpassword"};
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // return this.http.postJson(body,'api/login/validate');
  }

  getUser(musername: string, mpassword: string)
  {
    return this.http.getJson("api/login/getu/"+musername+"/"+mpassword);
  }

}
