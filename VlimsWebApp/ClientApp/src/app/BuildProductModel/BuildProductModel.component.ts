import { Component, OnInit, ViewChild } from "@angular/core";
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
import { process } from "@progress/kendo-data-query";

import {
  DataBindingDirective,
  DataStateChangeEvent,
  GridComponent,
  PageChangeEvent,
  RowArgs,
  SelectableSettings,
} from "@progress/kendo-angular-grid";
import { TooltipDirective } from "@progress/kendo-angular-tooltip";
import {
  BOType,
  BomObject,
  BomFactor,
  BomFactorGroup,
  BOMDesignModel,
  AttributeTypes,
  EntityNavDetails,
  WhereUsedEntity,
  DefinitionContext,
  Attachment,
  WorkSpaceDetailsModel,
} from "src/app/models/models";
declare var $: any;
@Component({
  selector: "exp-container-BuildProductModel",
  templateUrl: "./BuildProductModel.component.html"

})
export class BuildProductModelComponent
  implements OnInit, CanComponentDeactivate
{
  validationMessages: string[] = [];
  subscription: Subscription = new Subscription();
  canDeactivate(): boolean {
    return !this.BuildProductModelForm.dirty; //this.BuildProductModelForm.valid &&
  }
  @ViewChild("BuildProductModelForm", null) BuildProductModelForm: NgForm;
  @ViewChild("formsecb34e1ad7a59c25011331", null)
  public formsecb34e1ad7a59c25011331: NgModelGroup;
  @ViewChild("formsec140260b8a2f7179b3b6d", null)
  public formsec140260b8a2f7179b3b6d: NgModelGroup;
  @ViewChild("botypeslistgridInstance", null)
  public botypeslistgridInstance: GridComponent;
  @ViewChild("botypeslistGrid_Group", null)
  @ViewChild(DataBindingDirective, null) dataBinding: DataBindingDirective;
  public botypeslistGrid_Group: NgModelGroup;
  @ViewChild("bomlistgridInstance", null)
  public bomlistgridInstance: GridComponent;
  @ViewChild("bomlistGrid_Group", null) public bomlistGrid_Group: NgModelGroup;
  @ViewChild("bomfactorlistgridInstance", null)
  public bomfactorlistgridInstance: GridComponent;
  @ViewChild("bomfactorlistGrid_Group", null)
  public bomfactorlistGrid_Group: NgModelGroup;
  @ViewChild("fglistgridInstance", null)
  public fglistgridInstance: GridComponent;
  @ViewChild("fglistGrid_Group", null) public fglistGrid_Group: NgModelGroup;
  @ViewChild('attributetypeslistgridInstance', null)
  @ViewChild('attributetypeslistGrid_Group', null)
  public attributetypeslistGrid_Group: NgModelGroup;
  public attributetypeslistgridInstance: GridComponent;
  type: string = "model";
  modelId: number = 0;
  bomid: string = "";
  bomobj = new BomObject();
  isfgvisible: boolean = false;
  isfactorvisible: boolean = false;
  factorid: string = "";
  factorobj = new BomFactor();
  factorgroupobj = new BomFactorGroup();
  bomtype: string = "";
  botypeslistDateProperties = [];
  attributetypeslistDateProperties = [];
  botypeslistEditMode: boolean = false;
  otheractions_selected: string = null;
  IsImport: boolean = false;
  ddr_source_ddlf0997205077f57fedbe1: any = [];
  public ddlf0997205077f57fedbe1_defaultItem = {
    text: "Select",
    value: null,
  };
  removeUrlfileupload94e366f5efee95f64fea: string =
    this.apiServc.serverconfig.getBaseUrl("") + "";

  public selectableSettings1: SelectableSettings = {
      enabled: true
  };
  public factorSelection: string[] = [];
  public factorGroupSelection: string[] = [];
  FgId: any;
  isFgModify: boolean = false;
  EnableControls: boolean = false;
  isFactorModify: boolean = false;
  factorEnableControls: boolean = false;
  IsWhereUsed:boolean = false;
  public gridData: any[];
  public factorGridData: any[];

  public mySelection: string[] = ["BO"];
  public myFgSelection: string[] = [];

  public selectableSettings(): SelectableSettings {
    return { mode: "single", checkboxOnly: false, enabled: true };
  }
  public isRowSelected = (e: RowArgs): boolean => {
    let bomtypes = [];
    if (e.dataItem.BOName == "BO") {
      bomtypes.push(e.dataItem.BOName);
      this.mySelection.indexOf(bomtypes[0]) > 0;
    }
    return true;
  };
  public ddr_source_ddl1efa082b8436bfba3d45 = [
    { text: "UserInput", value: "UserInput" },
    { text: "Derived", value: "Derived" },
  ];
  public ddl1efa082b8436bfba3d45_defaultItem = { text: "Select", value: null };
  public ddr_source_ddl0630f38b6876b6ed7e70 = [
    { text: "String", value: "String" },
    { text: "Integer", value: "Integer" },
    { text: "Decimal", value: "Decimal" },
    { text: "Boolean", value: "Boolean" },
    { text: "DateTime", value: "DateTime" },
  ];
  public ddl0630f38b6876b6ed7e70_defaultItem = { text: "Select", value: null };
  public ddr_source_ddl4022078ac76b6d36c3fd = [
    { text: "Yes", value: "Yes" },
    { text: "No", value: "No" },
  ];
  public ddl4022078ac76b6d36c3fd_defaultItem = { text: "Select", value: null };
  public ddr_source_ddldac9a31dd3f39a89ba45 = [
    { text: "Yes", value: "Yes" },
    { text: "No", value: "No" },
  ];
  public ddldac9a31dd3f39a89ba45_defaultItem = { text: "Select", value: null };
  public ddr_source_ddleba828a7ddd7cbd8c946 = [
    { text: "Yes", value: "Yes" },
    { text: "No", value: "No" },
  ];
  public ddleba828a7ddd7cbd8c946_defaultItem = { text: "Select", value: null };
  public type_default = { text: "Select", value: null };
  public ChangeType = [
    { text: "Risk", value: "Risk" },
    { text: "Risk Extension", value: "Risk Extension" },
    { text: "Coverage", value: "Coverage" },
    { text: "Form", value: "Form" },
    { text: "Schedule", value: "Schedule" },
    { text: "Endorsement", value: "Endorsement" }
  ];

  //public isRowSelected = (e: RowArgs) => this.fglist.Items.indexOf(e.dataItem.FgId) >= 0;

  @ViewChild(TooltipDirective, null)
  public tooltipDir_eddg3bcc1459a7dfed476c9c: TooltipDirective;
  public showTooltip_eddg3bcc1459a7dfed476c9c(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (
      (element.className === "k-input" ||
        element.className === "dropdown-toggle" ||
        element.nodeName === "TH") &&
      element.offsetWidth < element.scrollWidth
    ) {
      this.tooltipDir_eddg3bcc1459a7dfed476c9c.toggle(element);
    } else {
      this.tooltipDir_eddg3bcc1459a7dfed476c9c.hide();
    }
  }
  fglistDateProperties = [];
  fglistEditMode: boolean = false;
  objProductDetails = new BOMDesignModel();
  attributetypeslistEditMode: boolean = false;
  BuilderMode: any
  FactoGroupContext: Attachment[] = [];
  FactorGroupName:any

  @ViewChild(TooltipDirective, null)
  public tooltipDir_eddg1a1445df75ab6f3a40b2: TooltipDirective;
  public showTooltip_eddg1a1445df75ab6f3a40b2(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (
      (element.className === "k-input" ||
        element.className === "dropdown-toggle" ||
        element.nodeName === "TH") &&
      element.offsetWidth < element.scrollWidth
    ) {
      this.tooltipDir_eddg1a1445df75ab6f3a40b2.toggle(element);
    } else {
      this.tooltipDir_eddg1a1445df75ab6f3a40b2.hide();
    }
  }
  bomfactorlistDateProperties = [];
  bomfactorlistEditMode: boolean = false;
  @ViewChild(TooltipDirective, null)
  public tooltipDir_eddgdcb2453d9b1ab11c1c75: TooltipDirective;
  public showTooltip_eddgdcb2453d9b1ab11c1c75(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (
      (element.className === "k-input" ||
        element.className === "dropdown-toggle" ||
        element.nodeName === "TH") &&
      element.offsetWidth < element.scrollWidth
    ) {
      this.tooltipDir_eddgdcb2453d9b1ab11c1c75.toggle(element);
    } else {
      this.tooltipDir_eddgdcb2453d9b1ab11c1c75.hide();
    }
  }
  public ddr_source_ddl9d78035cabd3101f02bc = [
    { text: "Single", value: "Single" },
    { text: "Multiple", value: "Multiple" },
  ];
  public cardianlityMultiple= [
    { text: "Multiple", value: "Multiple" },
  ];
  public ddl9d78035cabd3101f02bc_defaultItem = { text: "Select", value: null };
  public parent_defaultItem = { text: "Select", value: null };


  //WhereUsed
  @ViewChild("WhereUsedGridObjgridInstance", null)
  public WhereUsedGridObjgridInstance: GridComponent;
  @ViewChild("WhereUsedGridObjGrid_Group", null)
  public WhereUsedGridObjGrid_Group: NgModelGroup;
  WhereUsedGridObjDateProperties = ["DependentEntityModified_Date"];
  WhereUsedGridObjEditMode: boolean = false;
  Type:any
  AlgoDefContext = new DefinitionContext();
  FactorGroupId: any
  AlgoDefId:any


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
    title.setTitle("BuildProductModel");
  }
  ngOnInit() {
    let variables = {};
    this.bomtype='BO'
    this.ddr_source_ddlf0997205077f57fedbe1 = [
      { text: "Import product structure", value: "Import" },
    ];
    this.GetProductById();
    this.getfactorgroups(true);
  }

  botypeslist = {
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
      if (!this.botypeslistEditMode) {
        return;
      }
      if (!this.botypeslist._isDataValid()) {
        return;
      }
      this.botypeslist._closeEditableRow();
      let obj = new BOType();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.botypeslist._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.botypeslist.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.botypeslist._pageChange({ skip: 0, take: 10 });
      this.botypeslist._pushItem(obj);
      this.botypeslist.editedRowIndex = 0;
      this.botypeslist.staticRowIndex = 0;
      this.botypeslist.Items[this.botypeslist.editedRowIndex] = obj;
      this.botypeslist.editedRowItem = obj;
      this.botypeslist.selecteditem = obj;
      this.botypeslist.isNewRowPristine = true;
      this.botypeslistgridInstance.editRow(this.botypeslist.editedRowIndex);
    },
    _editRowItem: (event) => {
      if (!this.botypeslistEditMode) {
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
      if (this.botypeslist._isDataValid()) {
        this.botypeslist._closeEditableRow();
        this.botypeslist.editedRowItem = Object.assign({}, event.dataItem);
        this.botypeslist.selecteditem = event.dataItem;
        this.botypeslist.editedRowIndex = event.rowIndex;
        let relativeIndex = this.botypeslist._getIndexOfItem(event.dataItem);
        if (relativeIndex > -1) {
          this.botypeslist.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.botypeslistgridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.botypeslistEditMode) {
        return;
      }
      let index = this.botypeslist._getIndexOfItem(dataItem.data);
      if (
        this.botypeslist.staticRowIndex != index &&
        !this.botypeslist._isDataValid()
      ) {
        return;
      }
      if (index > -1) {
        this.botypeslist.Items.splice(index, 1);
        this.botypeslist.Items = this.botypeslist.Items.slice();
        this.botypeslist._closeEditableRow();
      } else {
        this.botypeslist._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.botypeslist.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.botypeslist.editedRowIndex > -1)
        this.botypeslistgridInstance.closeRow(this.botypeslist.editedRowIndex);
      this.botypeslist.editedRowIndex = -1;
      this.botypeslist.staticRowIndex = -1;
      this.botypeslist.editedRowItem = undefined;
      this.botypeslist.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.botypeslist.Items = [...[dataItem], ...this.botypeslist.Items];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.botypeslist._isDataValid() &&
        this.botypeslist.editedRowIndex == 0 &&
        this.botypeslist.editedRowItem["isNewRow"]
      ) {
        this.botypeslist.removeItem({ data: this.botypeslist.editedRowItem });
      }
      if (
        !this.botypeslist._isDataValid() &&
        this.botypeslist.staticRowIndex > -1 &&
        this.botypeslist.editedRowItem
      ) {
        const changedObj =
          this.botypeslist.Items[this.botypeslist.staticRowIndex];
        Object.assign(changedObj, this.botypeslist.editedRowItem);
      }
      this.botypeslist._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.botypeslist.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.botypeslist.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.botypeslist.isNewRowPristine) {
        this.botypeslist.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.botypeslistGrid_Group.control]);
      }
      return this.botypeslistGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.botypeslist.removedItems = [];
      this.botypeslist.Items.map((item: any) => {
        if (this.botypeslistDateProperties.length > 0) {
          this.botypeslistDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.botypeslist._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
    },
    _setCheckedAll: () => {
      if (
        this.botypeslist.Items.find((item: any) => item["selected"] == false)
      ) {
        this.botypeslist.headerCheckBoxValue = false;
      } else {
        this.botypeslist.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.botypeslist._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.botypeslist.headerCheckBoxValue =
        !this.botypeslist.headerCheckBoxValue;
      this.botypeslist.Items.map((item: any) => {
        item["selected"] = this.botypeslist.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        ...this.botypeslist.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        ...this.botypeslist.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        ...this.botypeslist.removedItems,
      ];
      if (!this.botypeslist._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.botypeslist.editedRowItem["uid"]
        );
        dirtyItemsList.splice(index, 1);
        dirtyItemsList = dirtyItemsList.slice();
      }
      return dirtyItemsList;
    },
    _validatedEditExit: (event) => {
      var isBypassEvent = false;
      if (typeof event !== "boolean") {
        if (this.cfs.hasValue(event.path)) {
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
        }
        if (isBypassEvent) {
          return;
        }
        if (this.botypeslist._isDataValid())
          this.botypeslist._closeEditableRow();
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

  bomfactorlist = {
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
      if (!this.bomfactorlistEditMode) {
        return;
      }
      if (!this.bomfactorlist._isDataValid()) {
        return;
      }
      this.bomfactorlist._closeEditableRow();
      let obj = new BomFactor();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.bomfactorlist._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.bomfactorlist.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.bomfactorlist._pageChange({ skip: 0, take: 10 });
      this.bomfactorlist._pushItem(obj);
      this.bomfactorlist.editedRowIndex = 0;
      this.bomfactorlist.staticRowIndex = 0;
      this.bomfactorlist.Items[this.bomfactorlist.editedRowIndex] = obj;
      this.bomfactorlist.editedRowItem = obj;
      this.bomfactorlist.selecteditem = obj;
      this.bomfactorlist.isNewRowPristine = true;
      this.bomfactorlistgridInstance.editRow(this.bomfactorlist.editedRowIndex);
    },
    _editRowItem: (event) => {
      if (!this.bomfactorlistEditMode) {
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
      if (this.bomfactorlist._isDataValid()) {
        this.bomfactorlist._closeEditableRow();
        this.bomfactorlist.editedRowItem = Object.assign({}, event.dataItem);
        this.bomfactorlist.selecteditem = event.dataItem;
        this.bomfactorlist.editedRowIndex = event.rowIndex;
        let relativeIndex = this.bomfactorlist._getIndexOfItem(event.dataItem);
        if (relativeIndex > -1) {
          this.bomfactorlist.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.bomfactorlistgridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.bomfactorlistEditMode) {
        return;
      }
      let index = this.bomfactorlist._getIndexOfItem(dataItem.data);
      if (
        this.bomfactorlist.staticRowIndex != index &&
        !this.bomfactorlist._isDataValid()
      ) {
        return;
      }
      if (index > -1) {
        this.bomfactorlist.Items.splice(index, 1);
        this.bomfactorlist.Items = this.bomfactorlist.Items.slice();
        this.bomfactorlist._closeEditableRow();
      } else {
        this.bomfactorlist._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.bomfactorlist.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.bomfactorlist.editedRowIndex > -1)
        this.bomfactorlistgridInstance.closeRow(
          this.bomfactorlist.editedRowIndex
        );
      this.bomfactorlist.editedRowIndex = -1;
      this.bomfactorlist.staticRowIndex = -1;
      this.bomfactorlist.editedRowItem = undefined;
      this.bomfactorlist.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.bomfactorlist.Items = [...[dataItem], ...this.bomfactorlist.Items];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.bomfactorlist._isDataValid() &&
        this.bomfactorlist.editedRowIndex == 0 &&
        this.bomfactorlist.editedRowItem["isNewRow"]
      ) {
        this.bomfactorlist.removeItem({
          data: this.bomfactorlist.editedRowItem,
        });
      }
      if (
        !this.bomfactorlist._isDataValid() &&
        this.bomfactorlist.staticRowIndex > -1 &&
        this.bomfactorlist.editedRowItem
      ) {
        const changedObj =
          this.bomfactorlist.Items[this.bomfactorlist.staticRowIndex];
        Object.assign(changedObj, this.bomfactorlist.editedRowItem);
      }
      this.bomfactorlist._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.bomfactorlist.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.bomfactorlist.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.bomfactorlist.isNewRowPristine) {
        this.bomfactorlist.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.bomfactorlistGrid_Group.control]);
      }
      return this.bomfactorlistGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.bomfactorlist.removedItems = [];
      this.bomfactorlist.Items.map((item: any) => {
        if (this.bomfactorlistDateProperties.length > 0) {
          this.bomfactorlistDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.bomfactorlist._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
    },
    _setCheckedAll: () => {
      if (
        this.bomfactorlist.Items.find((item: any) => item["selected"] == false)
      ) {
        this.bomfactorlist.headerCheckBoxValue = false;
      } else {
        this.bomfactorlist.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.bomfactorlist._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.bomfactorlist.headerCheckBoxValue =
        !this.bomfactorlist.headerCheckBoxValue;
      this.bomfactorlist.Items.map((item: any) => {
        item["selected"] = this.bomfactorlist.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        ...this.bomfactorlist.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        ...this.bomfactorlist.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        ...this.bomfactorlist.removedItems,
      ];
      if (!this.bomfactorlist._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.bomfactorlist.editedRowItem["uid"]
        );
        dirtyItemsList.splice(index, 1);
        dirtyItemsList = dirtyItemsList.slice();
      }
      return dirtyItemsList;
    },
    _validatedEditExit: (event) => {
      var isBypassEvent = false;
      if (typeof event !== "boolean") {
        if (this.cfs.hasValue(event.path)) {
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
        }
        if (isBypassEvent) {
          return;
        }
        if (this.bomfactorlist._isDataValid())
          this.bomfactorlist._closeEditableRow();
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
  fglist = {
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
      if (!this.fglistEditMode) {
        return;
      }
      if (!this.fglist._isDataValid()) {
        return;
      }
      this.fglist._closeEditableRow();
      let obj = new BomFactorGroup();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.fglist._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.fglist.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.fglist._pageChange({ skip: 0, take: 10 });
      this.fglist._pushItem(obj);
      this.fglist.editedRowIndex = 0;
      this.fglist.staticRowIndex = 0;
      this.fglist.Items[this.fglist.editedRowIndex] = obj;
      this.fglist.editedRowItem = obj;
      this.fglist.selecteditem = obj;
      this.fglist.isNewRowPristine = true;
      this.fglistgridInstance.editRow(this.fglist.editedRowIndex);
    },
    _editRowItem: (event) => {
      if (!this.fglistEditMode) {
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
      if (this.fglist._isDataValid()) {
        this.fglist._closeEditableRow();
        this.fglist.editedRowItem = Object.assign({}, event.dataItem);
        this.fglist.selecteditem = event.dataItem;
        this.fglist.editedRowIndex = event.rowIndex;
        let relativeIndex = this.fglist._getIndexOfItem(event.dataItem);
        if (relativeIndex > -1) {
          this.fglist.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.fglistgridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.fglistEditMode) {
        return;
      }
      let index = this.fglist._getIndexOfItem(dataItem.data);
      if (this.fglist.staticRowIndex != index && !this.fglist._isDataValid()) {
        return;
      }
      if (index > -1) {
        this.fglist.Items.splice(index, 1);
        this.fglist.Items = this.fglist.Items.slice();
        this.fglist._closeEditableRow();
      } else {
        this.fglist._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.fglist.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.fglist.editedRowIndex > -1)
        this.fglistgridInstance.closeRow(this.fglist.editedRowIndex);
      this.fglist.editedRowIndex = -1;
      this.fglist.staticRowIndex = -1;
      this.fglist.editedRowItem = undefined;
      this.fglist.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.fglist.Items = [...[dataItem], ...this.fglist.Items];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.fglist._isDataValid() &&
        this.fglist.editedRowIndex == 0 &&
        this.fglist.editedRowItem["isNewRow"]
      ) {
        this.fglist.removeItem({ data: this.fglist.editedRowItem });
      }
      if (
        !this.fglist._isDataValid() &&
        this.fglist.staticRowIndex > -1 &&
        this.fglist.editedRowItem
      ) {
        const changedObj = this.fglist.Items[this.fglist.staticRowIndex];
        Object.assign(changedObj, this.fglist.editedRowItem);
      }
      this.fglist._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.fglist.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.fglist.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.fglist.isNewRowPristine) {
        this.fglist.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.fglistGrid_Group.control]);
      }
      return this.fglistGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.fglist.removedItems = [];
      this.fglist.Items.map((item: any) => {
        if (this.fglistDateProperties.length > 0) {
          this.fglistDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.fglist._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
    },
    _setCheckedAll: () => {
      if (this.fglist.Items.find((item: any) => item["selected"] == false)) {
        this.fglist.headerCheckBoxValue = false;
      } else {
        this.fglist.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.fglist._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.fglist.headerCheckBoxValue = !this.fglist.headerCheckBoxValue;
      this.fglist.Items.map((item: any) => {
        item["selected"] = this.fglist.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        ...this.fglist.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        ...this.fglist.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        ...this.fglist.removedItems,
      ];
      if (!this.fglist._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.fglist.editedRowItem["uid"]
        );
        dirtyItemsList.splice(index, 1);
        dirtyItemsList = dirtyItemsList.slice();
      }
      return dirtyItemsList;
    },
    _validatedEditExit: (event) => {
      var isBypassEvent = false;
      if (typeof event !== "boolean") {
        if (this.cfs.hasValue(event.path)) {
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
        }
        if (isBypassEvent) {
          return;
        }
        if (this.fglist._isDataValid()) this.fglist._closeEditableRow();
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
  attributetypeslist = {
    Items: [],
    state: {
      filter: {
        filters: [],
        logic: "and"
      },
      group: [],
      sort: [],
      skip: 0,
      take: 10
    },
    isNewRowPristine: false,
    editedRowIndex: -1,
    staticRowIndex: -1,
    editedRowItem: undefined,
    selecteditem: undefined,
    headerCheckBoxValue: false,
    removedItems: [],
    addItem: () => {
    if (!this.attributetypeslistEditMode) {
        return;
      }
      if (!this.attributetypeslist._isDataValid()) { return; };
      this.attributetypeslist._closeEditableRow();
      let obj = new AttributeTypes();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.attributetypeslist._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.attributetypeslist.state = { filter: { filters: [], logic: "and" }, group: [], skip: 0, sort: [], take: 10 };
      this.attributetypeslist._pageChange({ skip: 0, take: 10 });
      this.attributetypeslist._pushItem(obj);
      this.attributetypeslist.editedRowIndex = 0;
      this.attributetypeslist.staticRowIndex = 0;
      this.attributetypeslist.Items[this.attributetypeslist.editedRowIndex] = obj;
      this.attributetypeslist.editedRowItem = obj;
      this.attributetypeslist.selecteditem = obj;
      this.attributetypeslist.isNewRowPristine = true;
      this.attributetypeslistgridInstance.editRow(this.attributetypeslist.editedRowIndex);
    },
    _editRowItem: (event) => {
      if (!this.attributetypeslistEditMode) {
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
      if (this.attributetypeslist._isDataValid()) {
        this.attributetypeslist._closeEditableRow();
        this.attributetypeslist.editedRowItem = Object.assign({}, event.dataItem);
        this.attributetypeslist.selecteditem = event.dataItem;
        this.attributetypeslist.editedRowIndex = event.rowIndex;
        let relativeIndex = this.attributetypeslist._getIndexOfItem(event.dataItem);
        if (relativeIndex > -1) {
          this.attributetypeslist.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow)
          event.dataItem.mode = "EDITED";
        this.attributetypeslistgridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.attributetypeslistEditMode) {
        return;
      }
      let index = this.attributetypeslist._getIndexOfItem(dataItem.data);
      if (this.attributetypeslist.staticRowIndex != index && !this.attributetypeslist._isDataValid()) {
        return;
      }
      if (index > -1) {
        this.attributetypeslist.Items.splice(index, 1);
        this.attributetypeslist.Items = this.attributetypeslist.Items.slice();
        this.attributetypeslist._closeEditableRow();
      } else {
        this.attributetypeslist._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.attributetypeslist.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.attributetypeslist.editedRowIndex > -1)
        this.attributetypeslistgridInstance.closeRow(this.attributetypeslist.editedRowIndex);
      this.attributetypeslist.editedRowIndex = -1;
      this.attributetypeslist.staticRowIndex = -1;
      this.attributetypeslist.editedRowItem = undefined;
      this.attributetypeslist.selecteditem=undefined;
    },
    _pushItem: (dataItem: any) => {
      this.attributetypeslist.Items = [...[dataItem], ...this.attributetypeslist.Items];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (!this.attributetypeslist._isDataValid() && this.attributetypeslist.editedRowIndex == 0 && this.attributetypeslist.editedRowItem["isNewRow"]) {
        this.attributetypeslist.removeItem({ data: this.attributetypeslist.editedRowItem});
      }
      if (!this.attributetypeslist._isDataValid() && this.attributetypeslist.staticRowIndex > -1 && this.attributetypeslist.editedRowItem) {
        const changedObj = this.attributetypeslist.Items[this.attributetypeslist.staticRowIndex];
        Object.assign(changedObj, this.attributetypeslist.editedRowItem);
      }
      this.attributetypeslist._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.attributetypeslist.Items.filter((item: any) => { return item["selected"] });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.attributetypeslist.Items.findIndex((x: any) => x["uid"] == dataItem["uid"]);
    },
    _isDataValid: () => {
    if (this.attributetypeslist.isNewRowPristine) {
        this.attributetypeslist.isNewRowPristine = false;
      } else {
      this.vs.ValidateSections([this.attributetypeslistGrid_Group.control]);
      }
      return this.attributetypeslistGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.attributetypeslist.removedItems = [];
      this.attributetypeslist.Items.map((item: any) => {
      if (this.attributetypeslistDateProperties.length > 0) {
          this.attributetypeslistDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          })
        }
       item["isDirtyRow"] = false;
        item["uid"] = this.attributetypeslist._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      })
    },
    _setCheckedAll: () => {
      if (this.attributetypeslist.Items.find((item: any) => item["selected"] == false)) {
        this.attributetypeslist.headerCheckBoxValue = false;
      } else {
        this.attributetypeslist.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.attributetypeslist._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.attributetypeslist.headerCheckBoxValue = !this.attributetypeslist.headerCheckBoxValue;
      this.attributetypeslist.Items.map((item: any) => {
        item["selected"] = this.attributetypeslist.headerCheckBoxValue;
      })

    },
    getDirtyItems: () => {
    let dirtyItemsList = [...this.attributetypeslist.Items.filter((item: any) => { return item["isNewRow"] == true }),
      ...this.attributetypeslist.Items.filter((item: any) => { return item["isNewRow"] == false && item["isDirtyRow"] == true }),
      ...this.attributetypeslist.removedItems];
      if (!this.attributetypeslist._isDataValid()) {
        let index = dirtyItemsList.findIndex((x: any) => x["uid"] == this.attributetypeslist.editedRowItem["uid"]);
        dirtyItemsList.splice(index, 1);
        dirtyItemsList = dirtyItemsList.slice();
      }
      return dirtyItemsList;
    },
    _validatedEditExit: (event) => {
    var isBypassEvent = false;
      if (typeof (event) !== "boolean") {
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
      if (this.attributetypeslist._isDataValid())
        this.attributetypeslist._closeEditableRow();
    }
    },
    _pageChange(event: PageChangeEvent): void {
      this.state.skip = event.skip;
    },
    _newGuid:()=>{
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    },
    _getValueByID(datasource, textField,valueField,value) {
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
    _getMultiSelectValues(datasource, textField, valueField, dataItem, propertyName) {
      if (dataItem[propertyName] && dataItem[propertyName].length > 0) {
       let values=[];
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
      }else{
        return "--"
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
    }
  };
  WhereUsedGridObj = {
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
      if (!this.WhereUsedGridObjEditMode) {
        return;
      }
      if (!this.WhereUsedGridObj._isDataValid()) {
        return;
      }
      this.WhereUsedGridObj._closeEditableRow();
      let obj = new WhereUsedEntity();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.WhereUsedGridObj._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.WhereUsedGridObj.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.WhereUsedGridObj._pageChange({ skip: 0, take: 10 });
      this.WhereUsedGridObj._pushItem(obj);
      this.WhereUsedGridObj.editedRowIndex = 0;
      this.WhereUsedGridObj.staticRowIndex = 0;
      this.WhereUsedGridObj.Items[this.WhereUsedGridObj.editedRowIndex] = obj;
      this.WhereUsedGridObj.editedRowItem = obj;
      this.WhereUsedGridObj.selecteditem = obj;
      this.WhereUsedGridObj.isNewRowPristine = true;
      this.WhereUsedGridObjgridInstance.editRow(
        this.WhereUsedGridObj.editedRowIndex
      );
    },
    _editRowItem: (event) => {
      if (!this.WhereUsedGridObjEditMode) {
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
      if (this.WhereUsedGridObj._isDataValid()) {
        this.WhereUsedGridObj._closeEditableRow();
        this.WhereUsedGridObj.editedRowItem = Object.assign({}, event.dataItem);
        this.WhereUsedGridObj.selecteditem = event.dataItem;
        this.WhereUsedGridObj.editedRowIndex = event.rowIndex;
        let relativeIndex = this.WhereUsedGridObj._getIndexOfItem(
          event.dataItem
        );
        if (relativeIndex > -1) {
          this.WhereUsedGridObj.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.WhereUsedGridObjgridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.WhereUsedGridObjEditMode) {
        return;
      }
      let index = this.WhereUsedGridObj._getIndexOfItem(dataItem.data);
      if (
        this.WhereUsedGridObj.staticRowIndex != index &&
        !this.WhereUsedGridObj._isDataValid()
      ) {
        return;
      }
      if (index > -1) {
        this.WhereUsedGridObj.Items.splice(index, 1);
        this.WhereUsedGridObj.Items = this.WhereUsedGridObj.Items.slice();
        this.WhereUsedGridObj._closeEditableRow();
      } else {
        this.WhereUsedGridObj._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.WhereUsedGridObj.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.WhereUsedGridObj.editedRowIndex > -1)
        this.WhereUsedGridObjgridInstance.closeRow(
          this.WhereUsedGridObj.editedRowIndex
        );
      this.WhereUsedGridObj.editedRowIndex = -1;
      this.WhereUsedGridObj.staticRowIndex = -1;
      this.WhereUsedGridObj.editedRowItem = undefined;
      this.WhereUsedGridObj.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.WhereUsedGridObj.Items = [
        ...[dataItem],
        ...this.WhereUsedGridObj.Items,
      ];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.WhereUsedGridObj._isDataValid() &&
        this.WhereUsedGridObj.editedRowIndex == 0 &&
        this.WhereUsedGridObj.editedRowItem["isNewRow"]
      ) {
        this.WhereUsedGridObj.removeItem({
          data: this.WhereUsedGridObj.editedRowItem,
        });
      }
      if (
        !this.WhereUsedGridObj._isDataValid() &&
        this.WhereUsedGridObj.staticRowIndex > -1 &&
        this.WhereUsedGridObj.editedRowItem
      ) {
        const changedObj =
          this.WhereUsedGridObj.Items[this.WhereUsedGridObj.staticRowIndex];
        Object.assign(changedObj, this.WhereUsedGridObj.editedRowItem);
      }
      this.WhereUsedGridObj._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.WhereUsedGridObj.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.WhereUsedGridObj.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.WhereUsedGridObj.isNewRowPristine) {
        this.WhereUsedGridObj.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.WhereUsedGridObjGrid_Group.control]);
      }
      return this.WhereUsedGridObjGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.WhereUsedGridObj.removedItems = [];
      this.WhereUsedGridObj.Items.map((item: any) => {
        if (this.WhereUsedGridObjDateProperties.length > 0) {
          this.WhereUsedGridObjDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.WhereUsedGridObj._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
      this.WhereUsedGridObj.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 1//this.appContext.PageSize,
      };
      this.WhereUsedGridObj._pageChange({
        skip: 0,
        take:1// this.appContext.PageSize,
      });
    },
    _setCheckedAll: () => {
      if (
        this.WhereUsedGridObj.Items.find(
          (item: any) => item["selected"] == false
        )
      ) {
        this.WhereUsedGridObj.headerCheckBoxValue = false;
      } else {
        this.WhereUsedGridObj.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.WhereUsedGridObj._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.WhereUsedGridObj.headerCheckBoxValue =
        !this.WhereUsedGridObj.headerCheckBoxValue;
      this.WhereUsedGridObj.Items.map((item: any) => {
        item["selected"] = this.WhereUsedGridObj.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        ...this.WhereUsedGridObj.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        ...this.WhereUsedGridObj.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        ...this.WhereUsedGridObj.removedItems,
      ];
      if (!this.WhereUsedGridObj._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.WhereUsedGridObj.editedRowItem["uid"]
        );
        dirtyItemsList.splice(index, 1);
        dirtyItemsList = dirtyItemsList.slice();
      }
      return dirtyItemsList;
    },
    _validatedEditExit: (event) => {
      var isBypassEvent = false;
      if (typeof event !== "boolean") {
      if(this.cfs.hasValue(event.path)) {
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
      }
        if (isBypassEvent) {
          return;
        }
        if (this.WhereUsedGridObj._isDataValid())
          this.WhereUsedGridObj._closeEditableRow();
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
  getfactors(e) {
    let variables = {};
    this.apiServc
      .GetBomFactor(
        "Model/GetBomFactor?p_FgId=" + this.factorgroupobj.FgId,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetBomFactor_getfactorsCompleted(r, variables);
        },
        (e) => {
          this.GetBomFactor_getfactorsErrorRaised(e, variables);
        }
      );
  }
  botypeclick(e) {
    let variables = {};
    this.getfactorgroups(true);
  }
  bomfgclick(e) {
    debugger;
    let variables = {};
    this.isfgvisible = true;
    this.isfactorvisible = false;
    this.factorgroupobj = e.data;
  }
  bomfactorclick(e) {
    debugger;
    let variables = {};
    this.isfgvisible = false;
    this.isfactorvisible = true;
    this.factorobj = e.data;
  }
  getfactorgroups(e) {
    let variables = {};
    this.apiServc
      .GetGridDataForBomDesign(
        "Model/GetGridDataForBomDesign?p_type=" +
          this.bomtype +
          "&p_ModelId=" +
          this.appContext.modelID,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetGridDataForBomDesign_getfactorgroupsCompleted(r, variables);
        },
        (e) => {
          this.GetGridDataForBomDesign_getfactorgroupsErrorRaised(e, variables);
        }
      );
  }
  getbomtypes(e) {
    let variables = {};
    this.apiServc.GetBomTypes("Model/GetBomTypes", {}, "").subscribe(
      (r) => {
        this.GetBomTypes_getbomtypesCompleted(r, variables);
      },
      (e) => {
        this.GetBomTypes_getbomtypesErrorRaised(e, variables);
      }
    );
  }

  private GetBomFactor_getfactorsErrorRaised(err, variables) {}
  private GetBomFactor_getfactorsCompleted(response, variables) {
    debugger;
    this.bomfactorlist.Items = response;
    this.factorGridData = response
    this.factorobj = response[0];
  }
  private GetGridDataForBomDesign_getfactorgroupsErrorRaised(err, variables) {}
  private GetGridDataForBomDesign_getfactorgroupsCompleted(
    response,
    variables
  ) {
    this.fglist.Items = response;
    this.gridData= this.fglist.Items

    //this.factorgroupobj = response[0];
    // let fgs=[]
    // fgs.push(this.factorgroupobj.FgId)
    // this.myFgSelection=fgs

    //this.getfactors(true);
  }
  private GetBomTypes_getbomtypesErrorRaised(err, variables) {}
  private GetBomTypes_getbomtypesCompleted(response, variables) {
    debugger;
    let bomtypes = [];
    bomtypes.push(response);
    this.botypeslist.Items = bomtypes;
    //this.typeSelectionChange(bomtypes[0].BOName)
    this.bomtype = bomtypes[0].BOName;
    this.getfactorgroups(true);
  }
  GetProductById() {
    if (this.appContext.modelID > 0) {
      this.apiServc
        .GetProductInfoById(
          "Product/GetProduct?modelId=" + this.appContext.modelID,
          {},
          ""
        )
        .subscribe(
          (r) => {
            this.GetProductById_Completed(r);
          },
          (e) => {
            this.GetProductById_ErrorRaised(e);
          }
        );
    } else {
    }
  }
  GetProductById_Completed(response) {
    this.objProductDetails = response;
    //this.appContext.HederString = this.objProductDetails.DisplayName;
  }
  GetProductById_ErrorRaised(e) {}
  BackClick(e) {
    this.router.navigate(["BOMProducts"], { queryParamsHandling: "merge" });
  }
  typeSelectionChange(e) {}
  fgSelectionChange(e) {
    debugger;
    console.log(e);
    this.factorgroupobj = e.selectedRows[0].dataItem;
    this.factorgroupobj.OldFGName = this.factorgroupobj.FactorGroupName
    this.isfgvisible = true;
    this.isfactorvisible = false;
    this.resetControls();
    this.factorSelection=[]
    this.getfactors(true);

  }

  factorSelectionChange(e) {
    this.resetControls();
    console.log(e);
    //this.factorgroupobj.FgId = e.selectedRows[0].dataItem.FgId;

    this.isfgvisible = false;
    this.isfactorvisible = true;

    this.factorobj = e.selectedRows[0].dataItem;

  }

  OtherActions_Selection_Change(e) {
    let variables = {};
    if (this.otheractions_selected == "Import") {
      this.IsImport = true;
    }
    //this.appContext.ChangeType = ApplicationConstants.Risk;
    // this.apiServc
    //   .ExportProductModel(
    //     "Model/ExportProductModel?workspaceId=" +
    //       this.appContext.workspaceId+"&plvid="+"" +
    //       "&Type=" +
    //       this.appContext.ChangeType,
    //     {},
    //     ""
    //   )
    //   .subscribe(
    //     (r) => {
    //       this.ExportProductModel_OtherActions_Selection_ChangeCompleted(
    //         r,
    //         variables
    //       );
    //     },
    //     (e) => {
    //       this.ExportProductModel_OtherActions_Selection_ChangeErrorRaised(
    //         e,
    //         variables
    //       );
    //     }
    //   );
  }

  ImportModelCancel(e) {
    this.IsImport = false;
    this.otheractions_selected = null;
  }

  ImportModelSuccessClick(e) {
    let variables = {};
    this.us.Show("Data Imported Successfully", "success");
    this.IsImport = false;
    //this.GetAllChanges(true);
  }
  OnFileUploadError(e) {
    let variables = {};
    this.IsImport = false;
    this.otheractions_selected = null;
    //this.us.Information(this.cfs.GetErrorMessages(e.response), 190, 360);
  }

  get UploadSaveUrlfileupload94e366f5efee95f64fea(): string {
    // return (
    //   this.apiServc.serverconfig.getBaseUrl("baseurl_Model") +
    //   "Model/ImportProductModel?p_workSpaceId=" +
    //   this.appContext.workspaceId +
    //   "&type=" +
    //   this.appContext.ChangeType +
    //   "&ProductId=" +
    //   this.appContext.modelID +
    //   "&UserId=" +
    //   this.appContext.username +
    //   ""
    // );
    return null;
  }
  AddFactorGroups(e) {
    // if(this.cfs.hasValue(this.formsecb34e1ad7a59c25011331)) {
    //   this.formsecb34e1ad7a59c25011331.reset();
    // }
    this.resetControls();
    let variables = {};
    this.factorgroupobj = new BomFactorGroup();
    this.isfgvisible = true;
    this.isfactorvisible = false;
    this.EnableControls = true;
    this.isFgModify = true;
    this.factorGroupSelection=[]
    this.bomfactorlist.Items=[]


  }
  SubmitFactorGroup(e) {
    if (this.factorgroupobj.Type == "Form") {
      this.factorgroupobj.Cardinality = "Multiple";
    } else if (
      this.factorgroupobj.Type == "Endorsement" ||
      this.factorgroupobj.Type == "Coverage"
    ) {
      this.factorgroupobj.Cardinality = "Single";
    }

    if (!this.factorgroupobj.Cardinality) {
      // this.us.Information(
      //   "Mandatory Input cannot be Null. Once you fill in mandatory Information. You will be able to save your work.",
      //   186,
      //   350
      // );
      return;
    }
    let variables={}
    // this.apiServc.UpdateBomName("Model/UpdateBomName?p_UserName=" + this.appContext.username, {},
    // JSON.stringify(this.factorgroupobj)).subscribe(
    //   (r) => {
    //     this.UpdateBomName_Completed(r, variables);
    //   },
    //   (e) => {
    //     this.UpdateBomName_ErrorRaised(e, variables);
    //   }
    // );
  }
  UpdateBomName_Completed(r, variables) {
    if(r==true && this.factorgroupobj.FgId != "") {
      this.us.Show("Updated name successfully", "success");
      this.getfactorgroups(true);
      this.resetControls();
      this.isfgvisible=false
      this.factorGroupSelection=[]

    }

  }
  UpdateBomName_ErrorRaised(e, variables) { }
  AddFactors(e) {
    let variables = {};
    this.resetControls();
    this.factorobj = new BomFactor();
    this.isfgvisible = false;
    this.isfactorvisible = true;
    this.isFactorModify = true;
    this.factorEnableControls = true;
    this.factorSelection=[]
  }
  BackFG_Click(e) {
    this.isfgvisible = false;
    this.factorSelection=[]
    this.resetControls();
  }
  resetControls() {
    this.isFgModify = false;
    this.EnableControls = false;
    this.isFactorModify = false;
    this.factorEnableControls = false;
  }

  BackFactor_Click(e) {
    this.isfactorvisible = false;
    this.factorSelection=[]
  }
  public isDisabled(args) {
    return {
      "k-disabled": args.dataItem.UnitsOnOrder === 0,
    };
  }
  FgModify(e) {
    this.isFgModify = true;
    this.EnableControls = true;
  }
  FactorModify(e) {
    this.isFactorModify = true;
    this.factorEnableControls = true;
  }
  FGWhereUsed(e) {
    debugger

  if(this.cfs.hasValue(this.factorgroupobj.FgId)) {
    this.IsWhereUsed=true
    this.appContext.ChangeName = this.factorgroupobj.FgDisplayName;
  this.appContext.DefinationId = this.factorgroupobj.FgId;
  this.appContext.DataId = this.factorgroupobj.FgId; //Deff_Id
  // let Workspace_ID = this.factorgroupobje.data.Workspace_ID;
  // this.appContext.workspaceId = Workspace_ID;
  //this.appContext.SelectedTab = this.selectedParentType;
  let variables = {
    routeName: "",
    selectedChange: "",
    data: new EntityNavDetails(),
  };
  variables.selectedChange = this.factorgroupobj.Type;
  //this.appContext.ChangeType = e.data.Type; //Deff_Id
  this.appContext.ChangeName = this.factorgroupobj.FgDisplayName;
  variables.data.ID = this.appContext.DefinationId;
  variables.data.Type = this.appContext.ChangeType;
  variables.data.Name = this.appContext.ChangeName;
  // variables.data.RouteName = "BOMWhereUsed";
  variables.data.isBOM=true
  this.appContext.isViewMode = true;
  this.appContext.ChangeType = "MODEL";
  this.WhereUsedFlow()
    // this.router.navigate(["BOMWhereUsed"], { queryParamsHandling:"merge"});
  }
  else {
    // this.us.Information(
    //   "Select one factor group to proceed to Where Used ",
    //   186,
    //   350
    // );
    return;
  }
  }
  WhereUsedCancel(e) {
    this.IsWhereUsed = false;
    this.otheractions_selected = null;
  }
  WhereUsedFlow() {
    if (this.appContext.ChangeType.toUpperCase() == "MODEL") {
      this.Type = "Model";
    }
    else if (this.appContext.ChangeType.toUpperCase() == "PRODUCT CHOICE") {
      this.Type = "ProductChoices";
    }
    else if (this.appContext.ChangeType.toUpperCase() == "RULE") {
      this.Type = "Computations";
    } else if (this.appContext.ChangeType.toUpperCase() == "ATTRIBUTES") {
      this.Type = "Attributes";
    }
    this.GetWhereUsedBomData();
  }
  // GetWhereUsedBomStructure() {
  //   let variables={}
  //   this.apiServc
  //     .GetWhereUsedBomStructure(
  //       "Initiatives/GetWhereUsedBomStructure?deff_ID=" +
  //         this.appContext.DefinationId +
  //         "&type=" +
  //         this.Type,
  //       {},
  //       ""
  //     )
  //     .subscribe(
  //       (r) => {
  //         this.GetWhereUsedBomStructure_Completed(r, variables);
  //       },
  //       (e) => {
  //         this.GetWhereUsedBomStructure_ErrorRaised(e, variables);
  //       }
  //     );

  // }

  // GetWhereUsedBomStructure_Completed(response, variables){
  //   debugger
  //   this.MainCategoryTypes = response.filter((item) => (item.DisplayName == "Model")|| (item.DisplayName == "Computations")||(item.DisplayName == "ProductChoices"));
  //   //this.MainCategoryTypes = response;

  //   if (this.cfs.hasValue(this.appContext.SelectedMainCategory)) {
  //     var index = this.MainCategoryTypes.findIndex(
  //       (item) => item.DisplayName === this.appContext.SelectedMainCategory
  //     );
  //     this.MainCategoryTypes[index].isActive = true;
  //     this.SelectedMainCatType = this.appContext.SelectedMainCategory;
  //   } else {
  //     this.MainCategoryTypes[0].isActive = true;
  //     this.SelectedMainCatType = this.MainCategoryTypes[0].DisplayName;
  //   }
  //   this.DeffID = this.MainCategoryTypes[0].ID;
  //   if (this.appContext.IsAttributeWhereused) {
  //     this.hiddenColumns = [];
  //     this.hiddenColumns1 = [];
  //     this.hideColumn1("Change Group");
  //   } else {
  //     if (
  //       this.SelectedMainCatType == "Pricer" ||
  //       this.SelectedMainCatType == "Computations"
  //     ) {
  //       this.hiddenColumns = [];
  //     } else {
  //       this.hideColumn("Rule block");
  //     }
  //   }

  //   this.GetWhereUsedBomData(true);
  // }
  // GetWhereUsedBomStructure_ErrorRaised(e, variables) {}

  GetWhereUsedBomData() {
    let variables = {};
    // this.apiServc
    //   .GetWhereUsedBomDetails(
    //     "Initiatives/GetWhereUsedBomDetails?deff_ID=" +
    //       this.appContext.DataId +
    //       "&type=" +
    //       this.Type +
    //       "&whereUsedIn=" +
    //       this.Type,
    //     {},
    //     ""
    //   )
    //   .subscribe(
    //     (r) => {
    //       this.GetWhereUsedBomDetails_Completed(r, variables);
    //     },
    //     (e) => {
    //       this.GetWhereUsedBomDetails_ErrorRaised(e, variables);
    //     }
    //   );
  }
  GetWhereUsedBomDetails_Completed(response, variables ) {
    debugger
    // if (this.cfs.hasValue(response)) {
    //   response.filter((x: any) => {
    //     x.DependentEntityModifiedBy = this.cfs.GetUserDisplayName(
    //       x.DependentEntityModifiedBy
    //     );
    //   });

    //   this.WhereUsedGridObj.Items = response;
    //   debugger
    //   this.WhereUsedGridObj.initializeGridDataSource();
    // }
    debugger
    this.WhereUsedGridObj.Items = response;
    this.WhereUsedGridObj.initializeGridDataSource();

  }
  GetWhereUsedBomDetails_ErrorRaised(e, variables) {}
  ChangeName_LinkClick(e) {

    this.appContext.DataId = e.data.Deff_Id;
    this.appContext.CommonData[0] = {
      Type: e.data.DependentEntityType,
    };
    this.appContext.workspaceId = e.data.WorkspaceId;
    this.appContext.isViewMode = true;
    this.GetRulesDefinationInfo(e);
  }
  GetRulesDefinationInfo(e = true) {
    let variables = {};
    this.apiServc
      .GetRulesDefinationInfo(
        "Rules/GetRule?wrkspaceID=" +
          this.appContext.workspaceId +
          "&ruleId=" +
          this.appContext.DataId,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetRuleDefinationAndSubmitClick_OnloadCompleted(e, r, variables);
        },
        (e) => {
          this.GetRulesDefinationInfo_OnLoadErrorRaised(e, variables);
        }
      );
  }
  private GetRuleDefinationAndSubmitClick_OnloadCompleted(
    e,
    response,
    variables
  ) {
    debugger
    this.AlgoDefContext.RuleDefinition.FactorgroupId = response.FactorgroupId
    this.AlgoDefContext.RuleDefinition.Name = response.Name
    this.AlgoDefContext.RuleDefinition.Id = response.Id
    this.AlgoDefContext.RuleDefinition.tableType = response.tableType
    this.AlgoDefContext.RuleDefinition.BusinessObject = response.BusinessObject


    // rulesresponse.Name = response.Name;
    // rulesresponse.FactorgroupId =
    //   this.AlgoDefContext.RuleDefinition.FactorgroupId;
    // rulesresponse.ContextType = this.AlgoDefContext.RuleDefinition.ContextType;
    // rulesresponse.DisplayName = this.AlgoDefContext.RuleDefinition.DisplayName;
    // rulesresponse.Description = this.AlgoDefContext.RuleDefinition.Description;
    // rulesresponse.Dimensions = this.AlgoDefContext.RuleDefinition.Dimensions;

    // var SelectedContexts = new Array<Attachment>();
    // if (this.AlgoDefContext.RuleDefinition.Attachments.length > 0) {
    //   this.AlgoDefContext.RuleDefinition.Attachments.forEach((element: any) => {
    //     let attach: Attachment = new Attachment();
    //     attach.Id = element.ID;
    //     attach.FactorGroupName = element.FactorGroupName;
    //     SelectedContexts.push(attach);
    //   });
    //   this.AlgoDefContext.RuleDefinition.Attachments = SelectedContexts;
    //   rulesresponse.Attachments =
    //     this.AlgoDefContext.RuleDefinition.Attachments;
    // }

    // this.AlgoDefContext.RuleDefinition = rulesresponse;
    // this.AlgoDefContext.RuleDefinition.ModeType == "Dirty";
    this.FactorGroupId = response.FactorgroupId;
    this.AlgoDefId = response.Id;
    // if (this.AlgoDefContext.RuleDefinition.DataId != "") {
    //   this.BuilderMode = "Dirty";
    // } else {
    //   this.BuilderMode = "New";
    // }

    // this.ddr_source_ddl2cdca94c2a066f81a4df = [
    //   { text: "Premium Calculation", value: "PremiumCalculation" },
    //   { text: "Premium Rollups", value: "PremiumRollups" },
    //   { text: "Common Rating / Classification", value: "CommonRating" },
    //   { text: "Error Messages", value: "ErrorMessages" },
    //   { text: "Policy Indicator", value: "PolicyIndicator" },
    //   { text: "Stat Reporting", value: "StatReporting" },
    //   { text: "Others", value: "Others" },
    // ];

    // if (
    //   this.AlgoDefContext.RuleDefinition.WorkspaceId == null ||
    //   this.AlgoDefContext.RuleDefinition.WorkspaceId == ""
    // ) {
    //   this.AlgoDefContext.Ctx.WorkspaceId = this.appContext.workspaceId;
    // } else {
    //   this.AlgoDefContext.Ctx.WorkspaceId =
    //     this.AlgoDefContext.RuleDefinition.WorkspaceId;
    // }
    this.AlgoDefContext.RuleDefinition.ContextType = response.ContextType.replace(" ", "");
    this.apiServc
      .GetFactorGroupByType(
        "Bom/GetFactorGroupsByType?p_productId=" +
          this.appContext.modelID +
          "&type=" +
          this.AlgoDefContext.RuleDefinition.ContextType.replace(" ", "") +
          "&p_isworkspace=true" ,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetFactorGroupByType_OnLoadCompletedForGetAndSubmit(
            e,
            r,
            variables
          );
        },
        (e) => {
          this.GetFactorGroupByType_OnLoadErrorRaised(e, variables);
        }
      );
    //this.setCategoryForRuleType();
  }

  private GetRulesDefinationInfo_OnLoadErrorRaised(err, variables) {}
  private GetFactorGroupByType_OnLoadCompletedForGetAndSubmit(
    e,
    response,
    variables
  ) {
    this.FactoGroupContext = response;

    var fgrpData = this.FactoGroupContext.find(
      (x) => x.FactorGroupId == this.FactorGroupId
    );
    this.FactorGroupName = fgrpData.FactorGroupName;
    // this.FactorGroupName =
    //   this.AlgoDefContext.RuleDefinition.BusinessObject.find(
    //     (x) => x.secondaryContext == false
    //   ).FactorGroup.factorGroupName;
    // this.AlgoDefContext.RuleDefinition.Id = this.AlgoDefId;
    //this.BuilderMode = this.AlgoDefContext.ProductRuleDef.Mode;
    // var SelectedContexts = new Array<string>();
    // let attach = Array<WorkSpaceDetailsModel>();
    // if (this.AlgoDefContext.RuleDefinition.Attachments == null) {
    //   if (
    //     this.AlgoDefContext.RuleDefinition.Attachments == null ||
    //     this.AlgoDefContext.RuleDefinition.Attachments == undefined ||
    //     this.AlgoDefContext.RuleDefinition.Attachments.length == 0
    //   ) {
    //     let wrks = this.WorkspaceDetailsModel.find(
    //       (w) => (w.ID = this.appContext.workspaceId)
    //     );
    //     this.AlgoDefContext.RuleDefinition.Attachments = wrks;
    //   }
    // } else {
    //   this.AlgoDefContext.RuleDefinition.Attachments.forEach(
    //     (data: Attachment) => {
    //       let wrks = this.WorkspaceDetailsModel.find((w) => w.ID == data.Id);

    //       attach.push(wrks);
    //     }
    //   );
    //   this.AlgoDefContext.RuleDefinition.Attachments = attach;
    // }
    this.AlgoDefContext.RuleDefinition.ModeType = "Dirty";
    // if (e == true) {
    //   this.SubmitClick(e);
    // } else {
      this.OpenAlgoBuilder(e);
    //}
  }
  private GetFactorGroupByType_OnLoadErrorRaised(err, variables) {}
  OpenAlgoBuilder(e: any, dataId = "") {
    let variables = {};
    let stateUrl = "";
    // if (this.appContext.appSettings.baseUrl) {
    //   stateUrl =
    //     window.location.origin + "/" + this.appContext.appSettings.baseUrl;
    // } else {
    //   stateUrl = window.location.origin;
    // }
    this.BuilderMode = this.appContext.DefinationId !=""?"Dirty":"New"
    // if (
    //   this.cfs.hasValue(this.AlgoDefContext.RuleDefinition.Dimensions) &&
    //   this.us.Length(this.AlgoDefContext.RuleDefinition.Dimensions) > 0
    // ) {
    //   if (this.cfs.hasValue(dataId)) {
    //     this.BuilderMode = "Dirty";
    //   } else {
    //     this.BuilderMode = "New";
    //   }
    //   if (
    //     this.AlgoDefContext.Ctx.WorkspaceId == null ||
    //     this.AlgoDefContext.Ctx.WorkspaceId == "" ||
    //     this.AlgoDefContext.Ctx.WorkspaceId ==
    //       "00000000-0000-0000-0000-000000000000"
    //   ) {
    //     this.AlgoDefContext.Ctx.WorkspaceId = this.appContext.workspaceId;
    //   }
    //   //new url navigation technique
    //   var url1 =
    //     "/AlgorithmBuilder?mid=" +
    //     this.appContext.modelID +
    //     "&wrkid=" +
    //     this.appContext.workspaceId +
    //     "&algname=" +
    //     this.AlgoDefContext.RuleDefinition.Name +
    //     "&algid=" +
    //     this.AlgoDefContext.RuleDefinition.Id +
    //     "&type=Risk&dataid=" +
    //     dataId +
    //     "&fgname=" +
    //     this.FactorGroupName +
    //     "&fgid=" +
    //     this.FactorGroupId +
    //     "&mde=" +
    //     this.BuilderMode +
    //     "&DefCtg=" +
    //     this.AlgoDefContext.RuleDefinition.Type +
    //     "&tbltype=" +
    //     this.AlgoDefContext.RuleDefinition.tableType +
    //     "&vmode=" +
    //     this.appContext.isViewMode +
    //     "&dimensionmode=true"+
    //   "&workspaceids=" +  this.appContext.workspaceId
    //   //this.mworkspaceids(true);

    //   // localStorage.setItem(
    //   //   "dimensions",
    //   //   JSON.stringify(this.AlgoDefContext.RuleDefinition.Dimensions)
    //   // );
    //   // JSON.stringify(this.AlgoDefContext.RuleDefinition.Dimensions);
    //   url1 = stateUrl + url1;
    //   window.open(url1, "_blank");
    //   //this.router.navigateByUrl(url1);
    // } else {
      var url =
        "/AlgorithmBuilder?mid=" +
        this.appContext.modelID +
        "&wrkid=" +
        this.appContext.workspaceId +
        "&algname=" +
        this.AlgoDefContext.RuleDefinition.Name +
        "&algid=" +
        this.AlgoDefContext.RuleDefinition.Id +
        "&type=PlanFormula&dataid=" +
        this.appContext.DataId +
        "&fgname=" +
        this.AlgoDefContext.RuleDefinition.BusinessObject.find(
          (x) => x.secondaryContext == false
        ).FactorGroup.factorGroupName +
        "&fgid=" +
        this.AlgoDefContext.RuleDefinition.FactorgroupId +
        "&mde=" +
        this.BuilderMode +
        "&DefCtg=" +
        this.AlgoDefContext.RuleDefinition.Type +
        "&tbltype=" +
        this.AlgoDefContext.RuleDefinition.tableType +
        "&vmode=" +
        "true" +
        "&dimensionmode=false" +
        "&workspaceids=" +this.appContext.workspaceId
        //this.mworkspaceids(true);

      url = stateUrl + url;
      window.open(url, "_blank");
    //}
  }

  public onFilter(inputValue: string): void {
    this.fglist.Items = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "FactorGroupName",
            operator: "contains",
            value: inputValue,
          }
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

  public onFilterFactors(inputValue: string): void {
    this.bomfactorlist.Items = process(this.factorGridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "FName",
            operator: "contains",
            value: inputValue,
          }
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
}

