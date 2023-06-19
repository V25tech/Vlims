import { Component, Input, Output, EventEmitter, OnDestroy, SimpleChange, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'exp-offcanvasmenu',
  templateUrl: './offcanvasmenu.component.html',
})

export class OffcanvasmenuComponent implements OnDestroy {
  wrapper: any;
  overlay: any;
  unit: string = "%";
  modeType = MenumodeEnum;
  buttonPosition: string = "fixed";
  @Input('width') width: any = 40;
  @Input('src') imgsrc: any = "assets/img/colab-icon.svg";
  @Input('cssclass') class: string = "lefttoright";
  @Input('showopencollapsebuttons') showDefaultButton: boolean = true;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output('open') onopen = new EventEmitter();
  @Output('close') onclose = new EventEmitter();
  @Input('menutype') menutype: MenumodeEnum = MenumodeEnum.OFFCANVAS;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    var scroll = window.pageYOffset;
    if (scroll >= 10) {
      this.buttonPosition = "absolute";
    } else {
      this.buttonPosition = "fixed";
    }
  }
  ngAfterViewInit() {
    if (this.menutype == this.modeType.PUSHMENU) {
      this.wrapper = document.getElementById("vm-wrapper");
      this.overlay = document.getElementById("vm-overlay");
    }
  }


  //push menu code start

  toggleMenu(event) {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
    this.visible ? this.onopen.emit(event) : this.onclose.emit(event);
    this.toggleClass();
  }

  toggleClass() {
    (this.visible) ? this.addPushMenuClasses() : this.removeClasses();
    this.updateBodyClass();
  }

  addPushMenuClasses() {
    this.wrapper.classList.add("vm-primary-nav-toggled");
    this.wrapper.style["padding-left"] = this.width + this.unit;
    this.overlay.style.left = this.width + this.unit;
    this.overlay.classList.add("is-open");
    this.overlay.classList.remove("is-closed");
  }


  //push menu code end

  //off canvas code started

  public opencollapse(event, value: boolean) {
    this.visible = value;
    this.visibleChange.emit(this.visible);
    value ? this.onopen.emit(event) : this.onclose.emit(event);
    this.updateBodyClass();
    //on closing the menu, we are checking that either the mode is both(isHybridBehaviour) or not
    //let item: any = window.document.getElementsByClassName('expoffcanvas');
    //item[0].style.position = value ? "fixed" : ""; we need to write for array of items due to we will have in spa and screen
  }
  updateBodyClass() {
    const body = document.getElementsByTagName('body')[0];
    if (this.visible) {
      body.classList.add('vm-content-fixed');
    }
    else {
      this.removeClasses()
    }
  }


  //end of off canvas

  removeClasses() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('vm-content-fixed');
    if (this.menutype == this.modeType.PUSHMENU) {
      this.wrapper.classList.remove("vm-primary-nav-toggled");
      this.wrapper.style["padding-left"] = "0" + this.unit;
      this.overlay.style.left = "0" + this.unit;
      this.overlay.classList.remove("is-open");
      this.overlay.classList.add("is-closed");
    }
  }

  ngOnChanges(changes: SimpleChange) {
    if (typeof changes["visible"] != "undefined") {
      var change = changes["visible"];
      if (!change.isFirstChange()) {
        if (this.menutype == this.modeType.OFFCANVAS)
          this.updateBodyClass();
        if (this.menutype == this.modeType.PUSHMENU)
          this.toggleClass();
      }
    }
  }
  ngOnDestroy(): void {
    this.removeClasses();
  }
}
export enum MenumodeEnum {
  OFFCANVAS = "overlaymenu",
  PUSHMENU = "pushmenu",
}
