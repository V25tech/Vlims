import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "exp-nav-pills",
  templateUrl: "./nav-pills.component.html",
  styleUrls: ["./nav-pills.component.scss"],
})
export class NavPillsComponent {

  @Input("data") data: Array<any> = [];
  @Input("disabled") disabled: boolean = false;
  @Input("selectedbutton") selectedbutton: string = "";
  @Input("valuefield") valuefield: string = "";
  @Input("textfield") textfield: string = "";

  @Output("valueChange") valueClick: EventEmitter<any> = new EventEmitter<any>();
  @Output("selectedbuttonChange") selectedbuttonChange: EventEmitter<any> = new EventEmitter<any>();

  buttonClick(item) {
    if (this.iscomplex) {
      this.selectedbutton = item[this.textfield];
    } else {
      this.selectedbutton = item.text;
    }
    this.selectedbuttonChange.emit(this.selectedbutton);
    this.valueClick.emit(item);
  }
  public get iscomplex(): boolean {
    return this.valuefield != "" && this.textfield != "";
  }
}
