import { Component, OnInit } from "@angular/core";
import { UserServicesService } from "src/app/services/user-services.service";

interface Service {
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  user: string;
}
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  allServices: Service[];

  constructor(private uServices: UserServicesService) {}

  ngOnInit(): void {
    this.uServices.getServices().subscribe((services: Service[]) => {
      this.allServices = services;
    });
  }
}
