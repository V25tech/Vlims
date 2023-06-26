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
  PlanDetail,
  PlanFactors,
  UnifiedPlanVersion,
  ReleasePackage,
  PlanVersionDeterminationFactor,
  ReleasePackageEditApproveInitaitivesInfo,
} from "src/app/models/models";
import { THIS_EXPR, variable } from "@angular/compiler/src/output/output_ast";
import { parse } from "querystring";

@Component({
  selector: "exp-container-AddReleasePackage",
  templateUrl: "./AddReleasePackage.component.html",
})
export class AddReleasePackageComponent
  implements OnInit, CanComponentDeactivate
{
  validationMessages: string[] = [];
  subscription: Subscription = new Subscription();
  canDeactivate(): boolean {
    return !this.AddReleasePackageForm.dirty; //this.AddReleasePackageForm.valid &&
  }
  @ViewChild("AddReleasePackageForm", null) AddReleasePackageForm: NgForm;
  @ViewChild("formsec14b84bee020a8c1eef47", null)
  public formsec14b84bee020a8c1eef47: NgModelGroup;
  @ViewChild("formsec702575441c7537f8ae95", null)
  public formsec702575441c7537f8ae95: NgModelGroup;
  @ViewChild("lstPlanMappingsgridInstance", null)
  public lstPlanMappingsgridInstance: GridComponent;
  @ViewChild("lstPlanMappingsGrid_Group", null)
  public lstPlanMappingsGrid_Group: NgModelGroup;
  @ViewChild("InformationMessage_ReleasePackage", { static: true })
  InformationMessage_ReleasePackage: TemplateRef<any>;
  @ViewChild("DeleteEntity_Information", { static: true })
  DeleteEntityInformation: TemplateRef<any>;
  lstPlans: PlanDetail[] = [];
  lstPlanFactors: PlanFactors[] = [];
  lstfilPlanFactors: PlanFactors[] = [];
  lstplanVersions: UnifiedPlanVersion[] = [];
  lstfilPlanVersions: UnifiedPlanVersion[] = [];
  lstEditApproveInitiatives: ReleasePackageEditApproveInitaitivesInfo[] = [];
  lstEditApproveInitiativesresponse: ReleasePackageEditApproveInitaitivesInfo[] =
    [];
  objReleasePackage = new ReleasePackage();
  objPlanMapping = new PlanVersionDeterminationFactor();
  public ddr_source_ddl8b25afb0b85726f3eb42 = [
    { text: "Delete", value: "Delete" },
  ];
  public ddl8b25afb0b85726f3eb42_defaultItem = {
    text: "Other Actions",
    value: null,
  };
  lstPlanMappingsDateProperties = [
    "Selected_EffectiveDate",
    "Selected_ExpiryDate",
  ];
  lstPlanMappingsEditMode: boolean = true;
  public ddlc913f9fddda76f86e969_defaultItem = {
    PlanName: "Select",
    PlanId: null,
  };
  public ddl6bf7ffba79343514ab0b_defaultItem = { Version: "Select", id: null };
  public ddlc953f7db9bbd4a06c9ca_defaultItem = {
    InitiativeName: "Select",
    id_brq: null,
  };
  public ddl84a81e5f668b959a098e_defaultItem = {
    FactorName: "Select",
    FactorId: null,
  };
  public ddr_source_ddl387225e1ffe409f56b18 = [
    { text: "New Business", value: "New Business" },
    { text: "Renewal", value: "Renewal" },
  ];
  public ddl387225e1ffe409f56b18_defaultItem = { text: "Select", value: null };
  accesslevel: number;
  PrevSelectedTab: string = "Release Packages";
  releaseId: number = -1;
  modeOfReleasePackage: string = "New";
  ReleasePackageMode: string = "Add Release Package";
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
    title.setTitle("Add Release Package");
    this.accesslevel = this.us.getAccesslevel(ApplicationConstants.Role_Launch);
    if (this.accesslevel === 2 || this.accesslevel === 1) {
      this.ddr_source_ddl8b25afb0b85726f3eb42.splice(0, 1);
    }
  }
  ngOnInit() {
    let variables = {};
    let relId = this.appContext.ReleasePackageId;
    this.appContext.ReleasePackageId = "";
    if (relId != "") {
      this.releaseId = parseInt(relId);
    }
    this.GetPlansForPlanFactors();
    this.GetPlanVersionsForModel();
    this.GetEditApproveInitiatives();
    this.GetPlanFactorsForPlanMapping();
    this.appContext.SelectedTab = this.PrevSelectedTab;

    if (this.appContext.isViewMode) {
      this.ReleasePackageMode = "View Release Package";
      //this.GetReleasePackageById();
    }
  }

  lstPlanMappings = {
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
      if (!this.lstPlanMappingsEditMode) {
        return;
      }
      if (!this.lstPlanMappings._isDataValid()) {
        return;
      }
      this.lstPlanMappings._closeEditableRow();
      let obj = new PlanVersionDeterminationFactor();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.lstPlanMappings._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.lstPlanMappings.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.lstPlanMappings._pageChange({ skip: 0, take: 10 });
      this.lstPlanMappings._pushItem(obj);
      this.lstPlanMappings.editedRowIndex = 0;
      this.lstPlanMappings.staticRowIndex = 0;
      this.lstPlanMappings.Items[this.lstPlanMappings.editedRowIndex] = obj;
      this.lstPlanMappings.editedRowItem = obj;
      this.lstPlanMappings.selecteditem = obj;
      this.lstPlanMappings.isNewRowPristine = true;
      this.lstPlanMappingsgridInstance.editRow(
        this.lstPlanMappings.editedRowIndex
      );
    },
    _editRowItem: (event) => {
      if (!this.lstPlanMappingsEditMode) {
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
      if (this.lstPlanMappings._isDataValid()) {
        this.lstPlanMappings._closeEditableRow();
        this.lstPlanMappings.editedRowItem = Object.assign({}, event.dataItem);
        this.lstPlanMappings.selecteditem = event.dataItem;
        this.lstPlanMappings.editedRowIndex = event.rowIndex;
        let relativeIndex = this.lstPlanMappings._getIndexOfItem(
          event.dataItem
        );
        if (relativeIndex > -1) {
          this.lstPlanMappings.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.lstPlanMappingsgridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.lstPlanMappingsEditMode) {
        return;
      }
      let index = this.lstPlanMappings._getIndexOfItem(dataItem);
      //if ( this.lstPlanMappings.staticRowIndex != index && !this.lstPlanMappings._isDataValid()  ) {  return;  }
      if (index > -1) {
        this.lstPlanMappings.Items.splice(index, 1);
        this.lstPlanMappings.Items = this.lstPlanMappings.Items.slice();
        this.lstPlanMappings._closeEditableRow();
      } else {
        this.lstPlanMappings._closeEditableRow();
      }
      if (!dataItem["isNewRow"]) {
        dataItem["mode"] = "REMOVED";
        this.lstPlanMappings.removedItems.push(dataItem);
      }
    },
    _closeEditableRow: () => {
      if (this.lstPlanMappings.editedRowIndex > -1)
        this.lstPlanMappingsgridInstance.closeRow(
          this.lstPlanMappings.editedRowIndex
        );
      this.lstPlanMappings.editedRowIndex = -1;
      this.lstPlanMappings.staticRowIndex = -1;
      this.lstPlanMappings.editedRowItem = undefined;
      this.lstPlanMappings.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.lstPlanMappings.Items = [
        ...[dataItem],
        ...this.lstPlanMappings.Items,
      ];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.lstPlanMappings._isDataValid() &&
        this.lstPlanMappings.editedRowIndex == 0 &&
        this.lstPlanMappings.editedRowItem["isNewRow"]
      ) {
        this.lstPlanMappings.removeItem({
          data: this.lstPlanMappings.editedRowItem,
        });
      }
      if (
        !this.lstPlanMappings._isDataValid() &&
        this.lstPlanMappings.staticRowIndex > -1 &&
        this.lstPlanMappings.editedRowItem
      ) {
        const changedObj =
          this.lstPlanMappings.Items[this.lstPlanMappings.staticRowIndex];
        Object.assign(changedObj, this.lstPlanMappings.editedRowItem);
      }
      this.lstPlanMappings._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.lstPlanMappings.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.lstPlanMappings.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.lstPlanMappings.isNewRowPristine) {
        this.lstPlanMappings.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.lstPlanMappingsGrid_Group.control]);
      }
      return this.lstPlanMappingsGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.lstPlanMappings.removedItems = [];
      this.lstPlanMappings.Items.map((item: any) => {
        if (this.lstPlanMappingsDateProperties.length > 0) {
          this.lstPlanMappingsDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.lstPlanMappings._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
    },
    _setCheckedAll: () => {
      if (
        this.lstPlanMappings.Items.find(
          (item: any) => item["selected"] == false
        )
      ) {
        this.lstPlanMappings.headerCheckBoxValue = false;
      } else {
        this.lstPlanMappings.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.lstPlanMappings._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.lstPlanMappings.headerCheckBoxValue =
        !this.lstPlanMappings.headerCheckBoxValue;
      this.lstPlanMappings.Items.map((item: any) => {
        item["selected"] = this.lstPlanMappings.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        ...this.lstPlanMappings.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        ...this.lstPlanMappings.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        ...this.lstPlanMappings.removedItems,
      ];
      if (!this.lstPlanMappings._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.lstPlanMappings.editedRowItem["uid"]
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
        if (this.lstPlanMappings._isDataValid())
          this.lstPlanMappings._closeEditableRow();
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
  ReleasePackage_Save_Click(e) {
    this.objReleasePackage.DisplayName = this.cfs.hasValue(
      this.objReleasePackage.DisplayName
    )
      ? this.objReleasePackage.DisplayName
      : this.objReleasePackage.Name;

    if (
      this.cfs.hasValue(this.lstPlanMappings.Items) &&
      this.us.Length(this.lstPlanMappings.Items) > 0
    ) {
      this.lstPlanMappings.Items.forEach((element) => {
        element.Version = this.lstPlanMappings._getValueByID(
          element.lstfilPlanVersions,
          "Version",
          "id",
          element.Selected_Version
        );
      });
    }
    this.validationMessages = [];
    let variables = {};
    if (
      this.vs.ValidateSections([
        this.formsec14b84bee020a8c1eef47.control,
        this.formsec702575441c7537f8ae95.control,
      ])
    ) {
      var i;
      var j;
      this.objReleasePackage.PlanMappings = [];
      for (i = 0; i < this.lstPlanMappings.Items.length; i++) {
        this.objPlanMapping = new PlanVersionDeterminationFactor();
        this.objPlanMapping.PlanId =
          this.lstPlanMappings.Items[i].Selected_Plan;
        this.objPlanMapping.PlanVersionGuid =
          this.lstPlanMappings.Items[i].Selected_Version;
        this.objPlanMapping.EfffectiveDate =
          this.lstPlanMappings.Items[i].Selected_EffectiveDate;
        this.objPlanMapping.ExpiryDate =
          this.lstPlanMappings.Items[i].Selected_ExpiryDate;
        this.objPlanMapping.Type = this.lstPlanMappings.Items[i].Selected_Type;
        if (
          this.cfs.hasValue(this.lstPlanMappings.Items[i].SelectedInitiative)
        ) {
          this.objPlanMapping.BrId =
            this.lstPlanMappings.Items[i].SelectedInitiative;
        }
        this.objPlanMapping.PlanVersionId = this.objPlanMapping.PlanVersionGuid;
        this.objPlanMapping.PlanDeterminationFactorMapId =
          this.lstPlanMappings.Items[i].Selected_PlanDeterminations;
        if (
          this.objPlanMapping.EfffectiveDate > this.objPlanMapping.ExpiryDate
        ) {
          let plan = this.lstPlans.find(
            (item) => item.PlanId == this.objPlanMapping.PlanId
          );
          this.us.Information(
            plan.PlanName + " Effective Date should be less than Expiry Date"
          );
          return 0;
        }

        let duplicteEffectiveDateExist = this.lstPlanMappings.Items.filter(
          (obj) =>
            obj.Selected_EffectiveDate.getDate() ==
              this.objPlanMapping.EfffectiveDate.getDate() &&
            obj.Selected_Plan == this.objPlanMapping.PlanId &&
            obj.Selected_Version != this.objPlanMapping.Selected_Version &&
            obj.Selected_PlanDeterminations ==
              this.objPlanMapping.PlanDeterminationFactorMapId
        );

        if (
          this.cfs.hasValue(duplicteEffectiveDateExist) &&
          duplicteEffectiveDateExist.length > 1
        ) {
          let dupCheck = duplicteEffectiveDateExist.filter(
            (element) =>
              element.Selected_Version ==
                this.objPlanMapping.Selected_Version &&
              element.Selected_PlanDeterminations !=
                this.objPlanMapping.Selected_PlanDeterminations
          );
          if (this.cfs.hasValue(dupCheck) && dupCheck.length > 1) {
            this.us.Information(
              "Please provide unique effective date for a plan. Effective Date can't be same",
              200,
              300
            );
            return 0;
          }
        }
        let DuplicatePlaFactors = this.objReleasePackage.PlanMappings.filter(
          (item: any) => {
            return (
              item.PlanId == this.lstPlanMappings.Items[i].Selected_Plan &&
              item.Version == this.lstPlanMappings.Items[i].Version &&
              item.PlanDeterminationFactorMapId ==
                this.lstPlanMappings.Items[i].Selected_PlanDeterminations
            );
          }
        );
        if (
          this.cfs.hasValue(DuplicatePlaFactors) &&
          DuplicatePlaFactors.length >= 1
        ) {
          this.us.Show("Duplicate Mappings Cannot be Created", "error");

          return 0;
        }
        let VersionData = this.lstplanVersions.filter((item: any) => {
          return item.id == this.lstPlanMappings.Items[i].Selected_Version;
        });
        for (j = 0; j < VersionData.length; j++) {
          this.objPlanMapping.Version = VersionData[j].Version.toString();
        }
        //this.objReleasePackage.ModelId=this.appContext.modelID;
        this.objReleasePackage.ModelId = this.appContext.modelID;
        //this.objReleasePackage.CreatedBy=this.appContext.username;
        this.objReleasePackage.CreatedBy = this.appContext.username;
        this.objReleasePackage.PlanMappings.push(this.objPlanMapping);
        if (this.releaseId != -1) {
          this.objReleasePackage.Id = this.releaseId;
          this.objReleasePackage.modeOfReleasePackage = "Dirty";
        } else {
          this.objReleasePackage.Id = -1;
        }
      }
      if (this.objReleasePackage.PlanMappings.length <= 0) {
        this.us.Information("Please provide Plan Mappings");
        return;
      }
      console.log("Calling Filebasepackage");
      console.log(this.objReleasePackage);
      this.apiServc
        .ManageFilebasePackage(
          "publishconfig/managefilebaseplanversionmappings",
          {},
          this.objReleasePackage
        )
        .subscribe(
          (r) => {
            this.ManageFilebasePackage_ReleasePackage_Save_ClickCompleted(
              r,
              variables
            );
          },
          (e) => {
            this.ManageFilebasePackage_ReleasePackage_Save_ClickErrorRaised(
              e,
              variables
            );
          }
        );
    }
  }
  AddReleasePackage_Cancel_Click(e) {
    this.appContext.isViewMode = false;
    this.appContext.ReleasePackageId = "";
    let variables = {};
    this.router.navigate(["Launch"], {});
  }
  EffectiveDate_Selection_Changed(e) {
    let variables = {};
    if (this.lstPlanMappings.Items.length > 0) {
      var i;
      for (i = 0; i < this.lstPlanMappings.Items.length; i++) {
        let temp = this.lstPlanMappings.Items.filter(
          (item) =>
            item.Selected_Plan ==
            this.lstPlanMappings.selecteditem.Selected_Plan
        );
        if (temp.length <= 1) {
          continue;
        }
        if (this.cfs.hasValue(this.lstPlanMappings.Items[i + 1])) {
          if (
            this.lstPlanMappings.Items[i + 1].Selected_Plan ==
            this.lstPlanMappings.selecteditem.Selected_Plan
          ) {
            if (this.cfs.hasValue(this.lstPlanMappings.Items[i + 1])) {
              let TempVar = this.lstPlanMappings.Items[i + 1];

              if (
                TempVar.Selected_Version !=
                  this.lstPlanMappings.selecteditem.Selected_Version &&
                TempVar.Selected_PlanDeterminations ==
                  this.lstPlanMappings.selecteditem.Selected_PlanDeterminations
              ) {
                if (
                  new Date(
                    this.lstPlanMappings.selecteditem.Selected_EffectiveDate.getFullYear() +
                      "/" +
                      (this.lstPlanMappings.selecteditem.Selected_EffectiveDate.getMonth() +
                        1) +
                      "/" +
                      this.lstPlanMappings.selecteditem.Selected_EffectiveDate.getDate()
                  ) >
                  new Date(
                    TempVar.Selected_EffectiveDate.getFullYear() +
                      "/" +
                      (TempVar.Selected_EffectiveDate.getMonth() + 1) +
                      "/" +
                      TempVar.Selected_EffectiveDate.getDate()
                  )
                ) {
                  var NewDate = new Date(
                    this.lstPlanMappings.selecteditem.Selected_EffectiveDate.getTime()
                  );
                  var ExpiryDate = new Date(
                    NewDate.setDate(
                      this.lstPlanMappings.selecteditem.Selected_EffectiveDate.getDate() -
                        1
                    )
                  );
                  if (
                    this.lstPlanMappings.Items[i + 1].Selected_EffectiveDate <=
                      ExpiryDate &&
                    this.lstPlanMappings.Items[
                      i + 1
                    ].Selected_ExpiryDate.getDate() +
                      1 !=
                      this.lstPlanMappings.selecteditem.Selected_EffectiveDate.getDate()
                  ) {
                    this.lstPlanMappings.Items[i + 1].Selected_ExpiryDate =
                      ExpiryDate;
                    return;
                  } else {
                    //this.us.Information("Please select valid date");
                    if (
                      this.lstPlanMappings.Items[i + 1].Selected_ExpiryDate >
                        this.lstPlanMappings.selecteditem
                          .Selected_EffectiveDate ||
                      this.lstPlanMappings.Items[i + 1].Selected_Version ==
                        this.lstPlanMappings.selecteditem.Selected_Version
                    ) {
                      //this.lstPlanMappings.selecteditem.Selected_EffectiveDate = this.lstPlanMappings.Items[i + 1].Selected_ExpiryDate.getDate() + 1;
                    } else {
                      this.lstPlanMappings.selecteditem.Selected_EffectiveDate =
                        new Date();
                    }
                  }
                } else if (
                  TempVar.Selected_PlanDeterminations ==
                  this.lstPlanMappings.selecteditem.Selected_PlanDeterminations
                ) {
                  this.us.Information(
                    "Cuurent effective Date Should be Greater than Existing Mapping"
                  );
                  this.lstPlanMappings.selecteditem.Selected_EffectiveDate = "";
                }
              }
            }
          }
        }
      }
    }
  }
  Plans_Selection_Changed(e) {
    // e.Selected_PlanDeterminations = "";
    //e.Selected_Version = "";

    //this.lstPlanMappings.initializeGridDataSource();

    // this.lstPlanMappings.selecteditem.Selected_Version=this.ddl84a81e5f668b959a098e_defaultItem.FactorName;
    // this.lstPlanMappings.selecteditem.Selected_PlanDeterminations=this.ddl84a81e5f668b959a098e_defaultItem.FactorName;
    // this.lstPlanMappings.selecteditem.Selected_Type=this.ddl84a81e5f668b959a098e_defaultItem.FactorName;
    // this.lstPlanMappings.selecteditem.SelectedInitiative=this.ddl84a81e5f668b959a098e_defaultItem.FactorName;

    this.lstPlanMappings.selecteditem.PlanName =
      this.lstPlanMappings._getValueByID(
        this.lstPlans,
        "PlanName",
        "PlanId",
        this.lstPlanMappings.selecteditem.Selected_Plan
      );
    let variables = {};
    let PlanVersData = this.lstplanVersions.filter((item: any) => {
      return item.PlanId == this.lstPlanMappings.selecteditem.Selected_Plan;
    });
    e.lstfilPlanVersions = PlanVersData;
    let PlanFactorsData = this.lstPlanFactors.filter((item: any) => {
      return item.PlanId == this.lstPlanMappings.selecteditem.Selected_Plan;
    });
    e.lstfilplanfactors = PlanFactorsData;
    if (this.cfs.hasValue(this.lstPlanMappings.selecteditem.Selected_Version))
      this.lstPlanMappings.selecteditem.Selected_Version = null;
    if (
      this.cfs.hasValue(
        this.lstPlanMappings.selecteditem.Selected_PlanDeterminations
      )
    )
      this.lstPlanMappings.selecteditem.Selected_PlanDeterminations = null;
    if (this.cfs.hasValue(this.lstPlanMappings.selecteditem.Selected_Type))
      this.lstPlanMappings.selecteditem.Selected_Type = null;
    if (this.cfs.hasValue(this.lstPlanMappings.selecteditem.SelectedInitiative))
      this.lstPlanMappings.selecteditem.SelectedInitiative = null;
    //this.lstPlanMappings.selecteditem.lstfilPlanV =  e.lstfilPlanFactors;
    //this.lstPlanMappings.selecteditem.lstfilPlanF = e.lstfilPlanFactors;

    // if (e.lstfilplanfactors.length == 1) {
    //   e.Selected_PlanDeterminations = e.lstfilplanfactors[0].FactorId;
    // }
  }
  rerenderFlag: boolean = true;
  PlanDetermination_Selection_Changed(e) {
    this.lstPlanMappings.selecteditem.Selected_PlanDeterminationName =
      this.lstPlanMappings._getValueByID(
        this.lstPlanMappings.selecteditem.lstfilplanfactors,
        "FactorName",
        "FactorId",
        this.lstPlanMappings.selecteditem.Selected_PlanDeterminations
      );
    let variables = {};
    let DuplicatePlaFactors = this.lstPlanMappings.Items.filter((item: any) => {
      return (
        item.Selected_Plan == this.lstPlanMappings.selecteditem.Selected_Plan &&
        item.Selected_Version ==
          this.lstPlanMappings.selecteditem.Selected_Version &&
        item.Selected_PlanDeterminations ==
          this.lstPlanMappings.selecteditem.Selected_PlanDeterminations
      );
    });
    if (
      this.cfs.hasValue(DuplicatePlaFactors) &&
      DuplicatePlaFactors.length > 1
    ) {
      this.us.Show("Duplicate Mappings Cannot be Created", "error");
      this.lstPlanMappings.selecteditem.Selected_PlanDeterminations =
        this.ddl84a81e5f668b959a098e_defaultItem.FactorId;
      e = null;
      this.rerenderFlag = false;
      setTimeout(() => {
        this.rerenderFlag = true;
      });
      return;
    }
  }

  PlanMappings_AddNew_Click(e) {
    let variables = {};
    this.lstPlanMappings.addItem();
  }

  private GetPlansForPlanFactors_OnLoadErrorRaised(err, variables) {}
  private GetPlansForPlanFactors_OnLoadCompleted(response, variables) {
    this.lstPlans = response;
  }
  private GetPlanVersionsForModel_OnLoadErrorRaised(err, variables) {}
  private GetPlanVersionsForModel_OnLoadCompleted(response, variables) {
    this.lstplanVersions = response;
  }
  private GetEditApproveInitInfoByModelId_OnLoadErrorRaised(err, variables) {}
  private GetEditApproveInitInfoByModelId_OnLoadCompleted(response, variables) {
    this.lstEditApproveInitiativesresponse = response;
  }
  private GetPlanFactorsForPlanMapping_OnLoadErrorRaised(err, variables) {}
  private GetPlanFactorsForPlanMapping_OnLoadCompleted(response, variables) {
    this.lstPlanFactors = response;
    if (this.releaseId > 0 && this.appContext.isViewMode) {
      this.GetReleasePackagesByReleasePackageId();
    } else if (!this.appContext.isViewMode) {
      this.GetReleasePackagesByModelID();
    }
  }
  private ManageFilebasePackage_ReleasePackage_Save_ClickErrorRaised(
    err,
    variables
  ) {}
  private ManageFilebasePackage_ReleasePackage_Save_ClickCompleted(
    response,
    variables
  ) {
    this.us.Show("ReleasePackage Added Successfully", "success");
    this.router.navigate(["Launch"], {});
  }

  public PlanMappings_OtherAction_Click(e) {
    if (e == "Delete") {
      let deleteMappingCheck = ({ index: Number, obj: Object }[10] = []);
      if (
        this.cfs.hasValue(this.lstPlanMappings.Items) &&
        this.us.Length(this.lstPlanMappings.Items) > 0
      ) {
        this.lstPlanMappings.Items.forEach((element) => {
          element.Version = this.lstPlanMappings._getValueByID(
            element.lstfilPlanVersions,
            "Version",
            "id",
            element.Selected_Version
          );
        });
      }
      let items = this.lstPlanMappings.getCheckedItems();

      if (
        this.cfs.hasValue(items) &&
        this.us.Length(items) == 1 &&
        items.length != this.lstPlanMappings.Items.length
      ) {
        let version = items[0].Version;
        for (let i = 0; i < this.lstPlanMappings.Items.length; i++) {
          if (
            this.lstPlanMappings.Items[i].Selected_Plan ==
              items[0].Selected_Plan &&
            parseInt(this.lstPlanMappings.Items[i].Version) >
              parseInt(version) &&
            this.lstPlanMappings.Items[i].Version != version
          ) {
            this.us.InformationTemplate(this.InformationMessage_ReleasePackage);
            return;
          }
        }
        // if(this.cfs.hasValue(deleteMappingCheck) && this.us.Length(deleteMappingCheck) > 1) {
        //   this.us.InformationTemplate(this.InformationMessage_ReleasePackage)
        //   return;
        // } else {
        items.forEach((element) => {
          this.lstPlanMappings.removeItem(element);
        });
        //}
      } else if (items.length == this.lstPlanMappings.Items.length) {
        items.forEach((element) => {
          this.lstPlanMappings.removeItem(element);
        });
      } else if (this.cfs.hasValue(items) && this.us.Length(items) > 1) {
        this.us.Information("Please select only one planmapping to delete");
        return;
      } else {
        // this.us.Information("Please select plans to delete");
        this.us.InformationTemplate(this.DeleteEntityInformation);
        return;
      }
      // var items = this.lstPlanMappings.getCheckedItems();
      // items.forEach((element) => {
      //   this.lstPlanMappings.removeItem(element);
      // });
    }
  }

  public GetReleasePackagesByModelID() {
    let variables = {};

    this.apiServc
      .GetReleasePackagesByModelID(
        "publishconfig/GetReleasePackagesByModelID?modelId=" +
          this.appContext.modelID,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetReleasePackagesByModelID_OnLoadCompleted(r, variables);
        },
        (e) => {
          this.GetReleasePackagesByModelID_OnLoadErrorRaised(e, variables);
        }
      );
  }

  private GetReleasePackagesByModelID_OnLoadCompleted(response, variables) {
    let tempReleasePackages = response;
    if (this.releaseId != -1) {
      this.objReleasePackage.ModelId = this.appContext.modelID;
      this.objReleasePackage.Name = tempReleasePackages.Name;
      this.objReleasePackage.DisplayName = this.cfs.hasValue(
        tempReleasePackages.DisplayName
      )
        ? tempReleasePackages.DisplayName
        : tempReleasePackages.Name; //tempReleasePackages.DisplayName;
      this.objReleasePackage.Description = tempReleasePackages.Description;
      this.objReleasePackage.IsPowerShellInclude =
        tempReleasePackages.IsPowerShellInclude;
      this.objReleasePackage.CreatedBy = tempReleasePackages.CreatedBy;
    }
    if (
      tempReleasePackages != null &&
      tempReleasePackages.PlanMappings.length > 0
    ) {
      this.lstPlanMappings.Items = [];
      tempReleasePackages.PlanMappings.forEach((element) => {
        let ReleasePackageTemp = new PlanVersionDeterminationFactor();
        ReleasePackageTemp.PlanMappings.push(element);
        ReleasePackageTemp.Selected_Plan = element.PlanId;
        ReleasePackageTemp.PlanName = this.lstPlanMappings._getValueByID(
          this.lstPlans,
          "PlanName",
          "PlanId",
          ReleasePackageTemp.Selected_Plan
        );
        ReleasePackageTemp.lstfilPlanVersions = this.lstplanVersions.filter(
          (item: any) => {
            return item.PlanId == element.PlanId;
          }
        );
        ReleasePackageTemp.Selected_Version = element.PlanVersionId;
        ReleasePackageTemp.Version = this.lstPlanMappings._getValueByID(
          ReleasePackageTemp.lstfilPlanVersions,
          "Version",
          "id",
          ReleasePackageTemp.Selected_Version
        );
        if (
          this.cfs.hasValue(this.lstEditApproveInitiativesresponse) &&
          this.us.Length(this.lstEditApproveInitiativesresponse) > 0
        ) {
          ReleasePackageTemp.lstfilInitiatives =
            this.lstEditApproveInitiativesresponse.filter((item: any) => {
              return item.id_plv == ReleasePackageTemp.Selected_Version;
            });
          ReleasePackageTemp.SelectedInitiative = element.BrId;
          if (ReleasePackageTemp.SelectedInitiative != 0) {
            ReleasePackageTemp.SelectedInitiativeName =
              this.lstPlanMappings._getValueByID(
                ReleasePackageTemp.lstfilInitiatives,
                "InitiativeName",
                "id_brq",
                ReleasePackageTemp.SelectedInitiative
              );
          }
        }

        // let Version=ReleasePackageTemp.lstfilPlanVersions.filter(
        //   (item:any)=>
        //   {
        //      return item.BasePlanVersionId==element.PlanVersionId;

        // let Version=ReleasePackageTemp.lstfilPlanVersions.filter(
        //   (item:any)=>
        //   {
        //      return item.BasePlanVersionId==element.PlanVersionId;

        //   }
        // );
        // ReleasePackageTemp.Version=Version[0].Version.toString();

        ReleasePackageTemp.lstfilplanfactors = [];
        ReleasePackageTemp.lstfilplanfactors = this.lstPlanFactors.filter(
          (item) => {
            return item.PlanId == element.PlanId;
          }
        );
        ReleasePackageTemp.Selected_PlanDeterminations =
          element.PlanDeterminationFactorMapId;
        ReleasePackageTemp.Selected_PlanDeterminationName =
          this.lstPlanMappings._getValueByID(
            ReleasePackageTemp.lstfilplanfactors,
            "FactorName",
            "FactorId",
            ReleasePackageTemp.Selected_PlanDeterminations
          );

        ReleasePackageTemp.Selected_Type = element.Type;
        ReleasePackageTemp.Selected_EffectiveDate = element.EfffectiveDate;
        ReleasePackageTemp.Selected_ExpiryDate = element.ExpiryDate;

        //this.lstPlanMappings.Items[i] = ReleasePackageTemp;
        this.lstPlanMappings._pushItem(ReleasePackageTemp);
      });
    }
    this.lstPlanMappings.initializeGridDataSource();
  }
  private GetReleasePackagesByModelID_OnLoadErrorRaised(err, variables) {}

  public GetPlansForPlanFactors() {
    let variables = {};
    this.apiServc
      .GetPlansForPlanFactors(
        "publishconfig/getplans?p_Model=" + this.appContext.modelID,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetPlansForPlanFactors_OnLoadCompleted(r, variables);
        },
        (e) => {
          this.GetPlansForPlanFactors_OnLoadErrorRaised(e, variables);
        }
      );
  }
  public GetPlanVersionsForModel() {
    let variables = {};
    this.apiServc
      .GetPlanVersionsForModel(
        "publishconfig/getplanversionsbymodel?p_Model=" +
          this.appContext.modelID,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetPlanVersionsForModel_OnLoadCompleted(r, variables);
        },
        (e) => {
          this.GetPlanVersionsForModel_OnLoadErrorRaised(e, variables);
        }
      );
  }
  public GetPlanFactorsForPlanMapping() {
    let variables = {};
    this.apiServc
      .GetPlanFactorsForPlanMapping(
        "publishconfig/getplanfactorsforplanmappings?p_Model=" +
          this.appContext.modelID,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetPlanFactorsForPlanMapping_OnLoadCompleted(r, variables);
        },
        (e) => {
          this.GetPlanFactorsForPlanMapping_OnLoadErrorRaised(e, variables);
        }
      );
  }
  public GetEditApproveInitiatives() {
    let variables = {};
    this.apiServc
      .GetEditApproveInitInfoByModelId(
        "publishconfig/GetEditApproveInitInfoByModelId?ModelId=" +
          this.appContext.modelID,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetEditApproveInitInfoByModelId_OnLoadCompleted(r, variables);
        },
        (e) => {
          this.GetEditApproveInitInfoByModelId_OnLoadErrorRaised(e, variables);
        }
      );
  }

  public GetReleasePackagesByReleasePackageId() {
    let variables = {};

    this.apiServc
      .GetReleasePackagesByModelID(
        "publishconfig/GetReleasePackagesByModelID?modelId=" +
          this.appContext.modelID +
          "&p_releaseId=" +
          this.releaseId,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetReleasePackagesByModelID_OnLoadCompleted(r, variables);
        },
        (e) => {
          this.GetReleasePackagesByModelID_OnLoadErrorRaised(e, variables);
        }
      );
  }

  Expiry_Date_SelectionChanged(e) {
    if (
      this.lstPlanMappings.selecteditem.Selected_ExpiryDate >=
      this.lstPlanMappings.selecteditem.Selected_EffectiveDate
    ) {
    } else {
      this.us.Information(
        "Expiry Date should not be less than Effective Date, Please select valid date",
        200,
        300
      );
      this.lstPlanMappings.selecteditem.Selected_ExpiryDate = "13/12/1998";
      return;
    }
  }

  setVersions(dataItem) {
    // this.lstPlanMappings.selecteditem.SelectedInitiative=null;
    this.lstPlanMappings.selecteditem.Version =
      this.lstPlanMappings._getValueByID(
        this.lstPlanMappings.selecteditem.lstfilPlanVersions,
        "Version",
        "id",
        this.lstPlanMappings.selecteditem.Selected_Version
      );
    this.lstEditApproveInitiatives =
      this.lstEditApproveInitiativesresponse.filter((item: any) => {
        return (
          item.id_plv == this.lstPlanMappings.selecteditem.Selected_Version
        );
      });
    dataItem.lstfilInitiatives = this.lstEditApproveInitiatives;
  }

  GetReleasePackageById() {
    let variables = {};
    this.apiServc
      .GetReleasePackageByReleaseId(
        "publishconfig/getreleasepackagebyreleaseId?p_ReleaseId=" +
          this.releaseId,
        {},
        ""
      )
      .subscribe(
        (r) => {
          this.GetReleasePackageByReleaseId_OnLoadCompleted(r, variables);
        },
        (e) => {
          this.GetReleasePackageByReleaseId_OnLoadErrorRaised(e, variables);
        }
      );
  }
  GetReleasePackageByReleaseId_OnLoadErrorRaised(err, variables) {}
  GetReleasePackageByReleaseId_OnLoadCompleted(response, variables) {
    console.log(response);
    if (this.cfs.hasValue(response)) {
      let ReleasePackageObject = response;
      this.objReleasePackage.Name = ReleasePackageObject.Name;
      this.objReleasePackage.DisplayName = ReleasePackageObject.DisplayName;
      this.objReleasePackage.Description = ReleasePackageObject.Description;
      this.lstPlanMappings.Items.push(ReleasePackageObject.Mappings);

      if (
        ReleasePackageObject != null &&
        ReleasePackageObject.PlanMappings.length > 0
      ) {
        this.lstPlanMappings.Items = [];
        ReleasePackageObject.PlanMappings.slice()
          .reverse()
          .forEach((element) => {
            let ReleasePackageTemp = new PlanVersionDeterminationFactor();
            ReleasePackageTemp.PlanMappings.push(element);
            ReleasePackageTemp.Selected_Plan = element.PlanId;
            ReleasePackageTemp.lstfilPlanVersions = this.lstplanVersions.filter(
              (item: any) => {
                return item.PlanId == element.PlanId;
              }
            );
            ReleasePackageTemp.Selected_Version = element.PlanVersionId;
            ReleasePackageTemp.lstfilInitiatives =
              this.lstEditApproveInitiativesresponse.filter((item: any) => {
                return item.id_plv == ReleasePackageTemp.Selected_Version;
              });
            ReleasePackageTemp.SelectedInitiative = element.BrId;
            ReleasePackageTemp.lstfilplanfactors = [];
            ReleasePackageTemp.lstfilplanfactors = this.lstPlanFactors.filter(
              (item) => {
                return item.PlanId == element.PlanId;
              }
            );
            ReleasePackageTemp.Selected_PlanDeterminations =
              element.PlanDeterminationFactorMapId;
            ReleasePackageTemp.Selected_Type = element.Type;
            ReleasePackageTemp.Selected_EffectiveDate = element.EfffectiveDate;
            ReleasePackageTemp.Selected_ExpiryDate = element.ExpiryDate;

            //this.lstPlanMappings.Items[i] = ReleasePackageTemp;
            this.lstPlanMappings._pushItem(ReleasePackageTemp);
          });
      }
      this.lstPlanMappings.initializeGridDataSource();
    }
  }

  Initiatives_Selection_Changed(e) {
    this.lstPlanMappings.selecteditem.SelectedInitiativeName =
      this.lstPlanMappings._getValueByID(
        this.lstPlanMappings.selecteditem.lstfilInitiatives,
        "InitiativeName",
        "id_brq",
        this.lstPlanMappings.selecteditem.SelectedInitiative
      );
  }
  ShowConsolidated(e) {
    let Ischecked = e.target.checked;
    if (Ischecked && !this.appContext.isViewMode) {
      this.GetReleasePackagesByModelID();
    } else {
      this.lstPlanMappings.Items = [];
    }
  }
}
