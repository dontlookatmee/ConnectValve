import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OffersService } from 'src/app/services/offers/offers.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

interface Service {
  id: string;
  data: {
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    uid: string;
    name: string;
    avatar: string;
  };
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
  totalPrice: number;
  canMakeOffer: boolean = false;
  offerSent: boolean = false;

  userServiceSub: Subscription;
  userAuthSub: Subscription;

  constructor(
    private userService: UserServicesService,
    private offerService: OffersService,
    private authService: AuthService,
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
    this.userServiceSub = this.userService
      .getService(currentPathId)
      .subscribe((data: Service) => {
        this.service = data;
      });

    // Just making 100% sure that unregistered users cannot
    // make offers even tho we have guard
    // and cannot offer own services
    this.userAuthSub = this.authService.user$.subscribe((user) => {
      if (user && user.uid !== this.service?.data.uid) {
        this.canMakeOffer = true;
      } else {
        this.canMakeOffer = false;
      }
    });
  }

  handleOffer() {
    const toUser = this.service?.data.uid;
    const fromUser = this.authService.getUserId();
    const note = this.dealForm.get('note').value;
    const time = parseFloat(this.dealForm.get('time').value);
    const price = this.calculateDealPrice();
    const serviceId = this.service?.id;

    if (this.dealForm.valid) {
      const data = {
        collaborationCreated: false,
        fromUser: fromUser,
        toUser: toUser,
        note: note,
        price: price,
        time: time,
        service: serviceId,
        status: 'pending',
      };

      this.offerService.addOfferToDB(data).then((x) => {
        this.handleClosePopup(false);
        this.offerSent = true;
        setTimeout(() => {
          this.offerSent = false;
        }, 3000);
      });
    }
  }

  handleOfferPopup() {
    this.dealPopup = true;
  }

  handleClosePopup(value: boolean) {
    this.dealPopup = value;
    this.dealForm.reset();
  }

  calculateDealPrice() {
    const time = this.dealForm.get('time').value
      ? this.dealForm.get('time').value
      : 0;
    const price = this.service?.data.price ? this.service?.data.price : 0;

    if (!isNaN(time) && !isNaN(price)) {
      this.totalPrice = Number(time) * Number(price);
    }
    return this.totalPrice;
  }

  ngOnDestroy(): void {
    this.userServiceSub.unsubscribe();
    this.userAuthSub.unsubscribe();
  }
}
