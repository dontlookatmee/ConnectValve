import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';
import { ActivatedRoute } from '@angular/router';

interface Service {
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  user: string;
  name: string;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  service: Service;

  constructor(
    private userService: UserServicesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const currentPathId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getService(currentPathId).subscribe((data: Service) => {
      this.service = data;
    });
  }
}
