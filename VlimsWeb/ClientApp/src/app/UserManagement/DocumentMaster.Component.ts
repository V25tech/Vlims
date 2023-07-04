import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import 'hammerjs';
import { Router } from '@angular/router';


@Component({
  templateUrl: './DocumentMaster.html',
})
export class DocumentMasterComponent {
  tabselect: string = 'type';

  constructor(private router: Router) {}
  ngOnInit() {
    this.tabselect = this.router.url.split('/').pop();   
  }
  
}
