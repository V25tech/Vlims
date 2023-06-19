import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SwitchComponent, multi: true },
  ]
})
export class SwitchComponent implements ControlValueAccessor {
  public value: boolean = true;
  private onChange: (value: any) => void;
  public onTouched: () => void;

  public switchchange(e) {
    this.onChange(this.value);
    this.onTouched();
  }

  @Input() name: string = 'switch';
  @Input() selectedText: string = 'Yes';
  @Input() deselectedText: string = 'No';
  @Input() disabled: boolean = false;

  @Output("change") valueChange: EventEmitter<any> = new EventEmitter<any>();

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
