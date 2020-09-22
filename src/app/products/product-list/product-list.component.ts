import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatPaginator, MatSlideToggleChange, MatSnackBar, MatTableDataSource } from '@angular/material';

declare var $:any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'photo', 'name', 'category', 'stock', 'minimumAccepted', 'minimumRequired', 'actions'];
  dataSource;

  products: Product[];

  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.products = this.route.snapshot.data.products;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    $('.mat-slide-toggle-bar').addClass('m-auto');
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addAction = () => this.router.navigate(['new'], { relativeTo: this.route });

  navigateToEdit = (id) => this.router.navigate([id, 'edit'], { relativeTo: this.route });

  onChange = (event: MatSlideToggleChange, id) => {
    this.productService.getOne(id).subscribe((res) => {
      const productModified = res;
      productModified.active = event.checked;

      this.productService.update(productModified).subscribe(this.getAllProducts);
    });
  }

  onDelete = (id) => this.productService.delete(id).subscribe(() => {
    this.getAllProducts();

    this.snackBar.open('Delete successful', '', {
      panelClass: 'sb-success',
      duration: 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  });

  getAllProducts = () => this.productService.getAll().subscribe((res) => this.products = res);
}
