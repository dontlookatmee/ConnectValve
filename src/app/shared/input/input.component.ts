import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input('control') control: FormControl;
  @Input('type') type?: string = 'text';
  @Input('name') name?: string;
  @Input('placeholder') placeholder?: string;
  constructor() {}

  ngOnInit(): void {}
}
