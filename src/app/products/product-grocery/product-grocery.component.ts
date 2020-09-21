import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ProductsArray } from '../models/productsArray.model';

@Component({
  selector: 'app-product-grocery',
  templateUrl: './product-grocery.component.html',
  styleUrls: ['./product-grocery.component.css']
})
export class ProductGroceryComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'name', 'stock', 'actions'];
  dataSource;

  groceriesForm: FormGroup;
  products: Product[];

  @ViewChild(MatPaginator, null) paginator: MatPaginator;

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

    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generateForm = (): FormGroup => {
    let productsListArray = [];
    this.products.forEach((product) => {
      productsListArray.push(this.productModelCreate(product.id, product.stock))
    });

    return this.groceriesModelCreate(productsListArray);
  }

  groceriesModelCreate = (productsArray: FormGroup[] = []) => {
    return this.fb.group({
      productsForm: this.fb.array(productsArray)
    });
  }

  productModelCreate = (productId: number, stock: number) => this.fb.group({
    id: [productId],
    stock: [stock],
    newStock: [0]
  });

  saveAction = () => {
    if (!this.groceriesForm.valid) {
      this.snackBar.open('Incomplete fields', '', { 
        panelClass: 'sb-warning',
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });

      return;
    }

    const products: ProductsArray = new ProductsArray();
    const productsStock = this.groceriesForm.get('productsForm') as FormArray;
    productsStock.controls.forEach((element, index) => {
      if (element.get('newStock').value > 0) {
        products.product.push(this.processProductsStock(element));
      }
    });

    if (products.product.length > 0) {
      this.productService.updateAll(products)
        .subscribe(() => {
          this.getGroceriesList();

          this.snackBar.open('Save successful', '', { 
            panelClass: 'sb-success',
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
    product.stock = productStock.get('stock').value + productStock.get('newStock').value;

    return product;
  }

  getGroceriesList = () => {
    this.productService.getGroceryList().subscribe((res) => {
      this.products = res;
      this.groceriesForm = this.generateForm();
    });
  }

}