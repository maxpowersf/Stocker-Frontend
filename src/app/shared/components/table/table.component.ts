import { Component, OnInit, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableLayout } from '../../models/table-layout.model';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  @Input() tableData: TableLayout;

  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  dataSource: GenericDataSource;
  columnsToDisplay: string[];

  ngAfterViewInit() {
    this.dataSource = new GenericDataSource(this.paginator, this.sort, this.tableData.data);

    this.cdRef.detectChanges();
  }

  ngOnChanges(changes) {
    if (changes.tableData.currentValue.headerRows) {
      this.columnsToDisplay = (this.tableData.canEdit || this.tableData.canRemove) ? [...this.tableData.headerRows, 'acciones'] : this.tableData.headerRows;
    }

    if (changes.tableData && !changes.tableData.firstChange && changes.tableData.currentValue.data) {
      this.dataSource = new GenericDataSource(this.paginator, this.sort, changes.tableData.currentValue.data);
      this.cdRef.detectChanges();
    }
  }

  openDialog = (id: number) => {
    this.tableData.functionRemove(id);
  }

  navigateToEdit = (id) => this.router.navigate([id, 'edit'], { relativeTo: this.route });

}

export class GenericDataSource extends DataSource<any> {

  constructor(private paginator: MatPaginator, private sort: MatSort, public data: any[]) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<any[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: any[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: any[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {

      const isAsc = this.sort.direction === 'asc';
      return compare(a[this.sort.active], b[this.sort.active], isAsc);
      // switch (this.sort.active) {
      //   case 'name': return compare(a.name, b.name, isAsc);
      //   case 'id': return compare(+a.id, +b.id, isAsc);
      //   default: return 0;
      // }
    });
  }
}
/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}