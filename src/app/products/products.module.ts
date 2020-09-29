import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from '../shared/shared.module';
import { ProductGroceryComponent } from './product-grocery/product-grocery.component';
import { ProductStockComponent } from './product-stock/product-stock.component';
import { ProductVeggiesComponent } from './product-veggies/product-veggies.component';
import { ProductSpicesComponent } from './product-spices/product-spices.component';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent, ProductGroceryComponent, ProductStockComponent, ProductVeggiesComponent, ProductSpicesComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
