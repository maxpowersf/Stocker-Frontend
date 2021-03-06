import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductResolver } from './resolvers/product.resolver';
import { CategoriesResolver } from '../categories/resolvers/categories.resolver';
import { ProductGroceryComponent } from './product-grocery/product-grocery.component';
import { GroceriesResolver } from './resolvers/groceries.resolver';
import { ProductStockComponent } from './product-stock/product-stock.component';
import { ProductVeggiesComponent } from './product-veggies/product-veggies.component';
import { ProductSpicesComponent } from './product-spices/product-spices.component';
import { VeggiesResolver } from './resolvers/veggies.resolver';
import { SpicesResolver } from './resolvers/spices.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: {
      products : ProductsResolver
    }
  },
  {
    path: 'groceries/:id',
    component: ProductGroceryComponent,
    resolve: {
      products: GroceriesResolver
    }
  },
  {
    path: 'veggies/:id',
    component: ProductVeggiesComponent,
    resolve: {
      products: VeggiesResolver
    }
  },
  {
    path: 'spices/:id',
    component: ProductSpicesComponent,
    resolve: {
      products: SpicesResolver
    }
  },
  {
    path: 'stock',
    component: ProductStockComponent,
    resolve: {
      products : ProductsResolver
    }
  },
  {
    path: 'stock/:id/edit',
    component: ProductFormComponent,
    resolve: {
      categories: CategoriesResolver,
      product: ProductResolver
    }
  },
  {
    path: 'new',
    component: ProductFormComponent,
    resolve: {
      categories: CategoriesResolver
    }
  },
  {
    path: ':id/edit',
    component: ProductFormComponent,
    resolve: {
      categories: CategoriesResolver,
      product: ProductResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
