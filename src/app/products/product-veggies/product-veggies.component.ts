import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryType } from 'src/app/shared/models/categorytype.enum';
import { Product } from '../models/product.model';
import { ProductsArray } from '../models/productsArray.model';
import { ProductService } from '../services/product.service';

declare var $: any;

@Component({
  selector: 'app-product-veggies',
  templateUrl: './product-veggies.component.html',
  styleUrls: ['./product-veggies.component.css']
})
export class ProductVeggiesComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'name', 'stock', 'actions'];
  dataSource;

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

    this.dataSource = new MatTableDataSource(this.products);
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
        duration: 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
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
    product.stock = productStock.get('stock').value + productStock.get('newStock').value;

    return product;
  }

  getGroceriesList = () => {
    this.productService.getGroceryList(CategoryType.Veggies).subscribe((res) => {
      this.products = res;
      this.groceriesForm = this.generateForm();

      this.dataSource.data = res;
    });
  }

}
