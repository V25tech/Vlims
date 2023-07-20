


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval-configurations',
  templateUrl: './approval-configurations.component.html',
  styleUrls: ['./approval-configurations.component.css']
})
export class ApprovalConfigurationsComponent implements OnInit {
  tabselect: string = 'type';
  constructor(private router: Router) { }

  ngOnInit() {
    debugger
    this.tabselect = this.router.url.split('/').pop(); 
  }

}
