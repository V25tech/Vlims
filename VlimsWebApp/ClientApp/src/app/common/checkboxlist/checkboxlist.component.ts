import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'checkboxlist',
  templateUrl: './checkboxlist.component.html',
  inputs: ['textfield', 'name'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxlistComponent, multi: true },
  ]
})
export class CheckboxlistComponent implements ControlValueAccessor {
  private onChange: (value: any) => void;
  private onTouched: () => void;
  private items: any = [];
  //Primitive items
  private primitiveitems: any = [];
  //Complex Items
  private complexitems: any = [];
  checkedItems: Array<any> = [];
  inputtextfield: string = "";

  @Input() data: any;
  @Input() orientation: string = "horizontal";
  @Input() valuefield: string = "";
  @Input("disabled") isdisabled: boolean = false;
  @Input("helpText") helpText: string;
  @Input("hintText") hintText: string;
  @Input() isprimitive: string = "";

  writeValue(data: any): void {
    if (data != undefined && data && data.length > 0) {
      this.setValue(data);
    } else {
      if (this.iscomplex) {
        this.inputtextfield = this["textfield"];
        this.complexitems = this.data.map((e) => {
          return {
            [this.inputtextfield]: e[this.inputtextfield],
            [this.valuefield]: e[this.valuefield],
            checked: false,
          };
        });
      } else {

        if (this.primitiveitems.length == 0) {
          if (typeof this.data[0] === "string") {
            this.primitiveitems = this.data.map((e) => {
              return { value: e, checked: false };
            });
          } else {
            this.primitiveitems = this.data.map((e) => {
              return { value: e[this.valuefield], checked: false };
            });
          }
        }
      }
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isdisabled = isDisabled;
  }

  public get iscomplex(): boolean {
    return this.valuefield != "" && typeof this["textfield"] != "undefined";
  }
  setValue(data: any) {
    if (this.checkedItems.length != data.length) {
      this.checkedItems = [];
      if (this.iscomplex) {
        this.inputtextfield = this["textfield"];
        this.complexitems = this.data.map((e) => {
          return {
            [this.inputtextfield]: e[this.inputtextfield],
            [this.valuefield]: e[this.valuefield],
            checked: false,
          };
        });
        if (typeof data[0] === "string") {
          let items: any = [];
          data.forEach((value) => {
            const element = this.complexitems.find(
              (x) => x.value === value
            );
            let filteredItems = this.checkedItems.filter(
              (item) => item.value === element.value
            );
            if (element && filteredItems.length === 0) {
              element.checked = true;
              this.checkedItems.push(element);
              if (this.isprimitivemode)
                items.push(element[this.valuefield]);
              else items.push(element);
            }
          });
        }
        else {
          let items: any = [];
          data.forEach((value) => {
            const element = this.complexitems.find(
              (x) => x[this.valuefield] === value[this.valuefield]
            );
            let filteredItems = this.checkedItems.filter(
              (item) => item[this.valuefield] === element[this.valuefield]
            );
            if (element && filteredItems.length === 0) {
              element.checked = true;
              this.checkedItems.push(element);
              if (this.isprimitivemode)
                items.push(element[this.valuefield]);
              else items.push(element);
            }
          });
        }
      } else {
        //need to write the code if the change into null or empty array
        if (
          typeof this.data[0] === "string" &&
          this.primitiveitems.length == 0
        ) {
          this.primitiveitems = this.data.map((e) => {
            return { value: e, checked: false };
          });
          if (typeof data[0] === "string") {
            let items: any = [];
            data.forEach((item) => {
              const element = this.primitiveitems.find((x) => x.value === item);
              let filteredItems = this.checkedItems.filter(
                (item) => item.value === element.value
              );
              if (element && filteredItems.length === 0) {
                element.checked = true;
                this.checkedItems.push(element);
                if (this.isprimitivemode)
                  items.push(element.value);
                else items.push(element);
              }
            });
          } else {
            let items: any = [];
            data.forEach((item) => {
              const element = this.primitiveitems.find(
                (x) => x === item[this.valuefield]
              );
              let filteredItems = this.checkedItems.filter(
                (item) => item === element[this.valuefield]
              );
              if (element && filteredItems.length === 0) {
                element.checked = true;
                this.checkedItems.push(element);
                if (this.isprimitivemode)
                  items.push(element.value);
                else items.push(element);
              }
            });
          }
        } else {
          this.primitiveitems = this.data.map((e) => {
            return { value: e[this.valuefield], checked: false };
          });
          if (typeof data[0] === "string") {
            let items: any = [];
            data.forEach((item) => {
              const element = this.primitiveitems.find((x) => x.value === item);
              let filteredItems = this.checkedItems.filter(
                (item) => item.value === element.value
              );
              if (element && filteredItems.length === 0) {
                element.checked = true;
                this.checkedItems.push(element);
                if (this.isprimitivemode)
                  items.push(element.value);
                else items.push(element);
              }
            });
          } else {
            let items: any = [];
            data.forEach((item) => {
              const element = this.primitiveitems.find(
                (x) => x[this.valuefield] === item[this.valuefield]
              );
              let filteredItems = this.checkedItems.filter(
                (item) => item[this.valuefield] === element[this.valuefield]
              );
              if (element && filteredItems.length === 0) {
                element.checked = true;
                this.checkedItems.push(element);
                if (this.isprimitivemode)
                  items.push(element[this.valuefield]);
                else items.push(element);
              }
            });
          }
        }
      }
    }
  }
  checked(e) {
    let items = [];
    if (this.iscomplex) {
      items = this.complexitems
        .filter((x) => x.checked)
        .map((x) => x[this.valuefield]);
    } else {
      items = this.primitiveitems.filter((x) => x.checked).map((x) => x.value);
    }
  }
  //Calling from onItemClick()
  itemChecked(clickedItem: any) {
    let filteredItems = [];
    if (this.checkedItems.length > 0) {
      if (this.iscomplex) {
        filteredItems = this.checkedItems.filter(
          (item) => item[this.valuefield] === clickedItem[this.valuefield]
        );
      } else {
        if (typeof this.data[0] === "object")
          filteredItems = this.checkedItems.filter(
            (item) => item[this.valuefield] === clickedItem[this.valuefield]
          );
        else
          filteredItems = this.checkedItems.filter(
            (item) => item.value === clickedItem.value
          );
      }
    }
    return filteredItems.length > 0;
  }
  //For primitive or not
  public get isprimitivemode(): boolean {
    return this.isprimitive.toLowerCase() == "true";
  }
  //Item click event fired when checkbox checked/unchecked
  onItemClick(item: any) {
    if (!item) {
      return;
    }
    const isFound = this.itemChecked(item);
    if (!isFound) {
      this.addSelected(item);
    } else {
      this.removeSelected(item);
    }
    if (this.checkedItems.length > 0) {
      if (this.iscomplex) {
        let items: any = [];
        this.checkedItems.forEach((item) => {
          if (this.isprimitivemode) {
            items.push(item[this.valuefield]);
          } else {
            items.push(item);
          }
        });
        this.onChange(items);
      } else {
        let items: any = [];
        this.checkedItems.forEach((item) => {
          if (this.isprimitivemode) {
            items.push(item.value);
          } else {
            items.push(item);
          }
        });
        this.onChange(items);
      }
    } else {
      this.onChange(this.checkedItems);
    }
  }
  //Add item to checkboxlist
  addSelected(item: any) {
    item.checked = true;
    this.checkedItems.push(item);
  }
  //Remove item from checkboxlist
  removeSelected(option: any) {
    if (this.checkedItems) {
      if (this.iscomplex) {
        this.checkedItems = this.checkedItems.filter(
          (item) => item[this.valuefield] !== option[this.valuefield]
        );
      } else {
        if (typeof option == "object")
          this.checkedItems = this.checkedItems.filter(
            (item) => item.value !== option.value
          );
        else
          this.checkedItems = this.checkedItems.filter(
            (item) => item !== option
          );
      }
    }
  }
  gethelpClass() {
    if (this.helpText == "" || this.helpText == undefined) {
      return {
        "vm-help-icon-inline": false,
      };
    } else {
      return {
        "vm-help-icon-inline": true,
      };
    }
  }
  gethintClass() {
    if (this.hintText == "" || this.hintText == undefined) {
      return {
        "vm-hint-inline text-muted": false,
      };
    } else {
      return {
        "vm-hint-inline text-muted": true,
      };
    }
  }
}
