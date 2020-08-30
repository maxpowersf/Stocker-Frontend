import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { TableLayout } from 'src/app/shared/models/table-layout.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { switchMap } from 'rxjs/operators';

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
    private productService: ProductService
  ) {
    this.products = this.route.snapshot.data.products;
   }

  ngOnInit() {
    
  }

  addAction = () => this.router.navigate(['new'], { relativeTo: this.route });
  
  navigateToEdit = (id) => this.router.navigate([id, 'edit'], { relativeTo: this.route });

  onDelete = (id) => this.productService.delete(id).subscribe(this.getAllProducts);

  getAllProducts = () => this.productService.getAll().subscribe((res) => this.products = res);
}
