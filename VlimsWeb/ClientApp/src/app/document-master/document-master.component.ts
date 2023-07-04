import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-master',
  templateUrl: './document-master.component.html',
  styleUrls: ['./document-master.component.css']
})
export class DocumentMasterComponent implements OnInit {
  tabselect: string = 'doctype';
  constructor(private router: Router) { }

  ngOnInit() {
    this.tabselect = this.router.url.split('/').pop(); 
  }

}
