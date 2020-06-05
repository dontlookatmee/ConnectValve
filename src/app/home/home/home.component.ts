import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../services/user-services/user-services.service';
import { Subscription } from 'rxjs';

interface Service {
  id: string;
  data: {
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
    user: string;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allServices: Service[];
  servicesSub: Subscription;

  constructor(private uServices: UserServicesService) {}

  ngOnInit(): void {
    this.servicesSub = this.uServices
      .getServices()
      .subscribe((services: Service[]) => {
        this.allServices = services;
      });
  }

  ngOnDestroy(): void {
    this.servicesSub.unsubscribe();
  }
}
