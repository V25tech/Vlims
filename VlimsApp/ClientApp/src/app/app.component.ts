import { Component, OnInit,HostListener, TemplateRef, ViewChild } from '@angular/core';
import { LoginService } from "./modules/authentication/services/login.service";
import { CommonService } from './shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ExistingDocumentRequest, RequestContext } from './models/model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DocumentManagementSystem';
  isNavOpen: boolean = false;
  isLoggedIn: boolean = false;
  
  constructor(private loginService:LoginService,
    private commonsvc:CommonService,
    private loginsvc:LoginService,
    private toastr:ToastrService
    ){
      //this.checkSessionTimeoutPeriodically();
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  ngOnInit() {
    this.loginService.loginStatusChanged$.subscribe((status: boolean) => {
      this.isLoggedIn = status;      
    });
    this.commonsvc.sidebarchanged$.subscribe((status:boolean)=>{
      this.isLoggedIn=!status
    });
    this.checkSessionTimeoutPeriodically();    
  }

  toggleSidenav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  onLoginSuccess() {
    console.log('from emitter');
    this.isLoggedIn = true;
  }
  @HostListener('document:click')
  @HostListener('document:keydown')
  resetSessionTimeout() {
    this.commonsvc.resetSessionTimeout(30);
  }

  checkSessionTimeoutPeriodically() {
    setInterval(() => {
      console.log('checking');
      if (this.commonsvc.isSessionExpired()) {
        this.toastr.info('Thank you for using our application. You have been successfully logged out.', 'Session Timeout');
        this.loginService.logout();
      }
    }, 30000); // Check every minute (adjust interval as needed)
  }
}
