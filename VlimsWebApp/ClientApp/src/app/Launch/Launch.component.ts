import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgForm, NgModelGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/api.service";
import { UtilityService } from "src/app/utility.service";
import { ValidatorService } from "src/app/core/validator.service";
import { CanComponentDeactivate } from "src/app/core/can-deactivate-guard.service";
import { CustomFunctionService } from "src/app/customfunction.service";
import { Subscription } from "rxjs";
import { ApplicationContextService } from "src/app/application-context.service";
import { Title } from "@angular/platform-browser";
import { ApplicationConstants } from "src/app/common/ApplicationConstants";
import {
  DataStateChangeEvent,
  GridComponent,
  PageChangeEvent,
} from "@progress/kendo-angular-grid";
import {
  PlanInfo,
  PlanDeterminationFactorPlanMap,
  PlanDeterminationFactor,
  ReleasePackage,
  ProductEntity,
  ReleasePlans,
  PublishContext,
} from "src/app/models/models";
import { ignoreElements } from "rxjs/operators";
import { IFTTUtilityService } from "../shared/utility.service";
@Component({
  selector: "exp-container-Launch",
  templateUrl: "./Launch.component.html",
})
export class LaunchComponent implements OnInit, CanComponentDeactivate {
  validationMessages: string[] = [];
  subscription: Subscription = new Subscription();
  context = new PublishContext();
  canDeactivate(): boolean {
    return !this.LaunchForm.dirty; //this.LaunchForm.valid &&
  }
  @ViewChild("LaunchForm", null) LaunchForm: NgForm;
  @ViewChild("lstReleasePackagegridInstance", null)
  public lstReleasePackagegridInstance: GridComponent;
  @ViewChild("lstReleasePackageGrid_Group", null)
  public lstReleasePackageGrid_Group: NgModelGroup;
  @ViewChild("lstPlanFactors_Instance", null)
  lstPlanFactors_Instance: GridComponent;
  @ViewChild("lstPlanFactors_Group", null)
  public lstPlanFactors_Group: NgModelGroup;
  @ViewChild("DeleteMessage_Launch", { static: true })
  DeleteMessage: TemplateRef<any>;
  @ViewChild("InformationMessage_Launch", { static: true })
  informationMessage: TemplateRef<any>;
  @ViewChild("DeleteEntity_Information", { static: true })
  DeleteEntityInformation: TemplateRef<any>;
  @ViewChild("lstReleasePlansgridInstance", null)
  public lstReleasePlansgridInstance: GridComponent;
  @ViewChild("lstReleasePlansGrid_Group", null)
  public lstReleasePlansGrid_Group: NgModelGroup;
  objPlanInfo: PlanInfo[] = [];
  TabIndex: number = 0;
  lstPlanFactorsMap: PlanDeterminationFactorPlanMap[] = [];
  objPlanFactor = new PlanDeterminationFactor();
  objplanFactorMap = new PlanDeterminationFactorPlanMap();
  SelectedTab: string = "Release Packages";
  PlanFactorsGridVisibility: boolean = false;
  ReleasePackagesGridVisibility: boolean = true;
  ReleasePlansGridVisibility: boolean = false;
  SelectedProduct: string = "";
  lstProducts: ProductEntity[] = [];
  SelectedTabValue: string = "Release Packages";
  SelectedProdId: number = 0;
  ActionDropdown: string = "";
  IsPopupVisible: boolean = false;
  SearchVisibility: boolean = true;
  IsValidData: boolean = true;
  objPlanDeterminationFactor: PlanDeterminationFactor[] = [];
  detid: number = 0;
  ReleasePlans: ReleasePackage[] = [];
  releaseplanvisibility: boolean = false;
  public navpills_options_navplsbbc1d709bcee88bc0d1f: any = [
    { text: "Plan Factors", value: "" },
    { text: "Release Packages", value: "" },
    // { text: "Plan Packages", value: "" },
    // { text: "Release Plans", value: "" },
  ];
  public ddr_source_ddl65b52e8f23177779876c = [
    { text: "Delete", value: "Delete" },
    { text: "Export", value: "Export" },
    { text: "Delete-Factor", value: "DeleteFactor" },
  ];
  public ddl65b52e8f23177779876c_defaultItem = {
    text: "Other Actions",
    value: null,
  };
  lstReleasePackageDateProperties = [];
  ReleasePackages: ReleasePackage[] = [];
  lstReleasePackageEditMode: boolean = false;
  lstPlanFactorseditmode: boolean = true;
  accesslevel: number;
  public ddl7ce9527cb9fac00c4f69_defaultItem = {
    DisplayName: "Select",
    Id: null,
  };
  SelectedproductInProducts: any;
  FactorNameToDelete: string = "";
  lstReleasePlansDateProperties = [];
  lstReleasePlansEditMode: boolean = false;
  urlcount: number = 0;
  constructor(
    public vs: ValidatorService,
    public us: UtilityService,
    public apiServc: ApiService,
    public cfs: CustomFunctionService,
    public appContext: ApplicationContextService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {
    title.setTitle(ApplicationConstants.Role_Launch);
    this.accesslevel = this.us.getAccesslevel("Launch");
    if (this.accesslevel === 1 || this.accesslevel === 2) {
      this.ddr_source_ddl65b52e8f23177779876c.splice(0, 2);
    }
  }
  ngOnInit() {
    this.appContext.toggleOffcanvas = false;
    this.appContext.IsPackageWebJob =
      this.appContext.appSettings.IsPackageWebJob;
    let variables = {};
    this.apiServc
      .GetAllProducts(
        "Product/GetAllProducts?Username=" + this.appContext.username,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetAllProducts_OnLoadCompleted(r, variables);
        },
        (e) => {
          this.GetAllProducts_OnLoadErrorRaised(e, variables);
        }
      );
    if (
      this.appContext.SelectedTab == "Plan Factors" ||
      this.appContext.SelectedTab == "Release Packages" ||
      this.appContext.SelectedTab == "Release Plans" ||
      this.appContext.SelectedTab == "Plan Packages"
    ) {
      this.SelectedTab = this.appContext.SelectedTab;
      this.Launch_Tab_Selection_Changed(this.SelectedTab);
    }
    if (this.SelectedTab == "Release Packages") {
      this.ddr_source_ddl65b52e8f23177779876c = [
        { text: "Delete", value: "Delete" },
        { text: "Export", value: "Export" },
        { text: "Export Json Only", value: "ExportJson" },
        { text: "Workspace Dependency.", value: "workspace" },
        { text: "Export Bom Package", value: "exportbom" },
      ];
    }
  }

