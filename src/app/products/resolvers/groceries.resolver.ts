import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({providedIn: 'root'})
export class GroceriesResolver implements Resolve<Observable<any>> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.productService.getGroceryList();
    }
}