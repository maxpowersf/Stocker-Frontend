import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CategoryType } from 'src/app/shared/models/categorytype.enum';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @Input() loading: boolean;

  supermarketId: number = CategoryType.Supermarket;
  veggiesId: number = CategoryType.Veggies;
  spicesId: number = CategoryType.Spices;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => !result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }
}
