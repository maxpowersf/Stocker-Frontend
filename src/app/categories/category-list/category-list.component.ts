import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { TableLayout } from 'src/app/shared/models/table-layout.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  headerRows = ['id', 'name'];

  data: Category[];
  tableData: TableLayout;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.data = this.route.snapshot.data.categories;
   }

  ngOnInit() {
    this.setTableData(this.data);
  }

  setTableData = (data: any) => {
    this.tableData = {
      title: 'Categories',
      canEdit: true,
      canRemove: true,
      data: data,
      functionRemove: this.onDelete,
      headerRows: this.headerRows
    }
  }

  onDelete = (id: number) => {
    this.categoryService.delete(id)
      .pipe(switchMap(this.updateDataTable))
      .subscribe(res => {
        this.data = res;
        this.setTableData(this.data);
        
        this.snackBar.open('Delete successful', '', { 
          panelClass: 'sb-success',
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      });
  }

  updateDataTable = () => this.categoryService.getAll();

}
