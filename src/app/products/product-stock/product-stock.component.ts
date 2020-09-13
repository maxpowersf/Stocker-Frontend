import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsArray } from '../models/productsArray.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css']
})
export class ProductStockComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'name', 'stock', 'actions'];

  stockForm: FormGroup;
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.products = this.route.snapshot.data.products;
   }

  ngOnInit() {
    
    this.stockForm = this.generateForm();
  }

  generateForm = (): FormGroup => {
    let productsListArray = [];
    this.products.forEach((product) => {
      productsListArray.push(this.productModelCreate(product.id, product.stock))
    });

    return this.stockModelCreate(productsListArray);
  }

  stockModelCreate = (productsArray: FormGroup[] = []) => {
    return this.fb.group({
      productsForm: this.fb.array(productsArray)
    });
  }

  productModelCreate = (productId: number, stock: number) => this.fb.group({
    id: [productId],
    newStock: [stock, Validators.required]
  });

  increase = (formElementIndex) => {
    const productsStock = this.stockForm.get('productsForm') as FormArray;
    let productElement = productsStock.controls[formElementIndex].get('newStock');
    productElement.patchValue(productElement.value + 1);
  }

  decrease = (formElementIndex) => {
    const productsStock = this.stockForm.get('productsForm') as FormArray;
    let productElement = productsStock.controls[formElementIndex].get('newStock');
    productElement.patchValue(productElement.value - 1);
  }

  saveAction = () => {
    if (!this.stockForm.valid) { 
      this.snackBar.open('Incomplete fields', '', { 
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });

      return; 
    }

    const products: ProductsArray = new ProductsArray();
    const productsStock = this.stockForm.get('productsForm') as FormArray;
    productsStock.controls.forEach((element) => {
      products.product.push(this.processProductsStock(element));
    });

    if(products.product.length > 0){
      this.productService.updateAll(products)
        .subscribe(() => {
          this.getProductsList();

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

  getProductsList = () => {
    this.productService.getAll().subscribe((res) => {
      this.products = res;
      this.stockForm = this.generateForm();
    });
  }

}
