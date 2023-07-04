import { Injectable } from '@angular/core';
import { AppintializorService } from '../shared/appintializor.service'
import { HttpbaseService } from '../shared/httpbase.service'
import { Retailer } from '../model/Retailer'

@Injectable({
    providedIn: 'root'
})
export class RetailerService {
    retailer: Retailer;

    constructor(private http: HttpbaseService) {
    }

    getretailer() {
        return this.http.getJson("api/retailer/getr");
    }

    addretailer(objretailer: Retailer) {
        return this.http.postJson(objretailer, "api/retailer/addr");
    }

    updateRetailer(objretailer: Retailer) {
        return this.http.postJson(objretailer, "api/retailer/updater");
    }


}
