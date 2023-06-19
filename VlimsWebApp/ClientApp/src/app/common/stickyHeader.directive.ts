import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[stickyNavigationArea]'
})
export class StickyNavigationDirective {
    @HostBinding('class.sticky1') issticky:boolean = false;
    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        var scroll = window.pageYOffset;
        this.issticky = scroll >= 10;
    }
}