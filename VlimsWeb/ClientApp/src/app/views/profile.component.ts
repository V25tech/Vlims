import { Component, OnInit } from '@angular/core';
import { RetailerService } from '../Services/retailer.service';
import { CommonService } from '../shared/common.service';
import { Retailer } from '../model/Retailer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  objnew: Retailer;
  constructor(private toastr: ToastrService, private retailersvc: RetailerService, private commonsvc: CommonService) {
    this.objnew = new Retailer();
  }

  ngOnInit() {
    this.getRetailer();
  }

  getRetailer() {
    this.commonsvc.getretailId();
    this.objnew = this.commonsvc.retaileR;
  }

  update(objretail: Retailer) {
    if (objretail != undefined || null) {
      this.retailersvc.updateRetailer(objretail).subscribe((data: any) => {
        if (data == 1) {
          this.toastr.success('Updated successfully');
        }
        else
          this.toastr.error('Updated failed');
      });
    }
  }
}
