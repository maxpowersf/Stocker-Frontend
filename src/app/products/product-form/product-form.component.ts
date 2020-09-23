import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Category } from 'src/app/categories/models/category.model';
import { ProductTypeMapping } from 'src/app/shared/models/producttype';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;

  isEditing: boolean = false;
  product: Product = new Product();

  categories: Category[];
  productTypes = ProductTypeMapping;

  photoUrl: string = "https://static.cotodigital3.com.ar/sitios/fotos/medium/99999900/99999999.jpg";

  get name() { return this.productForm.get('name'); }
  get photo() { return this.productForm.get('photo'); }
  get type() { return this.productForm.get('type') };
  get category() { return this.productForm.get('category'); }
  get stock() { return this.productForm.get('stock'); }
  get minimumAccepted() { return this.productForm.get('minimumAccepted'); }
  get minimumRequired() { return this.productForm.get('minimumRequired'); }
  get active() { return this.productForm.get('active'); }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productForm = this.modelCreate();

    this.categories = this.route.snapshot.data.categories;

    this.isEditing = this.route.snapshot.url.toString().includes('edit');

    if (this.isEditing) {
      this.product = this.route.snapshot.data.product;
      this.name.patchValue(this.product.name);
      this.photo.patchValue(this.product.photo);
      this.photoUrl = this.product.photo;
      this.type.patchValue(this.product.type);
      this.category.patchValue(this.product.category.id);
      this.stock.patchValue(this.product.stock);
      this.minimumAccepted.patchValue(this.product.minimumAccepted);
      this.minimumRequired.patchValue(this.product.minimumRequired);
      this.active.patchValue(this.product.active);
    }
  }

  fillPhoto = (event) => {
    this.photoUrl = event.target.value;
  }

  goToList = () => this.isEditing
    ? this.router.navigate(['../../'], { relativeTo: this.route })
    : this.router.navigate(['../'], { relativeTo: this.route })

  modelCreate = () => this.fb.group({
    name: ['', Validators.required],
    photo: ['https://static.cotodigital3.com.ar/sitios/fotos/medium/99999900/99999999.jpg'],
    type: ['', Validators.required],
    category: ['', Validators.required],
    stock: ['0.0', Validators.required],
    minimumAccepted: ['0.0', Validators.required],
    minimumRequired: ['0.0', Validators.required],
    active: [true]
  });

  onSubmit = () => {
    if (!this.productForm.valid) { return; }
    const productModified = new Product();
    productModified.id = this.product.id;
    productModified.name = this.name.value;
    productModified.photo = this.photo.value;
    productModified.type = this.type.value;
    productModified.categoryId = this.category.value;
    productModified.stock = this.stock.value;
    productModified.minimumAccepted = this.minimumAccepted.value;
    productModified.minimumRequired = this.minimumRequired.value;
    productModified.active = this.active.value;

    this.isEditing
      ? this.productService.update(productModified)
        .subscribe(this.goToList)
      : this.productService.add(productModified)
        .subscribe(this.goToList);
  }
}
