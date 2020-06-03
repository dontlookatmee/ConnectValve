import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-service-card',
  templateUrl: './profile-service-card.component.html',
  styleUrls: ['./profile-service-card.component.css'],
})
export class ProfileServiceCardComponent implements OnInit {
  @Input('image') image: string;
  @Input('price') price: number;
  @Input('title') title: string;
  @Input('category') category: string;
  @Input('description') description: string;
  @Input('id') id: string;

  constructor() {}

  ngOnInit(): void {}
}
