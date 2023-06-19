import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
} from "@angular/core";
import { SelectableSettings } from "@progress/kendo-angular-grid";
import { of } from "rxjs";

@Component({
  selector: "exp-dropdowntreeView",
  templateUrl: "./dropdown-treeview.component.html",
  styleUrls: ["./dropdown-treeview.component.scss"],
})
export class DropdownTreeviewComponent {
  @Input("datasource") datasource: any[] = [];
  @Input("searchlimit") searchlimit: number = 2;
  @Input("childrenFeild") ChildrenFeild: any;
  @Input("textField") textfield: string = "";
  @Input("valueField") valueField: string = "";
  @Input("selectedValue") selectedValue: any = {};
  @Output("selectedValueChange") selectedValueChange = new EventEmitter<any>();
  @Input("isPrimitive") isPrimitiveBinding: boolean = true;
  @Input("isSingleSelection") isSingleSelection: boolean = true;
  @Input("disabled") isControlDisabled: boolean = false;
  @Input("isNodeDetailsRequired") isNodeDetailsRequired: boolean = true;
  @Input("class") class: string = "";
  @Output("onSelect") valueSelected = new EventEmitter<any>();
  @Input("width") width: number = 200;
  @Input("height") height: number = 35;

  public expandedKeys: any[] = [];
  public selectedKeys: any[] = [];
  public selectedTexts: any[] = [];
  public data: any[];
  fields: any = [];
  public searchTerm = "";
  public show: boolean = false;
  public selection: SelectableSettings = {
    mode: "single",
  };
  constructor(private _eref: ElementRef) { }

  public ngOnInit(): void {
    this.data = this.datasource;
    this.fields.push(this.textfield, this.textfield);
    this.populateSelectedKeys();
    this.BindExpandIndexes(this.data);
    if (!this.isSingleSelection) {
      this.selection = {
        mode: "multiple",
      };
    } else {
      this.selection = {
        mode: "single",
      };
    }
  }
  populateSelectedKeys(): void {
    if (
      typeof this.selectedValue == "undefined" ||
      this.selectedValue == null ||
      this.selectedValue == ""
    )
      return;
    let tempArray = [];
    if (this.isPrimitiveBinding && this.isSingleSelection) {
      this.selectedKeys = [...[this.selectedValue]];
      this.datasource.forEach((dataItem) => {
        tempArray.push(
          this.searchTree(dataItem, this.selectedValue, this.valueField)
        );
      });
    }
    if (!this.isPrimitiveBinding && this.isSingleSelection) {
      this.selectedKeys = [...[this.selectedValue[this.valueField]]];
      this.datasource.forEach((dataItem) => {
        tempArray.push(
          this.searchTree(
            dataItem,
            this.selectedValue[this.valueField],
            this.valueField
          )
        );
      });
    }

    this.selectedTexts = [];
    tempArray.map((item) => {
      if (item) {
        return this.selectedTexts.push(item[this.textfield]);
      }
    });
  }
  searchTree(item: any, valueToSearch: any, property: string) {
    if (item[property] == valueToSearch) {
      return item;
    } else if (item[this.ChildrenFeild] != null) {
      var i;
      var result = null;
      for (i = 0; result == null && i < item[this.ChildrenFeild].length; i++) {
        result = this.searchTree(
          item[this.ChildrenFeild][i],
          valueToSearch,
          property
        );
      }
      return result;
    }
    return null;
  }
  public isExpanded = (dataItem: any, index: string) => {
    return this.expandedKeys.indexOf(index) > -1;
  };
  public handleCollapse(node) {
    this.expandedKeys = this.expandedKeys.filter((k) => k !== node.index);
  }
  public handleExpand(node) {
    this.expandedKeys = this.expandedKeys.concat(node.index);
  }
  public hasChildren = (item: any) =>
    item[this.ChildrenFeild] && item[this.ChildrenFeild].length > 0;

  public fetchChildren = (item: any) => of(item[this.ChildrenFeild]);

