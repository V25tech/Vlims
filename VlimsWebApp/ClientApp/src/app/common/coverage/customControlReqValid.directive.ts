import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[customControlValidatorDirective]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomControlValidatorDirective,
      multi: true
    }
  ]
})
export class CustomControlValidatorDirective implements Validator {
  isFormExplicitTouched: Boolean = false;
  validate(customControl: FormControl): { [key: string]: any } {
    if (customControl.value != null && customControl.value.formInCustomControl != undefined) {
      if (customControl.touched && !this.isFormExplicitTouched) {
        customControl.value.formInCustomControl.form.markAllAsTouched();
        customControl.value.coverages.forEach((coverage: any) => {
          if (coverage.IsSelected) {
            coverage.IsExpanded = true;
          }
        });
        this.isFormExplicitTouched = true;
      }
      if (customControl.value.formInCustomControl.invalid) {
        return { err: "not valid" }
      }
      else if (customControl.value.isDtxInvalidPresent) {
        return { err: "Dtx Invalid feilds are Present" }
      } else {
        return null;
      }

    } else {
      return { err: "required" };
    }
  }
}

