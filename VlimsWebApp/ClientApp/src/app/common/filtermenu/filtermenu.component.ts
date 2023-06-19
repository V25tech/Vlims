import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "exp-filtermenu",
  templateUrl: './filtermenu.component.html',
  styleUrls: ["./filtermenu.component.scss"]
})
export class FiltermenuComponent {
  value: string = "All";
  addvalue(value, text) {
    this.value = text;
    this.change.emit(value);
  }
  @Input("source") items = [];
  @Output("itemClick") change: EventEmitter<any> = new EventEmitter<any>();
}
