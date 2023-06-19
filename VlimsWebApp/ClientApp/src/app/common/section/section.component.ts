import { Component, Input } from '@angular/core';

@Component({
  selector: 'exp-section',
  templateUrl: './section.component.html'
})
export class SectionComponent {
  @Input("name") name: string;
  @Input("isexpandable") isexpandable: boolean = false;
  @Input("hinttext") hinttext: string = '';
  @Input("isbeside") isbeside: boolean = false;
  constructor() { }

  public isexpanded: boolean = true;
  public get isHeader(): boolean {
    return this.name != "";
  }
  public expand() {
    if (this.isexpandable)
      this.isexpanded = !this.isexpanded
  }
}
