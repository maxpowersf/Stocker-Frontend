import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsArray } from '../models/productsArray.model';
import { ProductService } from '../services/product.service';

declare var $: any;

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css']
})
export class ProductStockComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'name', 'stock', 'actions'];
  dataSource;

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

    this.dataSource = new MatTableDataSource(this.products);
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
        panelClass: 'sb-warning',
        duration: 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });

      return;
    }

    const products: ProductsArray = new ProductsArray();
    const productsStock = this.stockForm.get('productsForm') as FormArray;
    productsStock.controls.forEach((element) => {
      products.product.push(this.processProductsStock(element));
    });

    if (products.product.length > 0) {
      this.productService.updateAll(products)
        .subscribe(() => {
          this.getProductsList();

          this.snackBar.open('Save successful', '', {
            panelClass: 'sb-success',
            duration: 1000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
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

  applyFilter = (event: Event) => {
    let tableRows, txtValue;

    const filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    tableRows = $('table.mat-table tbody tr');

    for (let i = 0; i < tableRows.length; i++) {
      txtValue = tableRows.eq(i).find('td:eq(1)').text().trim().toLowerCase();
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
        tableRows.eq(i).show();
      }
      else {
        tableRows.eq(i).hide();
      }
    }
  }

}
