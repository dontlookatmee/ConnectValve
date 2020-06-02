import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @HostBinding('style.margin')
  margin: string = '0 auto';

  @Input('name') name: string;
  @Input('avatar') avatar: string;
  @Input('desc') description: string;
  @Input('status') status: string;
  @Input('userId') userId: string;

  constructor() {}

  ngOnInit(): void {}
}
