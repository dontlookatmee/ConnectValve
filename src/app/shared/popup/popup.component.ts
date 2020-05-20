import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  @Output() closePopup: EventEmitter<any> = new EventEmitter();
  @Input('message') message: string;

  constructor() {}

  ngOnInit(): void {}

  handleClosePopup() {
    this.closePopup.emit(false);
  }
}
