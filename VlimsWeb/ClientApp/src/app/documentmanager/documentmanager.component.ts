import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentmanager',
  templateUrl: './documentmanager.component.html',
  styleUrls: ['./documentmanager.component.css']
})
export class DocumentmanagerComponent implements OnInit {
  tabselect: string = 'documenman';
  constructor(private router: Router) { }

  ngOnInit() {
    this.tabselect = this.router.url.split('/').pop();
  }

}
