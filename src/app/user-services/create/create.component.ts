import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isValueNumber } from '../../custom-validators/isNumber';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  feedback: { visible?: boolean; status?: string; msg?: string };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userServices: UserServicesService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      category: ['', [Validators.required]],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
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
  }

  handleServiceCreate() {
    const uid = this.authService.getUserId();
    const category = this.createForm.get('category').value;
    const title = this.createForm.get('title').value;
    const description = this.createForm.get('description').value;
    const image = this.createForm.get('image').value;
    const price = parseFloat(this.createForm.get('price').value);

    this.authService.user$.pipe(take(1)).subscribe((user) => {
      const data = {
        category,
        title,
        description,
        image,
        price,
        uid,
        name: user.name,
      };

      this.userServices
        .createService(data)
        // I may store user service in DB profile service array
        // .then((x) => {
        //   this.userServices.addServiceToUserDbProfile(data);
        // })
        .then((x) => {
          this.feedback = this.showPopupMsg(
            true,
            'success',
            'Service created successful!'
          );
          setTimeout(() => {
            this.feedback = this.showPopupMsg(false);
          }, 2500);

          this.createForm.reset();
        })
        .catch((err) => {
          console.log(err);
          this.feedback = this.showPopupMsg(
            true,
            'error',
            'Something went wrong! Please try again.'
          );
          setTimeout(() => {
            this.feedback = this.showPopupMsg(false);
          }, 3000);
        });
    });
  }

  handleCancelCreate() {
    this.createForm.reset();
  }

  showPopupMsg(visible: boolean, status?: string, msg?: string): {} {
    const data = {
      visible,
      status,
      msg,
    };

    return data;
  }
}
