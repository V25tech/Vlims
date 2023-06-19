import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "exp-dropdown-button",
  templateUrl: "./dropdown-button.component.html",
  styleUrls: ["./dropdown-button.component.scss"],
})
export class DropdownButtonComponent {

  @Input("data") data: Array<any> = [];
  @Input("disabled") disabled: boolean = false;
  @Input("selectedbutton") selectedbutton: string = "";
  @Input("imageurl") imageurl: string = "";
  @Input("valuefield") valuefield: string = "";
  @Input("textfield") textfield: string = "";

  @Output("valueChange") valueClick: EventEmitter<any> = new EventEmitter<any>();
  @Output("selectedbuttonChange") selectedbuttonChange: EventEmitter<any> = new EventEmitter<any>();

  //For tooltip property
  isDropup: boolean = false;
  ispopupopen: boolean = false;
  screenHeight: number = 0;
  browserHeight: number = 0;
  browserWidth: number = 0;
  screenWidth: number = 0;
  //Close the tooltip
  closedropdownBlock(e) {
    this.ispopupopen = false;
  }

  //Tooltip event
  toggleDropdown(e) {
    this.ispopupopen = !this.ispopupopen;
    //Browser Height
    this.browserHeight = window.innerHeight;
    //Screen Height
    this.screenHeight = e.screenY;
    //Browser Width
    this.browserWidth = window.innerWidth;
    //Screen Width
    this.screenWidth = e.screenX;
    e.preventDefault();
  }

  buttonClick(item) {
    this.closedropdownBlock(item);
    if (this.iscomplex) {
      this.selectedbutton = item[this.textfield];
    }
    else {
      this.selectedbutton = item.text;
    }
    this.selectedbuttonChange.emit(this.selectedbutton);
    this.valueClick.emit(item);
  }
  public get iscomplex(): boolean {
    return this.valuefield != "" && this.textfield != "";
  }
}
