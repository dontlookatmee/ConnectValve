import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-service',
  templateUrl: './my-service.component.html',
  styleUrls: ['./my-service.component.css'],
})
export class MyServiceComponent implements OnInit {
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('image') image: string;
  @Input('category') category: string;
  @Input('id') id: string;

  constructor() {}

  ngOnInit(): void {}
}
