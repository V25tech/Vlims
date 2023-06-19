import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild, forwardRef
} from "@angular/core";
import {
  ReferralReasonConfig,
  ReferralReasonUrl
} from "./referralreasonconfig";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilityService } from "src/app/utility.service";
import { Subscription } from "rxjs";
import { ReferralReason } from './referralreason/referralreason';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: "exp-referralreasons",
  templateUrl: "./referralreasons.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReferralreasonsComponent),
      multi: true,
    },
  ],
})
export class ReferralreasonsComponent implements OnInit, ControlValueAccessor {
  @Input("refconfig") config: ReferralReasonConfig;
  @Input("refurl") refurl: ReferralReasonUrl;
  @Input() data: Array<ReferralReason> = [];
  @Input() enable: boolean = true;
  private subscription: Subscription = new Subscription();
  @Input("prodTextField") textField: string = "";
  ProductName: string = "All";
  products: any = [];
  _reasons: Array<ReferralReason> = [];
  constructor(public http: HttpClient, private us: UtilityService) { }

  cbValue: boolean = false;
  @Input("elementRef") control: NgControl;
  onChange: any = () => { };
  onTouched: any = () => { };
  changeAndTouch() {
    this.cbValue = true;
    this.onChange(this.cbValue);
    this.onTouched();
  }
  reset() {
    this.control.reset(this.control.value);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.cbValue = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngOnInit() {
    // let headerdata: any = this.config.HttpHeaders;
    // try {
    //   this.subscription.add(
    //     this.http
    //       .get(this.getUrlWithParameters(this.refurl.GetProductsUrl), {
    //         headers: new HttpHeaders(headerdata)
    //       })
    //       .subscribe(
    //         res => {
    //           this.products = res;
    //           if (this.products.length > 0) {
    //             let obj = {};
    //             obj[this.textField] = "All";
    //             this.products.unshift(obj);
    //           }
    //         },
    //         error => {
    //           this.us.Show(error.message, "error");
    //         }
    //       )
    //   );
    // } catch (ex) {
    //   this.us.Show(ex.message, "error");
    // }
  }

  ngOnChanges() {
    this._reasons = this.data;
  }
  // filterItems(obj: any) {
  //   try {
  //     if (obj == undefined) {
  //       this.ProductName = "All";
  //     } else {
  //       this.ProductName = obj;
  //     }
  //     let value = this.ProductName.toLowerCase();
  //     if (value === "all") {
  //       this.data = this._reasons;
  //     } else {
  //       this.data = this._reasons.filter(
  //         x => x.ProductName.toLowerCase() == value
  //       );
  //     }
  //   } catch (ex) {
  //     this.us.Show(ex.message, "error");
  //   }
  // }
  // updateRefReason(obj: any) {
  //   let headerdata: any = this.config.HttpHeaders;
  //   try {
  //     this.subscription.add(
  //       this.http
  //         .post(this.getUrlWithParameters(this.refurl.UpdateUrl), obj, {
  //           headers: new HttpHeaders(headerdata)
  //         })
  //         .subscribe(
  //           x => { },
  //           error => {
  //             this.us.Show(error.message, "error");
  //           }
  //         )
  //     );
  //   } catch (ex) {
  //     this.us.Show(ex.message, "error");
  //   }
  // }
  // getUrlWithParameters(url: string) {
  //   for (let i = 0; i < this.config.UriParameters.length; i++) {
  //     url = url.replace(
  //       "{" + this.config.UriParameters[i].Key + "}",
  //       this.config.UriParameters[i].Value
  //     );
  //   }
  //   return url;
  // }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
