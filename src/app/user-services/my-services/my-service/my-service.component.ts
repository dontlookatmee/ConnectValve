import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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
  }

  handleServiceEdit() {}

  handleCancelEdit() {
    this.editForm.reset();
    this.editMode = false;
  }

  handleEdit() {
    this.editMode = true;
  }
}
