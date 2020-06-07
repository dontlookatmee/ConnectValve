import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ServiceCardComponent } from './service-card/service-card.component';
import { InputComponent } from './input/input.component';
import { FormComponent } from './form/form.component';
import { PopupComponent } from './popup/popup.component';
import { RouterModule } from '@angular/router';
import { SmallPopupComponent } from './small-popup/small-popup.component';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ServiceCardComponent,
    InputComponent,
    FormComponent,
    PopupComponent,
    SmallPopupComponent,
    OfferCardComponent,
    SearchComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  exports: [
    ServiceCardComponent,
    InputComponent,
    FormComponent,
    PopupComponent,
    SmallPopupComponent,
    OfferCardComponent,
    SearchComponent,
  ],
})
export class SharedModule {}
