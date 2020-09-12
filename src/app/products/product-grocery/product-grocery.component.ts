import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ProductsArray } from '../models/productsArray.model';

@Component({
  selector: 'app-product-grocery',
  templateUrl: './product-grocery.component.html',
  styleUrls: ['./product-grocery.component.css']
})
export class ProductGroceryComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'name', 'stock', 'actions'];

  groceriesForm: FormGroup;
  products: Product[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.products = this.route.snapshot.data.products;
  }

  ngOnInit() {
    this.groceriesForm = this.generateForm();
    this.groceriesForm.get('productsForm').valueChanges.subscribe(productsForm => { console.log('productsForm', productsForm) });
  }

  generateForm = (): FormGroup => {
    let productsListArray = [];
    this.products.forEach((product) => {
      productsListArray.push(this.productModelCreate(product.id))
    });

    return this.groceriesModelCreate(productsListArray);
  }

  groceriesModelCreate = (productsArray: FormGroup[] = []) => {
    return this.fb.group({
      productsForm: this.fb.array(productsArray)
    });
  }

  productModelCreate = (productId: number) => this.fb.group({
    id: [productId],
    newStock: [0]
  });

  saveAction = () => {
    /*this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 1000,
    });*/

    if (!this.groceriesForm.valid) { 
      this.snackBar.open('Incomplete fields', '', { 
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });

      return; 
    }

    const products: ProductsArray = new ProductsArray();
    const productsStock = this.groceriesForm.get('productsForm') as FormArray;
    productsStock.controls.forEach((element, index) => {
      if(element.get('newStock').value > 0) {
        products.product.push(this.processProductsStock(element));
      }
    });

    if(products.product.length > 0){
    this.productService.updateAll(products)
      .subscribe(() => {
        this.getGroceriesList();
        this.groceriesForm = this.generateForm();

        this.snackBar.open('Save successful', '', { 
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      });
    }
  }

  processProductsStock = (productStock: AbstractControl) => {
    let product: Product = new Product();
    product.id = productStock.get('id').value;
    product.stock = productStock.get('newStock').value;

    return product;
  }

  getGroceriesList = () => this.productService.getGroceryList().subscribe((res) => this.products = res);

}

/*@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}*/