import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserConfiguration, functionalprofile } from 'src/app/models/model';
import { UsersconfigurationService } from '../../services/usersconfiguration.service';
import { CommonService } from 'src/app/shared/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


const AUTH_STORAGE_KEY = 'isLoggedIn';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
    private router: Router,private toastr:ToastrService,
    private commonsvc:CommonService ) {}

  login(username: string, password: string,lstusers:UserConfiguration[],roles:functionalprofile[]) {
       this.isvalid = username.toLocaleLowerCase() === 'admin' && password === 'quoting123';
      if (this.isvalid) {
        this.commonsvc.setadminroles();
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        this.updateLoginStatus(true);
      }
    return this.isvalid;
  }
  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.updateLoginStatus(false);
    this.commonsvc.removeUserRole();
    this.isvalid=false;
    this.toastr.info('Thank you for using our application. You have been successfully logged out.', 'Logout');
    this.router.navigate(['/login']);
  }
  updateuser(roles:functionalprofile[],user:UserConfiguration){
    const role = roles.find(
      (o) => o.role.toLowerCase() === user?.Role.toLowerCase()
    );

    if (role != null && role != undefined) {
      this.commonsvc.setUserRoles(role);
    } else {
      this.commonsvc.removeUserRole();
    }
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    this.updateLoginStatus(true);
  }
}
