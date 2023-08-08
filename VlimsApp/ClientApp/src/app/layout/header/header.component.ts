import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/authentication/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
user:string='admin';
  constructor(private loginservice: LoginService, private router: Router){    
  }
  logout(){
    this.loginservice.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    const user=localStorage.getItem("username");
    if(user!=null && user!=undefined)
    {
      this.user=user;
    }
  }
}
