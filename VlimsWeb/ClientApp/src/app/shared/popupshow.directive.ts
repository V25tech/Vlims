import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[popupshow]'
})
export class PopupshowDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @Input() set popupshow(val: boolean) {
    if (val === true) {
      this.renderer.addClass(this.elRef.nativeElement, 'show');
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'block');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'show');
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
    }
  }
}