  public handleSelection(event): void {
    if (this.isPrimitiveBinding && this.isSingleSelection) {
      if (
        this.selectedValue &&
        this.selectedValue === event.dataItem[this.valueField]
      ) {
        this.show = !this.show;
      } else {
        this.selectedTexts = [];
        this.selectedValue = event.dataItem[this.valueField];
        this.selectedValueChange.emit(this.selectedValue);
        this.show = !this.show;
      }
    }
    if (!this.isPrimitiveBinding && this.isSingleSelection) {
      if (
        this.selectedValue &&
        this.selectedValue[this.valueField] === event.dataItem[this.valueField]
      ) {
        this.show = !this.show;
      } else {
        this.selectedTexts = [];
        if (
          event.dataItem[this.ChildrenFeild] &&
          event.dataItem[this.ChildrenFeild].length > 0
        ) {
          let tempObj = Object.assign({}, event.dataItem);
          if (!this.isNodeDetailsRequired) {
            delete tempObj[this.ChildrenFeild];
          } else {
            let searchedParent = {};
            for (var item of this.datasource) {
              searchedParent = this.searchTree(
                item,
                event.dataItem[this.valueField],
                this.valueField
              );
              if (searchedParent != null) {
                tempObj[this.ChildrenFeild] =
                  searchedParent[this.ChildrenFeild];
                break;
              }
            }
          }
          this.selectedValue = {
            [this.valueField]: tempObj[this.valueField],
            [this.textfield]: tempObj[this.textfield],
            [this.ChildrenFeild]: tempObj[this.ChildrenFeild],
          };
          this.selectedValueChange.emit(this.selectedValue);
        } else {
          this.selectedValue = {
            [this.valueField]: event.dataItem[this.valueField],
            [this.textfield]: event.dataItem[this.textfield],
          };
          this.selectedValueChange.emit(this.selectedValue);
        }
        this.show = !this.show;
      }
    }
    this.valueSelected.emit(event.dataItem);
  }
  public onToggle(): void {
    if (this.isControlDisabled) return;
    this.show = !this.show;
    if (!this.show) {
      this.resetSearches();
    }
  }
  resetSearches() {
    this.searchTerm = "";
    this.data = this.datasource;
    // this.BindExpandIndexes(this.data);
  }
  onClickedOutside(e: Event) {
    if (!this._eref.nativeElement.contains(e.target)) {
      this.show = false;
    } else {
      this.show = true;
    }
    if (this._eref.nativeElement.querySelector(".k-state-focused")) {
      this.show = true;
    }
    if (!this.show) this.resetSearches();
  }
  //searched function related

  public expandIndex: any = "";

  public onkeyup(value: string): void {
    if (value.length > this.searchlimit) {
      this.data = this.search(this.datasource, value, this.textfield);
      this.expandIndex = "";
    } else {
      this.data = this.datasource;
      this.expandedKeys = [];
    }
    this.BindExpandIndexes(this.data);
  }
  public search(data: any[], term: string, searchOn: string): any[] {
    let textName = this.textfield;
    let children = this.ChildrenFeild;
    let value = this.valueField;

    return data.reduce((acc, node) => {
      if (this.contains(node[searchOn], term)) {
        acc.push(node);
      } else if (node[children] && node[children].length > 0) {
        let newItems = this.search(node[children], term, searchOn);
        if (newItems.length > 0) {
          acc.push({
            [textName]: node[textName],
            [children]: newItems,
            [value]: node[value],
            // expanded: true,
          });
        }
      }
      return acc;
    }, []);
  }
  public BindExpandIndexes(datasource: any, childindex: number = -1) {
    for (let i = 0; i < datasource.length; i++) {
      if (datasource[i]) {
        this.expandIndex = i + "";
        const index: number = this.expandedKeys.indexOf(this.expandIndex);
        if (index < 0) {
          this.expandedKeys.push(this.expandIndex);
        }
      }
      if (datasource[i][this.ChildrenFeild]) {
        this.expandIndex += "_" + i;
        const index: number = this.expandedKeys.indexOf(this.expandIndex);
        if (index < 0) {
          this.expandedKeys.push(this.expandIndex);
        }
        this.bindchildids(datasource[i][this.ChildrenFeild], i);
      }
    }
  }
  public bindchildids(datasource: any, i: any) {
    for (let childindex = 0; childindex < datasource.length; childindex++) {
      if (
        datasource[childindex][this.ChildrenFeild] &&
        datasource[childindex][this.ChildrenFeild].lenght > 0
      ) {
        this.expandIndex += "_" + childindex;
        const index: number = this.expandedKeys.indexOf(this.expandIndex);
        if (index < 0) {
          this.expandedKeys.push(this.expandIndex);
        }
        if (
          datasource[childindex][this.ChildrenFeild][childindex][
          this.ChildrenFeild
          ]
        ) {
          this.bindchildids(
            datasource[childindex][this.ChildrenFeild][childindex][
            this.ChildrenFeild
            ],
            childindex
          );
        }
      }
    }
  }
  public contains(text: string, term: string): boolean {
    return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
  }
  ngOnChanges(changes: SimpleChange) {
    if (typeof changes["selectedValues"] !== "undefined") {
      var change = changes["selectedValues"];
      if (!change.firstChange && !this.isSingleSelection) {
        this.populateSelectedKeys();
      }
    }
    if (typeof changes["selectedValue"] !== "undefined") {
      var change = changes["selectedValue"];
      if (!change.firstChange && this.isSingleSelection) {
        this.populateSelectedKeys();
      }
    }
    if (typeof changes["datasource"] !== "undefined") {
      var change = changes["datasource"];
      if (!change.firstChange) {
        this.data = this.datasource;
        this.BindExpandIndexes(this.data);
        this.populateSelectedKeys();
      }
    }
  }
}
