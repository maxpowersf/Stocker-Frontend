import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockTemplateComponent } from './templates/block-template/block-template.component';
import { TranslateHeaderPipe } from './pipes/translate-header.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatGridListModule, 
  MatTabsModule, 
  MatTableModule, 
  MatPaginatorModule, 
  MatSortModule, 
  MatCardModule, 
  MatButtonModule, 
  MatIconModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatDialogModule, 
  MatSliderModule, 
  MatRippleModule, 
  MatSelectModule, 
  MatChipsModule, 
  MatAutocompleteModule, 
  MatCheckboxModule, 
  MatSnackBarModule, 
  MatTooltipModule, 
  MatSidenavModule,
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  MatProgressBarModule, MatSlideToggleModule
} from '@angular/material';
import { BlockUIModule } from 'ng-block-ui';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { ListLayoutComponent } from './components/list-layout/list-layout.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    BlockTemplateComponent,
    TranslateHeaderPipe,
    FormLayoutComponent,
    ListLayoutComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSliderModule,
    MatRippleModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    })
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSliderModule,
    MatSelectModule,
    MatInputModule,
    MatRippleModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    BlockUIModule,
    FormLayoutComponent,
    ListLayoutComponent,
    TableComponent
  ],
  entryComponents: [
    BlockTemplateComponent
  ]
})
export class SharedModule { }
