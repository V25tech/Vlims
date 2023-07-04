import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../Services/billing.service';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { DaywiseReport } from '../model/DaywiseReport';
import { PaymentReport } from '../model/PaymentReport';


@Component({
  templateUrl: './dashboard.html'
})
export class DashBoardComponent {
  objday: DaywiseReport;
  objpayments: PaymentReport;
  retailId:number;
  constructor(private router: Router, private commonsvc: CommonService, private billsvc: BillingService, private toastr: ToastrService, private loader: SpinnerService) {

  }
  name = 'Angular';

  ngOnInit() {
    //this.getdaysreport();
  }
  getdaysreport() {
    this.loader.show();
    this.retailId = this.commonsvc.getretailId();
    return this.billsvc.getdaysreport(this.retailId).subscribe((data: any) => {
      this.objday = data;
      this.getpaymentsreport();
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }
  getpaymentsreport() {
    this.objpayments=new PaymentReport();
    return this.billsvc.getpaymentsreport(this.retailId).subscribe((data: any) => {
      this.objpayments = data;
      this.loader.hide();
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }

  redirect() {

    this.router.navigate(['/products']);
  }

}
