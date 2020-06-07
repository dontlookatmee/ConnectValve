import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() termEvent = new EventEmitter<string>();
  @Input('styles') styles: string;
  @Input('placeholder') placeholder: string = '';
  term: string;

  constructor() {}

  ngOnInit(): void {}

  handleTerm() {
    this.termEvent.emit(this.term);
  }
}
