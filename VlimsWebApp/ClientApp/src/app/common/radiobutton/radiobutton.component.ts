import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'radiobutton-list',
  templateUrl: './radiobutton.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: RadiobuttonlistComponent, multi: true },
  ]
})
export class RadiobuttonlistComponent implements ControlValueAccessor {
  private onChange: (value: any) => void;
  public onTouched: () => void;
  public disabled: boolean = false;
  public selectedvalue: string = ''

  @Input() data: any;
  @Input() name: string;
  @Input() orientation: string = 'horizontal';
  @Input() valuefield: string = '';
  @Input() textfield: string = '';
  @Input() help: string = '';
  @Input() hint: string = '';
  @Input("disabled") isDisabled: boolean = false;

  writeValue(data: any): void {
    this.selectedvalue = data;
  }
  registerOnChange(fn: any): void {
    if (typeof fn != 'undefined')
      this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    if (typeof fn != 'undefined')
      this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  change(obj: any) {
    if (typeof this.onChange != 'undefined')
      this.onChange(this.selectedvalue);
  }
  touched(obj: any) {
    if (typeof this.onTouched != 'undefined')
      this.onTouched();
  }
}
