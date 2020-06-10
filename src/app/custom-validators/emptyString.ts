import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emptyString(control: AbstractControl): ValidationErrors | null {
  return control.value.trim() !== '' ? null : { emptyString: true };
}
