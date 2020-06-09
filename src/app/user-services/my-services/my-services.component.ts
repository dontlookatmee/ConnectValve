import { Component, OnInit, HostListener } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';
import { Subscription } from 'rxjs';

interface ServicesMeta {
  id: string;
  data: {
    category: string;
    description: string;
    image: string;
    name: string;
    price: number;
    title: string;
    uid: string;
  };
}
@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css'],
})
export class MyServicesComponent implements OnInit {
  myServices: ServicesMeta[];
  isDataLoaded: boolean = false;

  myServicesSub: Subscription;

  constructor(private userServices: UserServicesService) {}

  ngOnInit(): void {
    this.myServicesSub = this.userServices
      .getMyServices()
      .subscribe((services: ServicesMeta[]) => {
        this.myServices = services;
        this.isDataLoaded = true;
      });
  }

  ngOnDestroy() {
    this.myServicesSub.unsubscribe();
  }
}
