import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormLayout } from 'src/app/shared/models/form-layout.model';
import { Category } from '../models/category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  formInfo: FormLayout;

  isEditing: boolean;
  category: Category = new Category();

  get name() { return this.categoryForm.get('name'); }

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoryForm = this.modelCreate();

    this.isEditing = this.route.snapshot.url.toString().includes('edit');

    if (this.isEditing) {
      this.formInfo = {
        submitText: 'Update',
        title: 'Category',
        subtitle: 'Edit category',
        isEditing: true
      }

      this.category = this.route.snapshot.data.category;
      this.name.patchValue(this.category.name);
    }
    else {
      this.formInfo = {
        submitText: 'Save',
        title: 'Category',
        subtitle: 'Create category',
        isEditing: false
      }
    }
  }

  modelCreate = () => this.fb.group({
    name: ['', Validators.required]
  })

  onSubmit = () => {
    if (!this.categoryForm.valid) return;
    const categoryModified = new Category();
    categoryModified.id = this.category.id;
    categoryModified.name = this.name.value;

    this.isEditing
      ? this.categoryService.update(categoryModified)
        .subscribe(this.goToList)
      : this.categoryService.add(categoryModified)
        .subscribe(this.goToList);
  }

  goToList = () => this.router.navigate(['categories']);
}
