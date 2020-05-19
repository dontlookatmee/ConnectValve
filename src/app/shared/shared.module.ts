import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceCardComponent } from './service-card/service-card.component';
import { InputComponent } from './input/input.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [ServiceCardComponent, InputComponent, FormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ServiceCardComponent, InputComponent, FormComponent],
})
export class SharedModule {}
