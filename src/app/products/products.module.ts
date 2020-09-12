import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from '../shared/shared.module';
import { ProductGroceryComponent } from './product-grocery/product-grocery.component';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent, ProductGroceryComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
