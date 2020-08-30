import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, NavComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule
  ],
  exports: [
    NavComponent,
    HomeComponent
  ]
})
export class CoreModule { }
