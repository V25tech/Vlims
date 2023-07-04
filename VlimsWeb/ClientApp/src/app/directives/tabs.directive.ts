import { Directive, Renderer2, ElementRef, Input } from '@angular/core';

import { Router } from "@angular/router";


@Directive({
  selector: '[stab]'
})
export class TabsDirective {

  constructor(private eleref: ElementRef, private rend2: Renderer2, private router: Router) { }

  @Input() set stab(val: string) {
    let ctab = this.router.url.split('/').pop()
    if (val = ctab) {
      this.rend2.addClass(this.eleref.nativeElement, 'active');
    }
  }

}
