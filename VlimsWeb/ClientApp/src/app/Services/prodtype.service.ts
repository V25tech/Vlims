import { Injectable } from '@angular/core';
import { HttpbaseService } from '../shared/httpbase.service';
import { ProductType } from '../model/productType';



@Injectable({
    providedIn: 'root'
})
export class ProdtypeService {

    constructor(private http: HttpbaseService) { }

    getproductTypes(retailId: number) {
        return this.http.getJson("api/productType/gett?retailerId=" + retailId);
    }

    addProductType(prodtype: ProductType) {
        return this.http.postJson(prodtype, "api/productType/addt");
    }

    updateProductType(prodtype: ProductType) {
        return this.http.postJson(prodtype, "api/productType/updatet");
    }

    deleteProductType(typeId: number) {
        return this.http.delete("api/productType/deletet?typeId=" + typeId);
    }

    importProductTypes(formdata: FormData, id: number) {
        return this.http.postJson(formdata, 'api/productType/import?retailId=' + id);
    }
    exportProductTypes(rid: number) {
        return this.http.getBlob('api/productType/export?retailId=' + rid);
    }
}
