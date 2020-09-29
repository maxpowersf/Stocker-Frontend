import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({providedIn: 'root'})
export class SpicesResolver implements Resolve<Observable<any>> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        return this.productService.getGroceryList(parseInt(id, 10));
    }
}