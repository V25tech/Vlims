import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { RequestContext, UserConfiguration } from 'src/app/models/model';
import { UsersconfigurationService } from '../../services/usersconfiguration.service';
import { CommonService } from 'src/app/shared/common.service';

const AUTH_STORAGE_KEY = 'isLoggedIn';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  lstusers:UserConfiguration[]=[];
  isvalid=false;
  private loginStatusChanged = new Subject<boolean>();
  loginStatusChanged$ = this.loginStatusChanged.asObservable();

  private loggedIn = false;

  isLoggedIn(): boolean {  
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';;
  }

  updateLoginStatus(status: boolean) {
    this.loggedIn = status;
    this.loginStatusChanged.next(this.loggedIn);
  }

  
  constructor(private http: HttpClient,private userssvc:UsersconfigurationService,
    private commonsvc:CommonService ) {}

  login(username: string, password: string,lstusers:UserConfiguration[]) {
    if(username==='admin')
    {
       this.isvalid = username === 'admin' && password === 'quoting123';

      if (this.isvalid) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        this.updateLoginStatus(true);
      }
    }
    else if(lstusers!=null && lstusers!=undefined)
    {
      let user=lstusers.find(o=>o.UserID===username && o.Password===password);
      if(user!=null && user!=undefined)
      {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        this.updateLoginStatus(true);
        this.isvalid=true;
      }
    }
    return this.isvalid;
  }
getusers(){
  let p_context=new RequestContext();
   p_context.PageNumber=1;p_context.PageSize=100;p_context.PageSize=0;
    return this.userssvc.getusers(p_context).subscribe((data:any)=>{
      this.lstusers=data.Response;
    });
}
  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.updateLoginStatus(false);
  }
}
