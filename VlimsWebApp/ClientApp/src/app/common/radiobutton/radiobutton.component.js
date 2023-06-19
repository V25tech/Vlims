//import { Component, Input } from '@angular/core';
//import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
//@Component({
//  selector: 'radiobutton-list',
//  templateUrl: './radiobutton.component.html',
//  providers: [
//    { provide: NG_VALUE_ACCESSOR, useExisting: RadiobuttonlistComponent, multi: true },
//  ]
//})
//export class RadiobuttonlistComponent implements ControlValueAccessor {
//  private onChange: (value: any) => void;
//  public onTouched: () => void;
//  public disabled: boolean = false;
//  public selectedvalue: string = ''
//  @Input() data: any;
//  @Input() name: string;
//  @Input() orientation: string = 'horizontal';
//  @Input() valuefield: string = '';
//  @Input() textfield: string = ''
//  writeValue(data: any): void {
//    this.selectedvalue = data;
//  }
//  registerOnChange(fn: any): void {
//    this.onChange = fn;
//  }
//  registerOnTouched(fn: any): void {
//    this.onTouched = fn;
//  }
//  setDisabledState?(isDisabled: boolean): void {
//    this.disabled = isDisabled;
//  }  
//  change(obj:any) {
//    this.onChange(this.selectedvalue);
//  }
//}
//# sourceMappingURL=radiobutton.component.js.map