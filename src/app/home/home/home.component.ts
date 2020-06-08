import { Component, OnInit, HostListener } from '@angular/core';
import { UserServicesService } from '../../services/user-services/user-services.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile/profile.service';

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
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event) {
    this.profileService.updateUserProfile({ status: 'offline' });
  }

  allServices: Service[];
  servicesSub: Subscription;

  constructor(
    private uServices: UserServicesService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.servicesSub = this.uServices
      .getServices()
      .subscribe((services: Service[]) => {
        this.allServices = services.sort((a: Service, b: Service) =>
          a.data.title.localeCompare(b.data.title)
        );
      });
  }

  handleSearch(term: string) {
    this.servicesSub = this.uServices
      .getServices()
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((services: Service[]) => {
        this.allServices = services
          .filter((service: Service) => {
            return service.data?.title
              .toLowerCase()
              .includes(term.toLowerCase());
          })
          .sort((a: Service, b: Service) =>
            a.data.title.localeCompare(b.data.title)
          );
      });
  }

  ngOnDestroy(): void {
    this.servicesSub.unsubscribe();
  }
}
