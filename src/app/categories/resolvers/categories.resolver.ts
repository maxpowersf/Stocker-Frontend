import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Injectable({providedIn: 'root'})
export class CategoriesResolver implements Resolve<Observable<any>> {
    constructor(
        private categoryService: CategoryService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.categoryService.getAll();
    }
}