import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { BillingService } from '../Services/billing.service';
import { BillingInfo } from '../model/billingInfo';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpinnerService } from '../spinner/spinner.service';


@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html'
})
export class BillingsComponent implements OnInit {
  billings: Array<BillingInfo>;
  retailId: number;
  pageConfig : any;
  filterStr: string;
  constructor(private commonsvc: CommonService, private toastr: ToastrService, private billsvc: BillingService, private router: Router,private loader:SpinnerService) {
    this.billings = new Array<BillingInfo>();
    this.pageConfig = commonsvc.pageConfig;
    this.pageConfig.itemsPerPage=5;
    //this.retailId = this.commonsvc.retaileR.RetailId;
  }

  ngOnInit() {
    this.getBillings();
    this.commonsvc.pullSearchStr().subscribe(p => { this.filterStr=p});
  }


  getBillings() {
    this.loader.show();
    this.retailId = this.commonsvc.getretailId();
    return this.billsvc.getBillings(this.retailId).subscribe((data: any) => {
      this.billings = data;      
      this.loader.hide();
    },er=>{
      this.toastr.error('loading failed');
      this.loader.hide();});
  }

  viewbll(objbill: BillingInfo) {
    this.commonsvc.billId = objbill.BillId;

    this.router.navigateByUrl("invoice");

  }

}
