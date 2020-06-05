import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-my-service',
  templateUrl: './my-service.component.html',
  styleUrls: ['./my-service.component.css'],
})
export class MyServiceComponent implements OnInit {
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('image') image: string;
  @Input('category') category: string;
  @Input('price') price: string;
  @Input('id') id: string;

  editForm: FormGroup;
  editMode: boolean = false;
  service: ServicesMeta;

  userServiceSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private userServices: UserServicesService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      category: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(35)]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(350),
        ],
      ],
      image: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
          ),
        ],
      ],
      price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });

    this.userServiceSub = this.userServices
      .getService(this.id)
      .subscribe((service: ServicesMeta) => {
        this.editForm.patchValue({
          category: service.data.category,
          title: service.data.title,
          description: service.data.description,
          image: service.data.image,
          price: service.data.price,
        });
      });
  }

  handleServiceEdit() {
    if (this.editForm.valid) {
      const data = {
        category: this.editForm.get('category').value,
        title: this.editForm.get('title').value,
        description: this.editForm.get('description').value,
        image: this.editForm.get('image').value,
        price: this.editForm.get('price').value,
      };
      this.userServices.updateService(this.id, data);
    }
  }

  handleDeleteService() {
    const con = confirm('Are you sure you want to the delete the service ?');

    if (con) {
      this.userServices.deleteService(this.id);
    }
  }

  handleCancelEdit() {
    this.editMode = false;
  }

  handleEdit() {
    this.editMode = true;
  }

  ngOnDestroy(): void {
    this.userServiceSub.unsubscribe();
  }
}
