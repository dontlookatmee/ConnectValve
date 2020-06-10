import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appEmptyStringValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmptyStringValidatorDirective,
      multi: true,
    },
  ],
})
export class EmptyStringValidatorDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value.trim() !== ''
      ? null
      : { appEmptyStringValidator: true };
  }
}
