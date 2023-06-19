import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[expandMenu]'
})
export class ExpmentDirective {
  constructor(private eRef: ElementRef) { }
  @HostBinding('class.filterdropdown') isOpen = false;
  @HostListener('click') toggleOpen($event) {
    this.isOpen = !this.isOpen;
  }
  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
