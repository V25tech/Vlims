import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableRightClick]'
})
export class DisableRightClickDirective {

  constructor() { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Check if Ctrl+P is pressed
    if (event.ctrlKey && event.key === 'p') {
      event.preventDefault(); // Prevent default action (print dialog)
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  handleRightClickEvent(event: MouseEvent) {
    event.preventDefault(); // Prevent default right-click action
  }
}
