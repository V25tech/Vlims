import { Injectable } from '@angular/core';
import { HttpbaseService } from '../shared/httpbase.service';
import { Brands } from '../model/brands';

@Injectable({
    providedIn: 'root'
})
export class BrandsService {

    constructor(private http: HttpbaseService) { }

    getBrands(retailId: number) {
        return this.http.getJson("api/brands/getb?retailerId=" + retailId);
    }

    addBrand(brand: Brands) {
        return this.http.postJson(brand, "api/brands/addb");
    }

    updateBrand(brand: Brands) {
        return this.http.postJson(brand, "api/brands/updateb");
    }

    deleteBrand(brandId: number) {
        return this.http.delete("api/brands/deleteb?brandId=" + brandId);
    }

    importBrands(formdata: FormData, id: number) {
        return this.http.postJson(formdata, 'api/brands/import?retailId=' + id);
    }

    exportBrands(rid: number) {
        return this.http.getBlob('api/brands/export?retailId=' + rid);
    }
}
