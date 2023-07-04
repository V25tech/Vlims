import { Component } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Carts } from '../model/carts';
import { Bill } from '../model/bill';
import { CartsService } from '../Services/carts.service';
import { BillingService } from '../Services/billing.service';
import { BillingInfo } from '../model/billingInfo';
import { BillingProducts } from '../model/billingProducts';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  templateUrl: './carts.html',
  styles: [`
  .btn-space {
    margin-right: 5px;
  }
`]
})
export class CartsComponent {
  name: string = 'Carts';
  retailId = 0;
  carts: Array<Carts>;
  newCart: Carts;
  actiontype = 0;
  newobj: Bill;
  cash: string; card: string; online: string;
  pageConfig: any;
  filterStr: string;
  subtotal: number = 0; total: number = 0; totaltax: number = 0;


  constructor(private commonsvc: CommonService, private castssvc: CartsService, private billsvc: BillingService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) {
    this.newCart = new Carts();
    this.carts = [];
    this.actiontype = 1;
    //this.retailId = this.commonsvc.retaileR.RetailId;
    this.newobj = new Bill(); this.newobj.BillInfo = new BillingInfo();
    this.cash = 'Cash'; this.card = 'Card'; this.online = 'Online';
    this.pageConfig = commonsvc.pageConfig;
    this.pageConfig.currentPage = 1;
    this.pageConfig.itemsPerPage = 3;
  }
  ngOnInit() {
    this.commonsvc.pullSearchStr().subscribe(p => { this.filterStr = p });
    this.getCarts();
  }

  getCarts() {
    this.loader.show();
    this.retailId = this.commonsvc.getretailId();
    this.castssvc.getCarts(this.retailId).subscribe((data: any) => {
      this.carts = data;
      this.carts.forEach(element => {
        this.subtotal = this.subtotal + element.TotalPrice;
        this.totaltax = this.totaltax + (element.CGST + element.SGST);
        this.total = this.subtotal + this.totaltax;
      });
      this.loader.hide();
      console.log('castssvc', data);
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }


  deleteCart(index: number, cart: Carts) {

    if (this.commonsvc.confirmDelete()) {
      this.castssvc.deleteCart(cart.CartId).subscribe((data: any) => {
        if (data > 0) {
          let deletedItemIndex = this.carts.indexOf(cart);
          this.pageConfig.currentPage = this.commonsvc.setCurrentPage(this.pageConfig, deletedItemIndex, this.carts.length);
          this.carts.splice(deletedItemIndex, 1);
          this.commonsvc.modifyCartsCount(-1);
          this.toastr.success('deleted');
          //this.getCarts();
        }
        else {
          this.toastr.error('failed');
        }
      });
    }
  }

  makepayment(type: number, objbill: Bill) {

    if (this.carts != null && this.carts.length > 0) {
      if (type == 1) {

        objbill.BillInfo.PaymentType = this.cash;
        this.cashpayment(objbill);

      }
      else if (type == 2) {
        objbill.BillInfo.PaymentType = this.card;
        this.cardpayment(objbill);
      }
      else if (type == 3) {
        objbill.BillInfo.PaymentType = this.online;
        this.onlinepayment(objbill);
      }
    }
    else {
      this.toastr.error('unable to bill,cart is empty');
    }
  }

  cashpayment(bill: Bill) {

    let objbill = this.billinglogic(bill);

    if (objbill != null || undefined) {
      this.addbilling(objbill);
    }
  }

  addplus(objcart: Carts) {
    objcart.Quantity = objcart.Quantity + 1;
  }

  updatecarts() {
    if (this.carts != null && this.carts.length > 0) {
      this.castssvc.updateCart(this.carts).subscribe((data: any) => {
        if (data > 0) {
          this.toastr.success('updated');
          this.getCarts();
        }
      });
    }
    else {
      this.toastr.error('unable to update,cart is empty');
    }
  }

  cardpayment(bill: Bill) {
    let objbill = this.billinglogic(bill);

    if (objbill != null || undefined) {
      this.addbilling(objbill);
    }
  }

  onlinepayment(bill: Bill) {

    let objbill = this.billinglogic(bill);

    if (objbill != null || undefined) {
      this.addbilling(objbill);
    }
  }

  addbilling(objbill: Bill) {
    debugger
    this.loader.show();
    this.billsvc.addBilling(objbill).subscribe((data: any) => {
      if (data > 0) {
        this.toastr.success('billing success');
        this.totaltax = 0;
        this.total = 0; this.subtotal = 0;
        this.router.navigateByUrl("mainpage/billing");
        //this.getCarts();
        $("#fid").trigger("reset");
      }
      else {
        this.toastr.error('billing failed');
      }
      this.loader.hide();
    });
  }

  billinglogic(objbill: Bill) {

    objbill.BillProducts = new Array<BillingProducts>();

    if (this.carts != null || undefined) {
      let totaltaxamount: number = 0;
      let totalbilledamount: number = 0;
      let totalpaidamount: number = 0;
      let totalactualamount: number = 0;

      objbill.BillInfo.RetailId = this.retailId;
      objbill.BillInfo.UserId = this.commonsvc.userId;
      this.carts.forEach(element => {
        let objprod = new BillingProducts();
        objprod.ProductId = element.ProductId;
        objprod.Price = element.Price;
        objprod.Quantity = element.Quantity;
        objprod.Tax = element.TaxAmount;
        objprod.CreatedBy = this.commonsvc.createdBy;
        objprod.UpdatedBy = this.commonsvc.createdBy;
        objbill.BillProducts.push(objprod);
        totaltaxamount = totaltaxamount + element.TaxAmount;
        totalbilledamount = totalbilledamount + element.TotalPrice;
        totalpaidamount = totalpaidamount + element.TotalPrice;

      });

      objbill.BillInfo.BilledAmount = totalbilledamount;
      objbill.BillInfo.PaidAmount = totalpaidamount;
      objbill.BillInfo.TaxAmount = totaltaxamount;
      objbill.BillInfo.ActualAmount = totalbilledamount;
      objbill.BillInfo.CreatedBy = this.commonsvc.createdBy;
      objbill.BillInfo.UpdatedBy = this.commonsvc.createdBy;

    }

    return objbill;
  }
}
