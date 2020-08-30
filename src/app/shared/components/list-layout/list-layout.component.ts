import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.css']
})
export class ListLayoutComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() canAdd: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addAction = () => this.router.navigate(['new'], {relativeTo: this.route})
}
