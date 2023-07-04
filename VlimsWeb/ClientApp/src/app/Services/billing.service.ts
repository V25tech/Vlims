import { Injectable } from '@angular/core';
import { HttpbaseService } from '../shared/httpbase.service';
import { Bill } from '../model/bill';

@Injectable({
    providedIn: 'root'
})
export class BillingService {

    constructor(private http: HttpbaseService) { }

    getBillings(retailerId: number) {
        return this.http.getJson("api/billing/getbill?retailerId=" + retailerId);
    }

    addBilling(bill: Bill) {
        return this.http.postJson(bill, "api/billing/addbill");
    }
    deleteBilling(billId: number) {
        return this.http.delete("api/billing/deletebill?billId=" + billId);
    }

    getBillingInfo(billId: number) {
        return this.http.getJson("api/billing/getbillinfo?billId=" + billId);
    }

     getbillsbydates(retailerId: number, dys: number) {
        return this.http.getJson('api/billing/getbillbydates?retailerId=' + retailerId + '&&days=' + dys);
    }
    getdaysreport(retailerId: number) {
        return this.http.getJson('api/billing/getdaysreport?retailerId=' + retailerId);
    }
    getpaymentsreport(retailerId: number) {
        return this.http.getJson('api/billing/getpaymentsreport?retailerId=' + retailerId);
    }

}
