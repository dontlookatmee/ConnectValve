import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-small-popup',
  templateUrl: './small-popup.component.html',
  styleUrls: ['./small-popup.component.css'],
})
export class SmallPopupComponent implements OnInit {
  @Input('message') message: string;
  @Input('type') type: string;

  constructor() {}

  ngOnInit(): void {}
}