  lstPlanFactors_eventHandler(funtionName: any, dataItem: any) {
    if (
      typeof this[funtionName] !== "undefined" &&
      typeof this[funtionName] == "function"
    ) {
      this[funtionName](dataItem);
    }
  }
  lstPlanFactors = {
    columns: [],
    data: [],
    selectAll: false,
    removedItems: [],
    state: {
      filter: {
        filters: [],
        logic: "and",
      },
      group: [],
      sort: [],
      skip: 0,
      take: 2,
    },
    isNewRowPristine: false,
    numdatatypes: ["Integer", "Numeric", "Decimal"],
    editedRowIndex: -1,
    staticRowIndex: -1,
    editedRowItem: undefined,
    selectedItem: undefined,
    newItem: {},
    addItem: () => {
      if (!this.lstPlanFactorseditmode) {
        return;
      }
      if (!this.lstPlanFactors._isDataValid()) {
        return;
      }
      this.lstPlanFactors._closeEditableRow();
      this.lstPlanFactors.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 2,
      };
      this.lstPlanFactors.newItem = {
        isDirtyRow: true,
        uid: this.lstPlanFactors._getUid(),
        isSelected: false,
        isNewRow: true,
        mode: "added",
      };
      this.lstPlanFactors.columns.forEach((column) => {
        column.Fields.forEach((fld) => {
          this.lstPlanFactors.newItem[fld.Name] = "";
          if (
            fld.ControlType == "DropDown" &&
            (fld.Values == null || fld.Values.length == 0)
          ) {
            this.lstPlanFactors.newItem[fld.DataSourceName] = [];
          }
        });
      });
      this.lstPlanFactors._pageChange({ skip: 0, take: 2 });
      this.lstPlanFactors._pushItem(this.lstPlanFactors.newItem);
      this.lstPlanFactors.editedRowIndex = 0;
      this.lstPlanFactors.staticRowIndex = 0;
      this.lstPlanFactors.data[this.lstPlanFactors.editedRowIndex] =
        this.lstPlanFactors.newItem;
      this.lstPlanFactors.editedRowItem = this.lstPlanFactors.newItem;
      this.lstPlanFactors.selectedItem = this.lstPlanFactors.newItem;
      this.lstPlanFactors.isNewRowPristine = true;
      this.lstPlanFactors_Instance.editRow(this.lstPlanFactors.editedRowIndex);
    },
    _editRowItem: ({ isEdited, dataItem, rowIndex, column }) => {
      if (!this.lstPlanFactorseditmode) {
        return;
      }
      if (
        isEdited ||
        (typeof column.field != "undefined" && column.field == "isSelected") ||
        (typeof column.title != "undefined" && column.title == "Actions")
      ) {
        return;
      }
      if (this.lstPlanFactors._isDataValid()) {
        this.lstPlanFactors._closeEditableRow();
        this.lstPlanFactors.editedRowItem = Object.assign({}, dataItem);
        this.lstPlanFactors.selectedItem = dataItem;
        this.lstPlanFactors.editedRowIndex = rowIndex;
        let relativeIndex = this.lstPlanFactors._getIndexOfItem(dataItem);
        if (relativeIndex > -1) {
          this.lstPlanFactors.staticRowIndex = relativeIndex;
        }
        dataItem.isDirtyRow = true;
        if (!dataItem.isNewRow) dataItem.mode = "edited";
        this.lstPlanFactors_Instance.editRow(rowIndex);
      }
    },
    _pushItem: (dataItem: any) => {
      this.lstPlanFactors.data = [...[dataItem], ...this.lstPlanFactors.data];
    },
    _isDataValid: () => {
      if (this.lstPlanFactors.isNewRowPristine) {
        this.lstPlanFactors.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.lstPlanFactors_Group.control]);
      }
      return this.lstPlanFactors_Group.valid;
    },
    _closeEditableRow: () => {
      if (this.lstPlanFactors.editedRowIndex > -1) {
        this.lstPlanFactors_Instance.closeRow(
          this.lstPlanFactors.editedRowIndex
        );
      }
      this.lstPlanFactors.editedRowIndex = -1;
      this.lstPlanFactors.staticRowIndex = -1;
      this.lstPlanFactors.editedRowItem = undefined;
      this.lstPlanFactors.selectedItem = undefined;
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.lstPlanFactors._isDataValid() &&
        this.lstPlanFactors.editedRowIndex == 0 &&
        this.lstPlanFactors.editedRowItem["isNewRow"]
      ) {
        this.lstPlanFactors.removeItem(this.lstPlanFactors.editedRowItem);
      }
      if (
        !this.lstPlanFactors._isDataValid() &&
        this.lstPlanFactors.staticRowIndex > -1 &&
        this.lstPlanFactors.editedRowItem
      ) {
        const changedObj =
          this.lstPlanFactors.data[this.lstPlanFactors.staticRowIndex];
        Object.assign(changedObj, this.lstPlanFactors.editedRowItem);
      }

      this.lstPlanFactors._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.lstPlanFactors.data.filter((item: any) => {
        return item["isSelected"];
      });
    },

    removeItem: (dataItem: any) => {
      if (!this.lstPlanFactorseditmode) {
        return;
      }
      let index = this.lstPlanFactors._getIndexOfItem(dataItem);
      if (
        this.lstPlanFactors.staticRowIndex != index &&
        !this.lstPlanFactors._isDataValid()
      ) {
        return;
      }
      if (index > -1) {
        this.lstPlanFactors.data.splice(index, 1);
        this.lstPlanFactors.data = this.lstPlanFactors.data.slice();
      }
      this.lstPlanFactors._closeEditableRow();
      if (!dataItem["isNewRow"]) {
        dataItem.mode = "removed";
        this.lstPlanFactors.removedItems.push(dataItem);
      }
    },
    _deleteItem: (dataItem: any) => {
      this.GetFactorMapUsedInfo(dataItem);
    },
    initializeGridDataSource: () => {
      this.lstPlanFactors.removedItems = [];
      if (this.lstPlanFactors.data.length > 0) {
        this.lstPlanFactors.data.forEach((row) => {
          row["uid"] = this.lstPlanFactors._getUid();
          row["isSelected"] = false;
          row["isDirtyRow"] = false;
          row["isNewRow"] = false;
          this.lstPlanFactors.columns.forEach((column) => {
            column.Fields.forEach((fld) => {
              if (fld.ControlType == "DatePicker") {
                row[fld.Name] = new Date(row[fld.Name]);
              }
            });
          });
        });
      }
    },
    _getUid: () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    _setCheckedAll: () => {
      if (
        this.lstPlanFactors.data.find(
          (item: any) => item["isSelected"] == false
        )
      ) {
        this.lstPlanFactors.selectAll = false;
      } else {
        this.lstPlanFactors.selectAll = true;
      }
    },

    _toggleAllChecks: () => {
      this.lstPlanFactors.selectAll = !this.lstPlanFactors.selectAll;
      this.lstPlanFactors.data.map((item: any) => {
        item["isSelected"] = this.lstPlanFactors.selectAll;
      });
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["isSelected"] = !dataItem["isSelected"];
      this.lstPlanFactors._setCheckedAll();
    },

    getCurrentDataItem: () => {
      if (this.lstPlanFactors.editedRowIndex > -1) {
        return this.lstPlanFactors.data[this.lstPlanFactors.editedRowIndex];
      }
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        ...this.lstPlanFactors.data.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        ...this.lstPlanFactors.data.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        ...this.lstPlanFactors.removedItems,
      ];
      if (!this.lstPlanFactors._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.lstPlanFactors.editedRowItem["uid"]
        );
        dirtyItemsList.splice(index, 1);
        dirtyItemsList = dirtyItemsList.slice();
      }
      return dirtyItemsList;
    },
    _validateEditExit: (event) => {
      let isBypassEvent = false;
      if (typeof event !== "boolean") {
        for (var element of event.path) {
          if (element.tagName == "KENDO-CALENDAR") {
            isBypassEvent = true;
            break;
          }
        }
        if (isBypassEvent) {
          return;
        }
        if (this.lstPlanFactors._isDataValid())
          this.lstPlanFactors._closeEditableRow();
      }
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.lstPlanFactors.data.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _pageChange(event: PageChangeEvent): void {
      this.state.skip = event.skip;
    },
  };

  lstReleasePackage = {
    Items: [],
    state: {
      filter: {
        filters: [],
        logic: "and",
      },
      group: [],
      sort: [],
      skip: 0,
      take: 10,
    },
    isNewRowPristine: false,
    editedRowIndex: -1,
    staticRowIndex: -1,
    editedRowItem: undefined,
    selecteditem: undefined,
    headerCheckBoxValue: false,
    removedItems: [],
    addItem: () => {
      if (!this.lstReleasePackageEditMode) {
        return;
      }
      if (!this.lstReleasePackage._isDataValid()) {
        return;
      }
      this.lstReleasePackage._closeEditableRow();
      let obj = new ReleasePackage();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.lstReleasePackage._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.lstReleasePackage.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.lstReleasePackage._pageChange({ skip: 0, take: 10 });
      this.lstReleasePackage._pushItem(obj);
      this.lstReleasePackage.editedRowIndex = 0;
      this.lstReleasePackage.staticRowIndex = 0;
      this.lstReleasePackage.Items[this.lstReleasePackage.editedRowIndex] = obj;
      this.lstReleasePackage.editedRowItem = obj;
      this.lstReleasePackage.selecteditem = obj;
      this.lstReleasePackage.isNewRowPristine = true;
      this.lstReleasePackagegridInstance.editRow(
        this.lstReleasePackage.editedRowIndex
      );
    },
    _editRowItem: (event) => {
      if (!this.lstReleasePackageEditMode) {
        return;
      }
      let isActionEvent = false;
      let target = event.originalEvent.target;
      if (
        target["tagName"] == "IMG" ||
        target["innerHTML"].indexOf("exp-dropdown-button") > -1 ||
        target["tagName"] == "path" ||
        target["tagName"] == "svg" ||
        target["tagName"] == "DIV"
      )
        isActionEvent = true;
      if (isActionEvent) {
        return;
      }
      if (event.isEdited) {
        return;
      }
      if (this.lstReleasePackage._isDataValid()) {
        this.lstReleasePackage._closeEditableRow();
        this.lstReleasePackage.editedRowItem = Object.assign(
          {},
          event.dataItem
        );
        this.lstReleasePackage.selecteditem = event.dataItem;
        this.lstReleasePackage.editedRowIndex = event.rowIndex;
        let relativeIndex = this.lstReleasePackage._getIndexOfItem(
          event.dataItem
        );
        if (relativeIndex > -1) {
          this.lstReleasePackage.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.lstReleasePackagegridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.lstReleasePackageEditMode) {
        return;
      }
      let index = this.lstReleasePackage._getIndexOfItem(dataItem);
      if (
        this.lstReleasePackage.staticRowIndex != index &&
        !this.lstReleasePackage._isDataValid()
      ) {
        return;
      }
      if (index > -1) {
        this.lstReleasePackage.Items.splice(index, 1);
        this.lstReleasePackage.Items = this.lstReleasePackage.Items.slice();
        this.lstReleasePackage._closeEditableRow();
      } else {
        this.lstReleasePackage._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.lstReleasePackage.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.lstReleasePackage.editedRowIndex > -1)
        this.lstReleasePackagegridInstance.closeRow(
          this.lstReleasePackage.editedRowIndex
        );
      this.lstReleasePackage.editedRowIndex = -1;
      this.lstReleasePackage.staticRowIndex = -1;
      this.lstReleasePackage.editedRowItem = undefined;
      this.lstReleasePackage.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.lstReleasePackage.Items = [
        ...[dataItem],
        ...this.lstReleasePackage.Items,
      ];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.lstReleasePackage._isDataValid() &&
        this.lstReleasePackage.editedRowIndex == 0 &&
        this.lstReleasePackage.editedRowItem["isNewRow"]
      ) {
        this.lstReleasePackage.removeItem({
          data: this.lstReleasePackage.editedRowItem,
        });
      }
      if (
        !this.lstReleasePackage._isDataValid() &&
        this.lstReleasePackage.staticRowIndex > -1 &&
        this.lstReleasePackage.editedRowItem
      ) {
        const changedObj =
          this.lstReleasePackage.Items[this.lstReleasePackage.staticRowIndex];
        Object.assign(changedObj, this.lstReleasePackage.editedRowItem);
      }
      this.lstReleasePackage._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.lstReleasePackage.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.lstReleasePackage.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.lstReleasePackage.isNewRowPristine) {
        this.lstReleasePackage.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.lstReleasePackageGrid_Group.control]);
      }
      return this.lstReleasePackageGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.lstReleasePackage.removedItems = [];
      this.lstReleasePackage.Items.map((item: any) => {
        if (this.lstReleasePackageDateProperties.length > 0) {
          this.lstReleasePackageDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.lstReleasePackage._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
    },
    _setCheckedAll: () => {
      if (
        this.lstReleasePackage.Items.find(
          (item: any) => item["selected"] == false
        )
      ) {
        this.lstReleasePackage.headerCheckBoxValue = false;
      } else {
        this.lstReleasePackage.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.lstReleasePackage._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.lstReleasePackage.headerCheckBoxValue =
        !this.lstReleasePackage.headerCheckBoxValue;
      this.lstReleasePackage.Items.map((item: any) => {
        item["selected"] = this.lstReleasePackage.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        ...this.lstReleasePackage.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        ...this.lstReleasePackage.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        ...this.lstReleasePackage.removedItems,
      ];
      if (!this.lstReleasePackage._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.lstReleasePackage.editedRowItem["uid"]
        );
        dirtyItemsList.splice(index, 1);
        dirtyItemsList = dirtyItemsList.slice();
      }
      return dirtyItemsList;
    },
    _validatedEditExit: (event) => {
      var isBypassEvent = false;
      if (typeof event !== "boolean") {
        for (var element of event.path) {
          if (element.tagName == "KENDO-CALENDAR") {
            isBypassEvent = true;
            break;
          }
          if (element.tagName == "EXP-DROPDOWNTREEVIEW") {
            isBypassEvent = true;
            break;
          }
        }
        if (isBypassEvent) {
          return;
        }
        if (this.lstReleasePackage._isDataValid())
          this.lstReleasePackage._closeEditableRow();
      }
    },
    _pageChange(event: PageChangeEvent): void {
      this.state.skip = event.skip;
    },
    _newGuid: () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    _getValueByID(datasource, textField, valueField, value) {
      var found = false;
      var text = "";
      for (var item of datasource) {
        if (item[valueField] == value) {
          found = true;
          text = item[textField];
          break;
        }
      }
      if (found) {
        return text;
      }
    },
    _getMultiSelectValues(
      datasource,
      textField,
      valueField,
      dataItem,
      propertyName
    ) {
      if (dataItem[propertyName] && dataItem[propertyName].length > 0) {
        let values = [];
        for (let item of dataItem[propertyName]) {
          values.push(item[textField]);
        }
        return values.toString();
      }
    },
    _getSelectedTreeValue(
      dataSource,
      textField,
      valueField,
      childrenFeild,
      bindedvalue,
      isPrimitve
    ) {
      if (
        dataSource.length == 0 ||
        typeof bindedvalue == "undefined" ||
        bindedvalue == null
      )
        return;
      let tempArray = [];
      if (isPrimitve) {
        dataSource.forEach((dataItem) => {
          tempArray.push(
            this._searchTree(dataItem, bindedvalue, valueField, childrenFeild)
          );
        });
      } else {
        dataSource.forEach((dataItem) => {
          tempArray.push(
            this._searchTree(
              dataItem,
              bindedvalue[valueField],
              valueField,
              childrenFeild
            )
          );
        });
      }

      let selectedTexts = [];
      tempArray.map((item) => {
        if (item) {
          return selectedTexts.push(item[textField]);
        }
      });
      if (selectedTexts.length > 0) {
        return selectedTexts.join(",");
      } else {
        return "--";
      }
    },
    _searchTree(
      item: any,
      valueToSearch: any,
      property: string,
      childrenFeild: string
    ) {
      if (item[property] == valueToSearch) {
        return item;
      } else if (item[childrenFeild] != null) {
        var i;
        var result = null;
        for (i = 0; result == null && i < item[childrenFeild].length; i++) {
          result = this._searchTree(
            item[childrenFeild][i],
            valueToSearch,
            property,
            childrenFeild
          );
        }
        return result;
      }
      return null;
    },
  };
  lstReleasePlans = {
    Items: [],
    state: {
      filter: {
        filters: [],
        logic: "and",
      },
      group: [],
      sort: [],
      skip: 0,
      take: 10,
    },
    isNewRowPristine: false,
    editedRowIndex: -1,
    staticRowIndex: -1,
    editedRowItem: undefined,
    selecteditem: undefined,
    headerCheckBoxValue: false,
    removedItems: [],
    addItem: () => {
      if (!this.lstReleasePlansEditMode) {
        return;
      }
      if (!this.lstReleasePlans._isDataValid()) {
        return;
      }
      this.lstReleasePlans._closeEditableRow();
      let obj = new ReleasePlans();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.lstReleasePlans._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.lstReleasePlans.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.lstReleasePlans._pageChange({ skip: 0, take: 10 });
      this.lstReleasePlans._pushItem(obj);
      this.lstReleasePlans.editedRowIndex = 0;
      this.lstReleasePlans.staticRowIndex = 0;
      this.lstReleasePlans.Items[this.lstReleasePlans.editedRowIndex] = obj;
      this.lstReleasePlans.editedRowItem = obj;
      this.lstReleasePlans.selecteditem = obj;
      this.lstReleasePlans.isNewRowPristine = true;
      this.lstReleasePlansgridInstance.editRow(
        this.lstReleasePlans.editedRowIndex
      );
    },
    _editRowItem: (event) => {
      if (!this.lstReleasePlansEditMode) {
        return;
      }
      let isActionEvent = false;
      let target = event.originalEvent.target;
      if (
        target["tagName"] == "IMG" ||
        target["innerHTML"].indexOf("exp-dropdown-button") > -1 ||
        target["tagName"] == "path" ||
        target["tagName"] == "svg" ||
        target["tagName"] == "DIV"
      )
        isActionEvent = true;
      if (isActionEvent) {
        return;
      }
      if (event.isEdited) {
        return;
      }
      if (this.lstReleasePlans._isDataValid()) {
        this.lstReleasePlans._closeEditableRow();
        this.lstReleasePlans.editedRowItem = Object.assign({}, event.dataItem);
        this.lstReleasePlans.selecteditem = event.dataItem;
        this.lstReleasePlans.editedRowIndex = event.rowIndex;
        let relativeIndex = this.lstReleasePlans._getIndexOfItem(
          event.dataItem
        );
        if (relativeIndex > -1) {
          this.lstReleasePlans.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.lstReleasePlansgridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.lstReleasePlansEditMode) {
        return;
      }
      let index = this.lstReleasePlans._getIndexOfItem(dataItem.data);
      if (
        this.lstReleasePlans.staticRowIndex != index &&
        !this.lstReleasePlans._isDataValid()
      ) {
        return;
      }
      if (index > -1) {
        this.lstReleasePlans.Items.splice(index, 1);
        this.lstReleasePlans.Items = this.lstReleasePlans.Items.slice();
        this.lstReleasePlans._closeEditableRow();
      } else {
        this.lstReleasePlans._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.lstReleasePlans.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.lstReleasePlans.editedRowIndex > -1)
        this.lstReleasePlansgridInstance.closeRow(
          this.lstReleasePlans.editedRowIndex
        );
      this.lstReleasePlans.editedRowIndex = -1;
      this.lstReleasePlans.staticRowIndex = -1;
      this.lstReleasePlans.editedRowItem = undefined;
      this.lstReleasePlans.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.lstReleasePlans.Items = [
        ...[dataItem],
        ...this.lstReleasePlans.Items,
      ];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.lstReleasePlans._isDataValid() &&
        this.lstReleasePlans.editedRowIndex == 0 &&
        this.lstReleasePlans.editedRowItem["isNewRow"]
      ) {
        this.lstReleasePlans.removeItem({
          data: this.lstReleasePlans.editedRowItem,
        });
      }
      if (
        !this.lstReleasePlans._isDataValid() &&
        this.lstReleasePlans.staticRowIndex > -1 &&
        this.lstReleasePlans.editedRowItem
      ) {
        const changedObj =
          this.lstReleasePlans.Items[this.lstReleasePlans.staticRowIndex];
        Object.assign(changedObj, this.lstReleasePlans.editedRowItem);
      }
      this.lstReleasePlans._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.lstReleasePlans.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.lstReleasePlans.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.lstReleasePlans.isNewRowPristine) {
        this.lstReleasePlans.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.lstReleasePlansGrid_Group.control]);
      }
      return this.lstReleasePlansGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.lstReleasePlans.removedItems = [];
      this.lstReleasePlans.Items.map((item: any) => {
        if (this.lstReleasePlansDateProperties.length > 0) {
          this.lstReleasePlansDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.lstReleasePlans._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
    },
    _setCheckedAll: () => {
      if (
        this.lstReleasePlans.Items.find(
          (item: any) => item["selected"] == false
        )
      ) {
        this.lstReleasePlans.headerCheckBoxValue = false;
      } else {
        this.lstReleasePlans.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.lstReleasePlans._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.lstReleasePlans.headerCheckBoxValue =
        !this.lstReleasePlans.headerCheckBoxValue;
      this.lstReleasePlans.Items.map((item: any) => {
        item["selected"] = this.lstReleasePlans.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        ...this.lstReleasePlans.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        ...this.lstReleasePlans.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        ...this.lstReleasePlans.removedItems,
      ];
      if (!this.lstReleasePlans._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.lstReleasePlans.editedRowItem["uid"]
        );
        dirtyItemsList.splice(index, 1);
        dirtyItemsList = dirtyItemsList.slice();
      }
      return dirtyItemsList;
    },
    _validatedEditExit: (event) => {
      var isBypassEvent = false;
      if (typeof event !== "boolean") {
        for (var element of event.path) {
          if (element.tagName == "KENDO-CALENDAR") {
            isBypassEvent = true;
            break;
          }
          if (element.tagName == "EXP-DROPDOWNTREEVIEW") {
            isBypassEvent = true;
            break;
          }
        }
        if (isBypassEvent) {
          return;
        }
        if (this.lstReleasePlans._isDataValid())
          this.lstReleasePlans._closeEditableRow();
      }
    },
    _pageChange(event: PageChangeEvent): void {
      this.state.skip = event.skip;
    },
    _newGuid: () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    _getValueByID(datasource, textField, valueField, value) {
      var found = false;
      var text = "";
      for (var item of datasource) {
        if (item[valueField] == value) {
          found = true;
          text = item[textField];
          break;
        }
      }
      if (found) {
        return text;
      }
    },
    _getMultiSelectValues(
      datasource,
      textField,
      valueField,
      dataItem,
      propertyName
    ) {
      if (dataItem[propertyName] && dataItem[propertyName].length > 0) {
        let values = [];
        for (let item of dataItem[propertyName]) {
          values.push(item[textField]);
        }
        return values.toString();
      }
    },
    _getSelectedTreeValue(
      dataSource,
      textField,
      valueField,
      childrenFeild,
      bindedvalue,
      isPrimitve
    ) {
      if (
        dataSource.length == 0 ||
        typeof bindedvalue == "undefined" ||
        bindedvalue == null
      )
        return;
      let tempArray = [];
      if (isPrimitve) {
        dataSource.forEach((dataItem) => {
          tempArray.push(
            this._searchTree(dataItem, bindedvalue, valueField, childrenFeild)
          );
        });
      } else {
        dataSource.forEach((dataItem) => {
          tempArray.push(
            this._searchTree(
              dataItem,
              bindedvalue[valueField],
              valueField,
              childrenFeild
            )
          );
        });
      }

      let selectedTexts = [];
      tempArray.map((item) => {
        if (item) {
          return selectedTexts.push(item[textField]);
        }
      });
      if (selectedTexts.length > 0) {
        return selectedTexts.join(",");
      } else {
        return "--";
      }
    },
    _searchTree(
      item: any,
      valueToSearch: any,
      property: string,
      childrenFeild: string
    ) {
      if (item[property] == valueToSearch) {
        return item;
      } else if (item[childrenFeild] != null) {
        var i;
        var result = null;
        for (i = 0; result == null && i < item[childrenFeild].length; i++) {
          result = this._searchTree(
            item[childrenFeild][i],
            valueToSearch,
            property,
            childrenFeild
          );
        }
        return result;
      }
      return null;
    },
  };
  ReleasePackage_Delete_Click(e) {
    let variables = {};
  }
  Launch_AddNew_Click(e) {
    let variables = {};
    if (this.SelectedTab == "Plan Factors") {
      this.lstPlanFactors.addItem();
    } else if (this.SelectedTab == "Release Plans") {
      this.appContext.modelID = this.SelectedProdId;
      this.router.navigate(["AddReleasePlan"], {
        queryParamsHandling: "merge",
      });
    } else if (this.SelectedTab == "Plan Packages") {
      this.appContext.modelID = this.SelectedProdId;
      this.router.navigate(["AddPlanPackage"], {
        queryParamsHandling: "merge",
      });
    } else {
      this.appContext.modelID = this.SelectedProdId;
      this.router.navigate(["AddReleasePackage"], {
        queryParamsHandling: "merge",
      });
    }
  }
  ValidatePlanFactorData() {
    let variables = { lstComb: [], tempval: "", colname: "" };
    var i;
    for (i = 0; i < this.lstPlanFactors.data.length; i++) {
      variables.tempval = "";
      let eachrow = this.lstPlanFactors.data[i];
      var j;
      for (j = 0; j < this.lstPlanFactors.columns.length; j++) {
        variables.colname = this.lstPlanFactors.columns[j].Name;
        if (this.cfs.hasValue(eachrow[variables.colname])) {
          variables.tempval += eachrow[variables.colname].split(",");
        } else {
          if (eachrow[variables.colname + "_IsEnabled"] == true) {
            this.IsValidData = true;
          } else {
            this.us.Show("Please Provide Data for all field", "error");
            this.IsValidData = false;
            return;
          }
        }
      }
      var templist = variables.lstComb.filter((item: any) => {
        return item == variables.tempval;
      });
      if (this.cfs.hasValue(templist)) {
        this.IsValidData = false;
        this.us.Show("Duplicate Combination ", "error");
        return;
      } else {
        this.IsValidData = true;
        variables.lstComb.push(variables.tempval);
      }
    }
  }
  GetFactorMapUsedInfo(e) {
    let variables = {};
    if (this.cfs.hasValue(e.factorId)) {
      this.apiServc
        .GetPlanFactorsMap(
          "publishconfig/FactorMapUsedinReleasePackage?id_factmap=" +
            e.factorId,
          {},
          ""
        )
        .subscribe(
          (r) => {
            this.GetFactorMapUsedInfo_Completed(r, variables, e);
          },
          (e) => {
            this.GetFactorMapUsedInfo_ErrorRaised(e, variables);
          }
        );
    } else {
      this.us
        .Confirmation("Are you sure, do you want to delete?")
        .subscribe((x) => {
          if (x) {
            this.lstPlanFactors.removeItem(e);
          }
        });
    }
  }
  private GetFactorMapUsedInfo_ErrorRaised(err, variables) {}
  private GetFactorMapUsedInfo_Completed(response, variables, e) {
    if (response == false) {
      this.us.ConfirmationTemplate(this.DeleteMessage).subscribe((x) => {
        if (x) {
          this.lstPlanFactors.removeItem(e);
        }
      });
    } else {
      this.us.InformationTemplate(this.informationMessage);
    }
  }
  PlanFactor_Save_Click(e) {
    let variables = { lstfactors: [] };
    this.lstPlanFactorsMap = [];
    variables.lstfactors = this.lstPlanFactors.getDirtyItems();
    this.ValidatePlanFactorData();
    if (this.IsValidData) {
      var i;
      for (i = 0; i < variables.lstfactors.length; i++) {
        this.objplanFactorMap = new PlanDeterminationFactorPlanMap();
        this.objplanFactorMap.ModelId = this.SelectedProdId;
        var eachRow = variables.lstfactors[i];
        if (eachRow["mode"] == "added") {
          this.objplanFactorMap.Mode = "New";
          this.objplanFactorMap.Id = 0;
        } else if (eachRow["mode"] == "edited") {
          this.objplanFactorMap.Mode = "Dirty";
          this.objplanFactorMap.Id = eachRow["factorId"];
        } else if (eachRow["mode"] == "removed") {
          this.objplanFactorMap.Mode = "Delete";
          this.objplanFactorMap.Id = eachRow["factorId"];
        }
        this.objplanFactorMap.PlanName = eachRow["PlanName"];
        var j;
        for (j = 0; j < this.lstPlanFactors.columns.length; j++) {
          this.objPlanFactor = new PlanDeterminationFactor();

          var eachcol = this.lstPlanFactors.columns[j];
          if (eachcol.Name != "PlanName") {
            this.objPlanFactor.Name = eachcol.Name;
            this.objPlanFactor.FactorMapping = eachcol.Name;
            if (eachRow[eachcol.Name + "_IsEnabled"] == true) {
              this.objPlanFactor.Value = eachRow[eachcol.Name];
            } else {
              if (this.cfs.hasValue(eachRow[eachcol.Name])) {
                this.objPlanFactor.Value = eachRow[eachcol.Name];
              } else {
                this.us.Show(
                  "Please Provide Data for column" + eachcol.Name,
                  "warning"
                );
              }
            }
            this.objplanFactorMap.PlanDeterminationFactors.push(
              this.objPlanFactor
            );
          }
        }
        this.lstPlanFactorsMap.push(this.objplanFactorMap);
      }
      this.apiServc
        .ManagePlanFactorsMap(
          "publishconfig/manageplanfactorsmap",
          {},
          JSON.stringify(this.lstPlanFactorsMap)
        )
        .subscribe(
          (r) => {
            this.ManagePlanFactorsMap_PlanFactor_Save_ClickCompleted(
              r,
              variables
            );
          },
          (e) => {
            this.ManagePlanFactorsMap_PlanFactor_Save_ClickErrorRaised(
              e,
              variables
            );
          }
        );
    }
  }
  ReleasePackage_Edit_Click(e) {
    let variables = {};
    this.appContext.DataId = e.data.Id;
    this.router.navigate(["AddReleasePackage"], {
      queryParamsHandling: "merge",
    });
  }
  Launch_Tab_Selection_Changed(e) {
    let variables = {};
    console.log(this.SelectedTab);
    if (this.SelectedTab == "Plan Factors") {
      this.ddr_source_ddl65b52e8f23177779876c = [
        { text: "Delete", value: "Delete" },
        { text: "Export", value: "Export" },
        { text: "Delete-Factor", value: "DeleteFactor" },
      ];
      if (this.accesslevel === 1 || this.accesslevel === 2) {
        this.ddr_source_ddl65b52e8f23177779876c.splice(0, 2);
      }
      this.PlanFactorsGridVisibility = true;
      this.ReleasePackagesGridVisibility = false;
      this.ReleasePlansGridVisibility = false;
      this.SearchVisibility = true;
      this.SelectedTabValue = "Plan Factors";
      this.apiServc
        .GetPlanFactorsMap(
          "publishconfig/getplanfactormappings?p_ModelId=" +
            this.appContext.modelID,
          {},
          ""
        )
        .subscribe(
          (r) => {
            this.GetPlanFactorsMap_ActiveProductCompleted(r, variables);
          },
          (e) => {
            this.GetPlanFactorsMap_ActiveProductErrorRaised(e, variables);
          }
        );
    } else if (this.SelectedTab == "Release Packages") {
      this.ddr_source_ddl65b52e8f23177779876c = [
        { text: "Delete", value: "Delete" },
        { text: "Export", value: "Export" },
        { text: "Export Json Only", value: "ExportJson" },
        { text: "Workspace Dependency.", value: "workspace" },
        { text: "Export Bom Package", value: "exportbom" },
      ];
      if (this.accesslevel === 1 || this.accesslevel === 2) {
        this.ddr_source_ddl65b52e8f23177779876c.splice(0, 1);
      }
      this.ReleasePackagesGridVisibility = true;
      this.PlanFactorsGridVisibility = false;
      this.ReleasePlansGridVisibility = false;
      this.SearchVisibility = false;
      // this.appContext.modelID = this.appContext.modelID;
      this.SelectedTabValue = this.SelectedTab;
      this.GetReleasePackagesByModelId();
    } else if (this.SelectedTab == "Plan Packages") {
      this.ddr_source_ddl65b52e8f23177779876c = [
        { text: "Delete", value: "Delete" },
        { text: "Export", value: "Export" },
        { text: "Export Json Only", value: "ExportJson" },
        { text: "Workspace Dependency.", value: "workspace" },
        { text: "Export Bom Package", value: "exportbom" },
      ];
      if (this.accesslevel === 1 || this.accesslevel === 2) {
        this.ddr_source_ddl65b52e8f23177779876c.splice(0, 1);
      }
      this.ReleasePackagesGridVisibility = true;
      this.PlanFactorsGridVisibility = false;
      this.ReleasePlansGridVisibility = false;
      this.SearchVisibility = false;
      // this.appContext.modelID = this.appContext.modelID;
      this.SelectedTabValue = this.SelectedTab;
      this.GetReleasePackagesByModelId();
    } else {
      this.ddr_source_ddl65b52e8f23177779876c = [
        { text: "Delete", value: "Delete" },
      ];
      this.SearchVisibility = false;
      this.SelectedTabValue = this.SelectedTab;
      this.ReleasePackagesGridVisibility = false;
      this.PlanFactorsGridVisibility = false;
      this.ReleasePlansGridVisibility = true;
      this.GetReleasePlansByModelId();
    }
  }
  PlanFactor_AddNew_Click(e) {
    let variables = {};
    //this.appContext.modelID = this.SelectedProdId;
    this.router.navigate(["AddPlanDeterminationFactors"], {
      queryParamsHandling: "merge",
    });
  }
  ActiveProduct(e) {
    let variables = {};
    this.lstPlanFactors.columns = [];
    this.lstPlanFactors.data = [];
    e.isActive = true;
    this.lstProducts.forEach((category) => {
      if (category.Name != e.Name) {
        category.isActive = false;
      }
    });

    this.SelectedProduct = e.Name;
    this.SelectedProdId = e.ModelID;
    this.appContext.ProductName = this.SelectedProduct;
    this.SelectedproductInProducts = e;
    this.appContext.modelID = e.ModelID;
    if (this.SelectedTab == "Plan Factors") {
      this.apiServc
        .GetPlanFactorsMap(
          "publishconfig/getplanfactormappings?p_ModelId=" +
            this.SelectedProdId,
          {},
          ""
        )
        .subscribe(
          (r) => {
            this.GetPlanFactorsMap_ActiveProductCompleted(r, variables);
          },
          (e) => {
            this.GetPlanFactorsMap_ActiveProductErrorRaised(e, variables);
          }
        );
    } else {
      this.apiServc
        .GetReleasePackages(
          "publishconfig/getreleasepackages?p_ModelId=" + this.SelectedProdId,
          {},
          ""
        )
        .subscribe(
          (r) => {
            this.GetReleasePackages_ActiveProductCompleted(r, variables);
          },
          (e) => {
            this.GetReleasePackages_ActiveProductErrorRaised(e, variables);
          }
        );
    }
  }

  private GetAllProducts_OnLoadErrorRaised(err, variables) {}
  private GetAllProducts_OnLoadCompleted(response, variables) {
    this.lstProducts = response;

    //this.ActiveProduct(this.lstProducts[0]);
    if (!isNaN(this.appContext.modelID)) {
      this.SelectedproductInProducts = this.lstProducts.find(
        (item) => item.ModelID == this.appContext.modelID
      );
      this.ActiveProduct(
        this.SelectedproductInProducts === undefined
          ? this.lstProducts[0]
          : this.SelectedproductInProducts
      );
    }
  }
  private GetPlanFactorsMap_OnLoadErrorRaised(err, variables) {}
  private GetPlanFactorsMap_OnLoadCompleted(response, variables) {
    this.lstPlanFactors.columns = response.Columns;
    if (this.cfs.hasValue(response.DataJson)) {
      this.lstPlanFactors.data = JSON.parse(response.DataJson);
    }
    this.lstPlanFactors.initializeGridDataSource();
  }
  private GetReleasePackages_OnLoadErrorRaised(err, variables) {}
  private GetReleasePackages_OnLoadCompleted(response, variables) {
    this.lstReleasePackage.Items = response;
    this.lstReleasePackage.initializeGridDataSource();
  }
  private ManagePlanFactorsMap_PlanFactor_Save_ClickErrorRaised(
    err,
    variables
  ) {}
  private GetPlanFactorsMap_PlanFactor_Save_ClickErrorRaised(err, variables) {}
  private GetPlanFactorsMap_PlanFactor_Save_ClickCompleted(
    response,
    variables
  ) {
    this.lstPlanFactors.columns = response.Columns;
    if (this.cfs.hasValue(response.DataJson)) {
      this.lstPlanFactors.data = JSON.parse(response.DataJson);
    }
    this.lstPlanFactors.initializeGridDataSource();
  }
  private ManagePlanFactorsMap_PlanFactor_Save_ClickCompleted(
    response,
    variables
  ) {
    this.us.Show("Plan Factors Updated Successfully", "success");
    this.router.navigate(["Launch"], { queryParamsHandling: "merge" });
    this.lstPlanFactors.initializeGridDataSource();
    // this.appContext.modelID = this.appContext.modelID;
    // this.apiServc
    //   .GetPlanFactorsMap(
    //     "publishconfig/getplanfactormappings?p_ModelId=" +
    //       this.appContext.modelID,
    //     {},
    //     ""
    //   )
    //   .subscribe(
    //     (r) => {
    //       this.GetPlanFactorsMap_PlanFactor_Save_ClickCompleted(r, variables);
    //     },
    //     (e) => {
    //       this.GetPlanFactorsMap_PlanFactor_Save_ClickErrorRaised(e, variables);
    //     }
    //   );
  }
  private GetReleasePackages_Launch_Tab_Selection_ChangedErrorRaised(
    err,
    variables
  ) {}
  private GetReleasePackages_Launch_Tab_Selection_ChangedCompleted(
    response,
    variables
  ) {
    console.log("Test Launch");
    console.log(response);
    if (this.cfs.hasValue(response)) {
      response.filter((x: any) => {
        this.appContext.UsersList.forEach((x1: any) => {
          if (x.CreatedBy == x1.UserName) {
            x.CreatedBy = x1.DisplayName;
          }
        });
      });
    }
    this.lstReleasePackage.Items = response;
    this.lstReleasePackage.initializeGridDataSource();
  }
  private GetReleasePlans_Launch_Tab_Selection_ChangedErrorRaised(
    err,
    variables
  ) {}
  private GetReleasePlans_Launch_Tab_Selection_ChangedCompleted(
    response,
    variables
  ) {
    console.log(response);
    this.lstReleasePlans.Items = response;
    this.lstReleasePlans.initializeGridDataSource();
  }
  private GetPlanFactorsMap_ActiveProductErrorRaised(err, variables) {}
  private GetPlanFactorsMap_ActiveProductCompleted(response, variables) {
    this.lstPlanFactors.columns = response.Columns;
    if (this.cfs.hasValue(response.DataJson)) {
      this.lstPlanFactors.data = JSON.parse(response.DataJson);
    }
    this.lstPlanFactors.initializeGridDataSource();
  }
  private GetReleasePackages_ActiveProductErrorRaised(err, variables) {}
  private GetReleasePackages_ActiveProductCompleted(response, variables) {
    if (this.cfs.hasValue(response)) {
      response.filter((x: any) => {
        this.appContext.UsersList.forEach((x1: any) => {
          if (x.CreatedBy == x1.UserName) {
            x.CreatedBy = x1.DisplayName;
          }
        });
      });
    }
    this.lstReleasePackage.Items = response;
    this.lstReleasePackage.initializeGridDataSource();
    console.log("Response");
    console.log(this.lstReleasePackage.Items);
  }

  PlanFactor_DeleteFactor_Click(e) {
    let variables = {};
    if (!this.cfs.hasValue(this.detid)) {
      this.us.Information("Please select a factor to delete");
      return;
    }

    let Name = this.FactorNameToDelete;
    let IsFactorDataExist = false;
    let i = 0,
      FactorValue = undefined;
    for (i = 0; i < this.lstPlanFactors.data.length; i++) {
      let FactorRow = this.lstPlanFactors.data[i];
      if (this.cfs.hasValue(FactorRow[Name])) {
        IsFactorDataExist = true;
        FactorValue = FactorRow[Name];
      }
    }
    if (IsFactorDataExist && this.cfs.hasValue(FactorValue)) {
      this.us.Information(
        "Unable to delete the selected determination factor. selected determination factor is used in one or more plan mappings.",
        200,
        400
      );
      return;
    }
    this.apiServc
      .DeletePlanFactorsByPlanModelIdDetID(
        "PublishConfig/deletePlanFactorsByPlanModelId_detid?p_ModelId=" +
          this.SelectedProdId +
          "&id_det=" +
          this.detid,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.DeletePlanFactorsByPlanModelIdDetID_PlanFactor_DeleteFactor_ClickCompleted(
            r,
            variables
          );
        },
        (e) => {
          this.DeletePlanFactorsByPlanModelIdDetID_PlanFactor_DeleteFactor_ClickErrorRaised(
            e,
            variables
          );
        }
      );
  }

  private DeletePlanFactorsByPlanModelIdDetID_PlanFactor_DeleteFactor_ClickCompleted(
    response,
    variables
  ) {
    this.us.Show("Deleted Successfully", "success");
    this.IsPopupVisible = false;
    this.objPlanDeterminationFactor = null;
    this.apiServc
      .GetAllProducts(
        "Product/GetAllProducts?Username=" + this.appContext.username,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetAllProducts_OnLoadCompleted(r, variables);
        },
        (e) => {
          this.GetAllProducts_OnLoadErrorRaised(e, variables);
        }
      );
  }

  private DeletePlanFactorsByPlanModelIdDetID_PlanFactor_DeleteFactor_ClickErrorRaised(
    err,
    variables
  ) {
    this.us.Show("Something went wrong", "warning");
  }

  PlanFactor_Cancel_Click(e) {
    let variables = {};
    this.IsPopupVisible = false;
  }

  OtherActions_SelectionChange(e) {
    let variables = {};
    this.ReleasePackages = null;
    if (this.ActionDropdown == "DeleteFactor") {
      this.apiServc
        .GetPlanFactorsByPlanModelId(
          "PublishConfig/getPlanFactorsByPlanModelId?p_ModelId=" +
            this.SelectedProdId,
          {},
          ""
        )
        .subscribe(
          (r) => {
            this.GetPlanFactorsByPlanModelId_OtherActions_SelectionChangeCompleted(
              r,
              variables
            );
          },
          (e) => {
            this.GetPlanFactorsByPlanModelId_OtherActions_SelectionChangeErrorRaised(
              e,
              variables
            );
          }
        );
    }
    // } else {
    //   this.IsPopupVisible = false;
    // }
    if (this.ActionDropdown == "Delete") {
      if (this.SelectedTabValue == "Release Packages") {
        let relaseId = "";
        this.ReleasePackages = this.lstReleasePackage.getCheckedItems();
        let lstReleasePackageSelectedItems =
          this.lstReleasePackage.getCheckedItems();
        console.log(lstReleasePackageSelectedItems);
        if (
          this.cfs.hasValue(lstReleasePackageSelectedItems) &&
          this.us.Length(lstReleasePackageSelectedItems) > 0
        ) {
          this.us.ConfirmationTemplate(this.DeleteMessage).subscribe((x) => {
            if (x) {
              lstReleasePackageSelectedItems.forEach((selItem) => {
                relaseId += "" + selItem.Id + ",";
              });
              this.DeleteReleasePackageByReleaseId(
                this.appContext.ProductId,
                relaseId
              );
            }
          });
          this.GetReleasePackagesByModelId();
          this.lstReleasePackage.initializeGridDataSource();
        } else {
          this.us.InformationTemplate(this.DeleteEntityInformation);
        }
      } else if (this.SelectedTabValue == "Release Plans") {
        let lstReleasePlanSelectedItems = this.lstReleasePlans
          .getCheckedItems()
          .map(function (elem) {
            return elem.ReleaseId;
          })
          .join(",");
        console.log(lstReleasePlanSelectedItems);
        if (
          this.cfs.hasValue(lstReleasePlanSelectedItems) &&
          this.us.Length(lstReleasePlanSelectedItems) > 0
        ) {
          this.us.ConfirmationTemplate(this.DeleteMessage).subscribe((x) => {
            if (x) {
              this.DeleteReleasePlanByReleaseId(lstReleasePlanSelectedItems);
            }
          });
          this.GetReleasePlansByModelId();
          this.lstReleasePlans.initializeGridDataSource();
        } else {
          this.us.InformationTemplate(this.DeleteEntityInformation);
        }
      } else {
        this.DeleteSelectedPlanFactorsColumns("");
      }
    } else if (this.ActionDropdown == "ExportJson") {
      this.ReleasePackages = this.lstReleasePackage.getCheckedItems();
      this.ReleasePackages.forEach((obj) => {
        this.GenerateReleasePackage(obj, true, false);
      });
    } else if (this.ActionDropdown == "workspace") {
      this.ReleasePackages = this.lstReleasePackage.getCheckedItems();
      this.ReleasePackages.forEach((obj) => {
        this.GenerateReleasePackage(obj, false, true);
      });
    } else if (this.ActionDropdown == "exportbom") {
      //this.ReleasePackages = this.lstReleasePackage.getCheckedItems();
      // this.ReleasePackages.forEach((obj) => {
      //
      //   this.GenerateReleasePackage(obj, false, true);
      // });
      this.exportbompackage();
    }
  }
  exportbompackage() {
    this.context.ModelID = this.SelectedProdId;
    this.context.Model = this.SelectedProduct;

    this.apiServc
      .GenerateBomPackage(
        "publish/generatebompackage?p_ModelId=" +this.context.ModelID,
        {},"")
      .subscribe(
        (response) => {
          var binary_string = window.atob(response);
          var len = binary_string.length;
          var bytes = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
          }
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(
            new Blob([bytes], { type: "application/octet-stream" })
          );
          link.download = this.SelectedProduct + ".zip";
          link.click();
          window.URL.revokeObjectURL(link.href);
        },
        (e) => {
          console.log(e);
        }
      );
  }
  private GetPlanFactorsByPlanModelId_OtherActions_SelectionChangeCompleted(
    response,
    variables
  ) {
    console.log(response);
    if (this.cfs.hasValue(response) && response.length > 0) {
      this.IsPopupVisible = true;
    } else {
      this.us.Information("There are no factors to delete");
    }
    this.objPlanDeterminationFactor = response;
    this.ActiveProduct(this.SelectedproductInProducts);
  }

  private GetPlanFactorsByPlanModelId_OtherActions_SelectionChangeErrorRaised(
    err,
    variables
  ) {
    this.us.Information("There are no factors to delete");
  }

  private DeleteSelectedPlanFactorsColumns(item) {
    if (item != "") {
      this.lstPlanFactors._deleteItem(item);
    } else {
      if (this.lstPlanFactors.getCheckedItems().length > 0) {
        let SelectedItems = this.lstPlanFactors.getCheckedItems();
        SelectedItems.forEach((selectedItem) => {
          this.lstPlanFactors.removeItem(selectedItem);
        });
      } else {
        //this.us.Information("Please Select Record(s) to Delete");
        this.us.InformationTemplate(this.DeleteEntityInformation);
      }
    }
  }

  public ReleasePackageAction_Edit_Click(item) {
    this.appContext.ReleasePackageId = item.Id;
    this.router.navigate(["AddReleasePackage"], {
      queryParamsHandling: "merge",
    });
  }
  public GenerateReleasePackage(
    item,
    isJsonExport: boolean,
    isworkspacedependency: boolean
  ) {
    let variables = { p_id: 0 };
    variables.p_id = item.Id;
    if (this.cfs.hasValue(variables.p_id)) {
      if (
        !this.appContext.IsPackageWebJob ||
        isJsonExport ||
        isworkspacedependency
      ) {
        this.apiServc
          .GenerateReleasePackage(
            "publish/generatepackage?p_ReleaseId=" +
              variables.p_id +
              "&IsJsonExport=" +
              isJsonExport +
              "&isWorkSpacedepency=" +
              isworkspacedependency,
            {},
            ""
          )
          .subscribe(
            (r) => {
              this.GenerateReleasePackage_ChangedCompleted(
                r,
                variables,
                item.Name
              );
            },
            (e) => {
              this.GenerateReleasePackage_ChangedErrorRaised(e, variables);
            }
          );
      } else {
        this.webjobcall(variables.p_id);
      }
    }
  }
  webjobcall(p_id: number) {
    console.log("calling webjob method");
    this.apiServc
      .ImportExportWebJob(
        "triggeredwebjobs/ImportExportJob/run?arguments=import" +
          " " +
          "test" +
          " " +
          true +
          " " +
          false +
          " " +
          p_id +
          " " +
          "test",
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.ImportExportWebJob_WebJobCompleted(r);
        },
        (e) => {
          this.ImportExportWebJob_WebJobErrorRaised(e);
        }
      );
  }

  private ImportExportWebJob_WebJobErrorRaised(err) {}
  private ImportExportWebJob_WebJobCompleted(response) {
    this.getwebjobstatus();
  }
  private getwebjobstatus() {
    console.log("calling webjobimportstatus method");
    this.apiServc
      .getwebjobstatus("triggeredwebjobs/ImportExportJob/", {}, "")
      .subscribe(
        (r) => {
          this.getwebjobstatus_WebJobCompleted(r);
        },
        (e) => {
          this.getwebjobstatus_WebJobErrorRaised(e);
        }
      );
  }
  getwebjobstatus_WebJobErrorRaised(e: any) {
    throw new Error("Method not implemented.");
  }
  getwebjobstatus_WebJobCompleted(resp: any) {
    let timerId;
    console.log(resp);
    if (this.urlcount == 0) {
      this.us.Information(
        " Log Url - " + resp.body.latest_run.output_url,
        200,
        600
      );
      this.urlcount++;
    }

    if (resp.body.latest_run.status == "Running") {
      timerId = setTimeout(() => {
        this.getwebjobstatus();
      }, 20000);
    } else if (resp.body.latest_run.status == "Initializing") {
      timerId = setTimeout(() => {
        this.getwebjobstatus();
      }, 20000);
    } else if (resp.body.latest_run.status == "Failed") {
      this.us.Show("Plan packages generation failed.", "failed");
    } else if (resp.body.latest_run.status == "Success") {
      clearTimeout(timerId);
      this.us.Show("Plan package generated successfully.", "success");
    }
  }
  private GenerateReleasePackage_ChangedCompleted(
    response,
    variables,
    Name: string
  ) {
    this.us.Show("Downloaded Successfully", "success");
    this.cfs.ExportFiles(response, null, Name, "json");
  }
  private GenerateReleasePackage_ChangedErrorRaised(err, variables) {}
  public ReleasePackageAction_Delete_Click(item) {
    let relaseId = "" + item.Id + ",";
    this.us.ConfirmationTemplate(this.DeleteMessage).subscribe((x) => {
      if (x) {
        this.lstReleasePackage.removeItem(item);
        this.lstReleasePackage.initializeGridDataSource();
        this.DeleteReleasePackageByReleaseId(
          this.appContext.ProductId,
          relaseId
        );
      }
    });
  }

  public GetReleasePackagesByModelId() {
    let variables = {};
    this.apiServc
      .GetReleasePackages(
        "publishconfig/getreleasepackages?p_ModelId=" + this.SelectedProdId,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetReleasePackages_Launch_Tab_Selection_ChangedCompleted(
            r,
            variables
          );
        },
        (e) => {
          this.GetReleasePackages_Launch_Tab_Selection_ChangedErrorRaised(
            e,
            variables
          );
        }
      );
  }
  public GetReleasePlansByModelId() {
    let variables = {};
    this.SelectedProdId = !this.cfs.hasValue(this.SelectedProdId)
      ? this.appContext.modelID
      : this.SelectedProdId;
    this.apiServc
      .GetReleasePlans(
        "publish/getreleaseplansbymodel?p_ModelId=" + this.SelectedProdId,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetReleasePlans_Launch_Tab_Selection_ChangedCompleted(
            r,
            variables
          );
        },
        (e) => {
          this.GetReleasePlans_Launch_Tab_Selection_ChangedErrorRaised(
            e,
            variables
          );
        }
      );
  }
  public DeleteReleasePackageByReleaseId(modelId, releaseId) {
    let variables = {};
    this.apiServc
      .DeleteReleasePackageByReleaseId(
        "publishconfig/DeleteReleasePackageByReleaseId?p_ReleaseId=" +
          releaseId,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.DeleteReleasePackageByReleaseId_Completed(r, variables);
        },
        (e) => {
          this.DeleteReleasePackageByReleaseId_ErrorRaised(e, variables);
        }
      );
  }
  private DeleteReleasePackageByReleaseId_Completed(err, variables) {
    this.us.Show("Deleted Successfully", "success");
    this.GetReleasePackagesByModelId();
    this.lstReleasePackage.initializeGridDataSource();
  }
  private DeleteReleasePackageByReleaseId_ErrorRaised(err, variables) {}

  DeleteFactorNameSelectionChange(e) {
    this.FactorNameToDelete = this.objPlanDeterminationFactor.find(
      (obj) => obj.Id == e
    ).Name;
  }

  ReleasePackageViewClick(e) {
    let editItem = e.data;
    this.appContext.ReleasePackageId = editItem.Id;
    this.appContext.isViewMode = true;
    this.router.navigate(["AddReleasePackage"], {
      queryParamsHandling: "merge",
    });
  }
  public ReleasePlanAction_Delete_Click(item) {
    let releaseId = item.ReleaseId;
    this.us.ConfirmationTemplate(this.DeleteMessage).subscribe((x) => {
      if (x) {
        this.lstReleasePlans.removeItem(item);
        this.lstReleasePlans.initializeGridDataSource();
        this.DeleteReleasePlanByReleaseId(releaseId);
      }
    });
  }
  public DeleteReleasePlanByReleaseId(releaseId) {
    let variables = {};
    this.apiServc
      .DeleteReleasePlanByReleaseId(
        "publish/DeleteReleasePlanByReleaseId?p_ReleaseId=" + releaseId,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.DeleteReleasePlanByReleaseId_Completed(r, variables);
        },
        (e) => {
          this.DeleteReleasePlanByReleaseId_ErrorRaised(e, variables);
        }
      );
  }
  private DeleteReleasePlanByReleaseId_Completed(err, variables) {
    this.us.Show("Deleted Successfully", "success");
    this.GetReleasePlansByModelId();
    this.lstReleasePlans.initializeGridDataSource();
  }
  private DeleteReleasePlanByReleaseId_ErrorRaised(err, variables) {}
}
