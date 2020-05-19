import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserServicesService {
  services = [
    {
      title: "AngularFire",
      description: "Do you want to learn more about AngularFire",
      imageUrl:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
    },
    {
      title: "AngularFire",
      description: "Do you want to learn more about AngularFire",
      imageUrl:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
    },
    {
      title: "AngularFire",
      description: "Do you want to learn more about AngularFire",
      imageUrl:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
    },
    {
      title: "AngularFire",
      description: "Do you want to learn more about AngularFire",
      imageUrl:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
    },
    {
      title: "AngularFire",
      description: "Do you want to learn more about AngularFire",
      imageUrl:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
    },
  ];
  constructor() {}

  getServices() {
    return of(this.services);
  }
}
