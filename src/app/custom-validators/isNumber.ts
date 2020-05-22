import { AbstractControl, ValidationErrors } from '@angular/forms';

export function isValueNumber(
  control: AbstractControl
): ValidationErrors | null {
  return control.value.price === !isNaN(control.value.price)
    ? null
    : { isNumber: true };
}
