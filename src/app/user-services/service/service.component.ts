import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  dealForm: FormGroup;
  dealPopup: boolean = false;

  constructor(
    private userService: UserServicesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Deal form
    this.dealForm = this.fb.group({
      note: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const currentPathId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getService(currentPathId).subscribe((data: Service) => {
      this.service = data;
    });
  }

  handleOffer() {
    this.dealPopup = true;
  }

  handleClosePopup(value: boolean) {
    this.dealPopup = value;
  }

  calculateDealPrice() {
    let result: number;

    const time = this.dealForm.get('time').value
      ? this.dealForm.get('time').value
      : 0;
    const price = this.service.price ? this.service.price : 0;

    if (!isNaN(time) && !isNaN(price)) {
      result = Number(time) * Number(price);
    }
    return result;
  }
}
