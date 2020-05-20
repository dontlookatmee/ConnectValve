import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceCardComponent } from './service-card/service-card.component';
import { InputComponent } from './input/input.component';
import { FormComponent } from './form/form.component';
import { PopupComponent } from './popup/popup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ServiceCardComponent,
    InputComponent,
    FormComponent,
    PopupComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    ServiceCardComponent,
    InputComponent,
    FormComponent,
    PopupComponent,
  ],
})
export class SharedModule {}
