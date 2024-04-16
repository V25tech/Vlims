import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../shared/common.service';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reportsdashboard.component.html',
  styleUrls: ['./reportsdashboard.component.scss']
})
export class ReportsDashboardComponent {
  constructor(private router: Router, public commonSrvc: CommonService, private activate: ActivatedRoute) { }

  navigateTo(navTo: any) {
    if (navTo != null || navTo != undefined) {
      this.router.navigate(["/docindex"]);
    }
  }
}
