import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @HostBinding('style.margin')
  margin: string = '0 auto';
  constructor() {}

  ngOnInit(): void {}
}
