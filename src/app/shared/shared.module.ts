import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ServiceCardComponent } from "./service-card/service-card.component";
import { InputComponent } from "./input/input.component";

@NgModule({
  declarations: [ServiceCardComponent, InputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ServiceCardComponent, InputComponent],
})
export class SharedModule {}
