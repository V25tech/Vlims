import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutSideDirective {
  constructor(private _elementRef: ElementRef) { }
  @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();
  isValidate: boolean = false;
  @HostListener('document:click', ['$event.target']) onClickoutside(targetElement) {
    if (!this._elementRef.nativeElement.contains(targetElement)) {
      this.clickOutside.emit(this.isValidate);
    }
  }
}
