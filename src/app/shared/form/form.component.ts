import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input('form') groupForm: FormGroup;
  @Input('headText') headText: string;
  @Input('paragraphText') pText: string;

  constructor() {}

  ngOnInit(): void {}
}
