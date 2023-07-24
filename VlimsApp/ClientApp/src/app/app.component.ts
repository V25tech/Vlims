import { Component, OnInit } from '@angular/core';

import { LoginService } from "./modules/authentication/services/login.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DocumentManagementSystem';
  isNavOpen: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private loginService:LoginService){
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  ngOnInit() {
    this.loginService.loginStatusChanged$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  toggleSidenav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  onLoginSuccess() {
    console.log('from emitter');
    this.isLoggedIn = true;
  }

}
