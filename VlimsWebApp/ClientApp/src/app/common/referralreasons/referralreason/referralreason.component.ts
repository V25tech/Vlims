import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { ReferralReason } from "./referralreason";
import { NgModelGroup } from "@angular/forms";
import { UtilityService } from "src/app/utility.service";

@Component({
  selector: "exp-referralreason",
  templateUrl: "./referralreason.component.html"
})
export class ReferralreasonComponent {
  @Input("reason") reason: ReferralReason;
  @Input("enable") enable: boolean = true;
  @Output("refreasonupdate") change: EventEmitter<ReferralReason> = new EventEmitter();
  @ViewChild("refReason", null) public refReason: NgModelGroup;
  constructor(private us: UtilityService) { }
  save(status: string) {
    try {
      if (this.refReason.valid) {
        this.reason.Status = status;
        this.change.emit(this.reason);
      } else {
        this.refReason.control.markAllAsTouched();
      }
    } catch (ex) {
      this.us.Show(ex.message, "error");
    }
  }
}
