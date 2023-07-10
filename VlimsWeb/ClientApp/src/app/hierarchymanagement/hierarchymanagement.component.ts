import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hierarchymanagement',
  templateUrl: './hierarchymanagement.component.html',
  styleUrls: ['./hierarchymanagement.component.css']
})
export class HierarchymanagementComponent implements OnInit {
  tabselect: string = 'type';
  constructor(private router: Router) { }

  ngOnInit() {
    debugger
    this.tabselect = this.router.url.split('/').pop(); 
  }

}
