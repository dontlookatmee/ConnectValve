import { Component, OnInit } from "@angular/core";
import { UserServicesService } from "../user-services.service";

interface Services {
  title: string;
  description: string;
  imageUrl: string;
}
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  services: Services[];

  constructor(private uServices: UserServicesService) {}

  ngOnInit(): void {
    this.uServices.getServices().subscribe((services) => {
      this.services = services;
    });
  }
}
