import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appSidebar]'
})
export class SidebarDirective {

  constructor(private eleref: ElementRef, private rend2: Renderer2) { }

  @Input() set appSidebar(val: boolean) {
    if (!val) {     
      this.rend2.addClass(this.eleref.nativeElement, 'toggled');
    }
    else
      this.rend2.removeClass(this.eleref.nativeElement, 'toggled');
  }

}
