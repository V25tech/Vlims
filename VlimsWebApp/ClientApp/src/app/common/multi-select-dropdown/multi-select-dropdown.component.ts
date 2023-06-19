import { Component, Input, EventEmitter, Output, ElementRef, ViewChild, ViewChildren, QueryList, SimpleChanges } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "exp-multi-select-dropdown",
  templateUrl: "./multi-select-dropdown.component.html",
  styleUrls: ["./multi-select-dropdown.component.scss"],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: MultiSelectDropdownComponent, multi: true }]
})
export class MultiSelectDropdownComponent implements ControlValueAccessor {
  public onChange: (value: any) => void;
  public onTouched: () => void;
  //Property for using self component
  ispopupopen: boolean = false;
  primitiveData: Array<any> = [];
  complexData: Array<any> = [];
  checkedItems: Array<any> = [];
  isselectall: boolean = false;
  selecteditems: string = "";
  controlElements: Array<any> = [];
  isDirty: boolean = false;
  //Getting value from outer component
  @Input() data: Array<any> = [];
  @Input() disabled: boolean = false;
  @Input() placeholder: string = "Select";
  @Input() valuefield: string = "";
  @Input() isprimitive: string = "";
  @Input() textfield: string = "";
  @Input() name: string = "";
  //Handling outer event
  @Output("valueChange") valueChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("dropdown", { static: true }) dropdown: ElementRef;
  @ViewChild("dropdownList", { static: true }) dropdownList: ElementRef;
  @ViewChildren("filteredContents") filteredContents: QueryList<any>;
  //NG_VALUE_ACCESSOR method for custom component
  writeValue(data: any): void {
    if (data != undefined && data && data.length > 0 && data != null) {
      this.setValue(data);
    } else {
      this.setValue([]);
      this.selecteditems = "";
    }
  }
  //NG_VALUE_ACCESSOR method for custom component
  registerOnChange(fn: any): void { this.onChange = fn; }
  //NG_VALUE_ACCESSOR method for custom component
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  //NG_VALUE_ACCESSOR method for custom component
  setDisabledState?(isDisabled: boolean): void { this.disabled = isDisabled; }
  //For page template rendering based on iscomplex property
  public get iscomplex(): boolean { return typeof this.data[0] == "object"; }
  //For primitive or not
  public get isprimitivemode(): boolean { return this.isprimitive.toLowerCase() == "true"; }
  //Setting binding value from user
  setValue(data: any) {
    this.updateTemplateData();
    this.checkedItems = [];
    if (data.length > 0 && this.checkedItems.length == 0) {
      //Preparing the templatedata from input
      if (this.iscomplex) {
        if (typeof data[0] == "object") {//Binding data as complex array
          let items: any = [];
          data.forEach((item) => {
            const element = this.complexData.find((x) => x[this.valuefield] === item[this.valuefield]);
            const isFound = this.itemChecked(item);
            if (element && !isFound) {
              element.checked = true;
              this.checkedItems.push(element);
              if (this.isprimitivemode) items.push(element[this.valuefield]);
              else items.push(element);
            }
          });
        }
        if (typeof data[0] == "string" || typeof data[0] == "number") {//binding data as normal array
          let items: any = [];
          let dataItems: any = [];
          if (typeof data == "string") {
            dataItems.push(data);
          } else {
            dataItems = data.slice();
          }
          dataItems.forEach((item) => {
            const element = this.complexData.find((x) => x[this.valuefield] === item);
            const isFound = this.itemChecked(item);
            if (element && !isFound) {
              element.checked = true;
              this.checkedItems.push(element);
              if (this.isprimitivemode) items.push(element[this.valuefield]);
              else items.push(element);
            }
          });
        }
      } else {
        if (typeof data[0] == "object") {//binding data as complex array
          let items: any = [];
          data.forEach((item) => {
            const element = this.primitiveData.find((x) => x.value === item[this.valuefield]);
            const isFound = this.itemChecked(item);
            if (element && !isFound) {
              element.checked = true;
              this.checkedItems.push(element);
              if (this.isprimitivemode) items.push(element.value);
              else items.push(element);
            }
          });
        }
        if (typeof data[0] == "string" || typeof data[0] == "number") {//binding data as normal array
          let items: any = [];
          let dataItems: any = [];
          if (typeof data == "string") {
            dataItems.push(data);
          } else {
            dataItems = data.slice();
          }
          dataItems.forEach((item) => {
            const element = this.primitiveData.find((x) => x.value === item);
            const isFound = this.itemChecked(item);
            if (element && !isFound) {
              element.checked = true;
              this.checkedItems.push(element);
              if (this.isprimitivemode) items.push(element.value);
              else items.push(element);
            }
          });
        }
      }
      //Calling checkeditems method for display in placeholder
      this.showCheckedItems();
      this.isselectall = this.checkedItems.length == this.data.length;
    }
  }
  //Checkboxlist change event
  checked(e) {
    this.isDirty = true;
    let items = [];
    if (this.iscomplex)
      items = this.complexData.filter((x) => x.checked).map((x) => x[this.valuefield]);
    else {
      items = this.primitiveData.filter((x) => x.checked).map((x) => x);
    }
    this.controlElements.push(e);
  }
  //Calling from onItemClick()
  itemChecked(clickedItem: any) {
    let filteredItems = [];
    if (this.checkedItems.length > 0) {
      if (this.iscomplex) {
        filteredItems = this.checkedItems.filter((item) => item[this.valuefield] === clickedItem[this.valuefield]);
      } else {
        filteredItems = this.checkedItems.filter((item) => item.value === clickedItem.value);
      }
    }
    return filteredItems.length > 0;
  }
  //Item click event fired when checkbox checked/unchecked
  onItemClick(item: any) {
    if (!item) {
      return;
    }
    //Checking item is exists or not in checkeditems list
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
    this.showCheckedItems();
  }
  //Add item
  addSelected(item: any) {
    item.checked = true;
    this.checkedItems.push(item);
    this.isselectall = this.checkedItems.length == this.data.length;
  }
  //Remove item
  removeSelected(option: any) {
    this.isselectall = false;
    if (this.checkedItems.length > 0) {
      if (this.iscomplex) {
        this.checkedItems = this.checkedItems.filter((item) => item[this.valuefield] !== option[this.valuefield]);
      } else {
        if (typeof option == "object")
          this.checkedItems = this.checkedItems.filter((item) => item.value !== option.value);
        else
          this.checkedItems = this.checkedItems.filter((item) => item !== option);
      }
    }
  }
  //Show items selected on button
  showCheckedItems() {
    this.selecteditems = "";
    if (this.checkedItems.length > 0) {
      if (this.iscomplex) {
        this.selecteditems = this.checkedItems.map((item) => item[this.textfield]).join(", ");
      } else {
        this.selecteditems = this.checkedItems.map((item) => item.value).join(", ");
      }
    }
    return this.selecteditems;
  }
  //Dropdown button click event
  toggleDropdown(event: any) {
    this.ispopupopen = !this.ispopupopen;
    if (!this.ispopupopen) {
      this.onTouched();
    }
    event.preventDefault();
  }
  //Pushing all elements with checked as true to checkeditems list
  selectall() {
    let items: any = [];
    if (this.iscomplex) {
      if (this.complexData.length > 0) {
        if (this.isselectall) {
          this.complexData.forEach((item) => {
            item.checked = false;
            this.checkedItems.push(item);
          });
          this.checkedItems = [];
        } else {
          this.complexData.forEach((item) => {
            if (!item.checked) {
              item.checked = true;
              this.checkedItems.push(item);
            }
            if (this.isprimitivemode) items.push(item[this.valuefield]);
            else items.push(item);
          });
        }
      }
    } else {
      if (this.primitiveData.length > 0) {
        if (this.isselectall) {
          this.primitiveData.forEach((item) => {
            item.checked = false;
            this.checkedItems.push(item);
          });
          this.checkedItems = [];
        } else {
          this.primitiveData.forEach((item) => {
            if (!item.checked) {
              item.checked = true;
              this.checkedItems.push(item);
            }
            if (this.isprimitivemode) items.push(item.value);
            else items.push(item);
          });
        }
      }
    }
    this.showCheckedItems();
    this.onChange(items);
    this.valueChange.emit(this.controlElements);
  }
  //Close multiselect dropdown
  closedropdownlist(e) {
    if (this.ispopupopen) {
      this.valueChange.emit(this.controlElements);
      this.onTouched();
    }
    this.ispopupopen = false;
  }
  ngOnChanges(changes: SimpleChanges): void {
    let inputData = changes["data"];
    if (inputData.currentValue != undefined) {
      this.updateTemplateData();
      if (inputData.previousValue == undefined) {
        if (this.iscomplex) {
          if (this.checkedItems.length > 0) {
            this.checkedItems.forEach((value) => {
              const element = this.complexData.find(
                (x) => x[this.valuefield] === value[this.valuefield]
              );
              if (element) {
                element.checked = true;
              }
              this.checkedItems = this.checkedItems.filter(
                (item) => item[this.valuefield] !== element[this.valuefield]
              );
              this.checkedItems.push(element);
            });
          }
        } else {
          if (this.checkedItems.length > 0) {
            this.checkedItems.forEach((item) => {
              const element = this.primitiveData.find(
                (x) => x.value === item.value
              );
              if (element) {
                element.checked = true;
              }
              this.checkedItems = this.checkedItems.filter(
                (item) => item.value !== element.value
              );
              this.checkedItems.push(element);
            });
          }
        }
      } else {
        this.isselectall = undefined;
      }
    }
  }
  //Preparing templte object from input based on complex or non-complex objects
  updateTemplateData() {
    if (this.iscomplex) {
      this.complexData = this.data.map((e) => {
        return {
          [this.textfield]: e[this.textfield],
          [this.valuefield]: e[this.valuefield],
          checked: false,
        };
      });
    } else {
      this.primitiveData = this.data.map((e) => {
        return { value: e, checked: false };
      });
    }
  }
}
