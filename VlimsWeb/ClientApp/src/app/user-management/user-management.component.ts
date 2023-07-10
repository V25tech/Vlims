import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  tabselect: string = 'type';
  constructor(private router: Router) { }

  ngOnInit() {
    debugger
    this.tabselect = this.router.url.split('/').pop(); 
  }

}
