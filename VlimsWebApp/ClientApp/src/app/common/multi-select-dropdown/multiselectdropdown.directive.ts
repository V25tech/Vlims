import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS, FormControl, Validator } from "@angular/forms";

@Directive({
  selector: "[MultiselectdropdownDirective]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MultiselectdropdownDirective,
      multi: true
    }
  ]
})
export class MultiselectdropdownDirective implements Validator {
  @Input('isRequired') isRequired: any;
  validate(customControl: FormControl): { [key: string]: any } {
    if ((customControl.value && customControl.value.length > 0) || !customControl.touched) return null;
    else if (customControl.touched && this.isRequired) {
      return { required: true };
    }
  }
}
