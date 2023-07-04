import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import 'hammerjs';
import { Router } from '@angular/router';


@Component({
  templateUrl: './products.html',
})
export class ProductsComponent {
  tabselect: string = 'type';

  constructor(private router: Router) {}
  ngOnInit() {
    this.tabselect = this.router.url.split('/').pop();   
  }
  
}
