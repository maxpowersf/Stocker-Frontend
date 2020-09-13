import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'photo', 'category', 'stock', 'minimumAccepted', 'minimumRequired', 'actions'];

  products: Product[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.products = this.route.snapshot.data.products;
   }

  ngOnInit() {
    
  }

  addAction = () => this.router.navigate(['new'], { relativeTo: this.route });
  
  navigateToEdit = (id) => this.router.navigate([id, 'edit'], { relativeTo: this.route });

  onDelete = (id) => this.productService.delete(id).subscribe(() => {
    this.getAllProducts();
    
    this.snackBar.open('Delete successful', '', { 
      panelClass: 'sb-success',
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  });

  getAllProducts = () => this.productService.getAll().subscribe((res) => this.products = res);
}
