import { Injectable } from '@angular/core';
import { HttpbaseService } from '../shared/httpbase.service';
import { Carts } from '../model/carts';

@Injectable({
    providedIn: 'root'
})
export class CartsService {

    constructor(private http: HttpbaseService) { }

    getCarts(retailerId: number) {
        return this.http.getJson("api/cart/getc?retailerId=" + retailerId);
    }

    addCart(cart: Carts) {
        return this.http.postJson(cart, "api/cart/addc");
    }

    updateCart(cart: Carts[]) {
        return this.http.postJson(cart, "api/cart/updatec");
    }

    deleteCart(cartId: number) {
        return this.http.delete("api/cart/deletec?cartId=" + cartId);
    }
}
