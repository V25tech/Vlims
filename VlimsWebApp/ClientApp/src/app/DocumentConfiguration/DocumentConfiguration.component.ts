import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UtilityService } from 'src/app/utility.service';
import { ValidatorService } from 'src/app/core/validator.service';
import { CanComponentDeactivate } from 'src/app/core/can-deactivate-guard.service';
import { CustomFunctionService } from 'src/app/customfunction.service';
import { Subscription } from "rxjs";
import { ApplicationContextService } from 'src/app/application-context.service';import { Title } from '@angular/platform-browser';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { DocumentTypeConfiguration, RequestContext } from 'src/app/models/models';
import { DataStateChangeEvent, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
declare var $: any;
@Component({
  selector: 'DocumentConfiguration',
  templateUrl: './DocumentConfiguration.component.html'
})
export class DocumentConfiguration implements OnInit, CanComponentDeactivate
{
  objrequest=new RequestContext();
  validationMessages : string[] = [];
  subscription: Subscription = new Subscription();
   canDeactivate(): boolean {
    return !this.tessForm.dirty; //this.tessForm.valid &&

  }
  @ViewChild('tessForm', null) tessForm: NgForm;
  @ViewChild('formsec73082d7cd5c13450eb52', null)
  public formsec73082d7cd5c13450eb52:NgModelGroup;
  @ViewChild("lstDocumentConfigGridInstance", null)
  public lstDocumentConfigGridInstance: GridComponent;
  @ViewChild("lstDocumentConfigGrid_Group", null)
  public lstDocumentConfigGrid_Group: NgModelGroup;
  @ViewChild(TooltipDirective,null) public tooltipDir_dgc814f87b1e1667695454: TooltipDirective;
  public showTooltip_dgc814f87b1e1667695454(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (element.nodeName === 'TH' && element.offsetWidth < element.scrollWidth) {
        this.tooltipDir_dgc814f87b1e1667695454.toggle(element);
    } else {
        this.tooltipDir_dgc814f87b1e1667695454.hide();
    }
}
lstDocumentConfigEditMode: boolean = false;
lstDocumentConfigDateProperties = [];
  constructor(public vs: ValidatorService,public us: UtilityService, public apiServc: ApiService,public cfs:CustomFunctionService,public appContext: ApplicationContextService, private router: Router, private route: ActivatedRoute,private title: Title){
	title.setTitle('TestPage');
  }
  ngOnInit(){
    this.GetDocumentConfiguration();

  }

  lstDocumentTypeConfig = {
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
      if (!this.lstDocumentConfigEditMode) {
        return;
      }
      if (!this.lstDocumentTypeConfig._isDataValid()) {
        return;
      }
      this.lstDocumentTypeConfig._closeEditableRow();
      let obj = new DocumentTypeConfiguration();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.lstDocumentTypeConfig._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.lstDocumentTypeConfig.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.lstDocumentTypeConfig._pageChange({ skip: 0, take: 10 });
      this.lstDocumentTypeConfig._pushItem(obj);
      this.lstDocumentTypeConfig.editedRowIndex = 0;
      this.lstDocumentTypeConfig.staticRowIndex = 0;
      this.lstDocumentTypeConfig.Items[this.lstDocumentTypeConfig.editedRowIndex] = obj;
      this.lstDocumentTypeConfig.editedRowItem = obj;
      this.lstDocumentTypeConfig.selecteditem = obj;
      this.lstDocumentTypeConfig.isNewRowPristine = true;
      this.lstDocumentConfigGridInstance.editRow(
        this.lstDocumentTypeConfig.editedRowIndex
      );
    },
    _editRowItem: (event) => {
      if (!this.lstDocumentConfigEditMode) {
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
      if (this.lstDocumentTypeConfig._isDataValid()) {
        this.lstDocumentTypeConfig._closeEditableRow();
        this.lstDocumentTypeConfig.editedRowItem = Object.assign({}, event.dataItem);
        this.lstDocumentTypeConfig.selecteditem = event.dataItem;
        this.lstDocumentTypeConfig.editedRowIndex = event.rowIndex;
        let relativeIndex = this.lstDocumentTypeConfig._getIndexOfItem(event.dataItem);
        if (relativeIndex > -1) {
          this.lstDocumentTypeConfig.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.lstDocumentConfigGridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.lstDocumentConfigEditMode) {
        return;
      }
      let index = this.lstDocumentTypeConfig._getIndexOfItem(dataItem.data);
      if (
        this.lstDocumentTypeConfig.staticRowIndex != index &&
        !this.lstDocumentTypeConfig._isDataValid()
      ) {
        return;
      }
      if (index > -1) {
        this.lstDocumentTypeConfig.Items.splice(index, 1);
        this.lstDocumentTypeConfig.Items = this.lstDocumentTypeConfig.Items.slice();
        this.lstDocumentTypeConfig._closeEditableRow();
      } else {
        this.lstDocumentTypeConfig._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.lstDocumentTypeConfig.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.lstDocumentTypeConfig.editedRowIndex > -1)
        this.lstDocumentConfigGridInstance.closeRow(
          this.lstDocumentTypeConfig.editedRowIndex
        );
      this.lstDocumentTypeConfig.editedRowIndex = -1;
      this.lstDocumentTypeConfig.staticRowIndex = -1;
      this.lstDocumentTypeConfig.editedRowItem = undefined;
      this.lstDocumentTypeConfig.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.lstDocumentTypeConfig.Items = [[dataItem], this.lstDocumentTypeConfig.Items];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.lstDocumentTypeConfig._isDataValid() &&
        this.lstDocumentTypeConfig.editedRowIndex == 0 &&
        this.lstDocumentTypeConfig.editedRowItem["isNewRow"]
      ) {
        this.lstDocumentTypeConfig.removeItem({
          data: this.lstDocumentTypeConfig.editedRowItem,
        });
      }
      if (
        !this.lstDocumentTypeConfig._isDataValid() &&
        this.lstDocumentTypeConfig.staticRowIndex > -1 &&
        this.lstDocumentTypeConfig.editedRowItem
      ) {
        const changedObj = this.lstDocumentTypeConfig.Items[
          this.lstDocumentTypeConfig.staticRowIndex
        ];
        Object.assign(changedObj, this.lstDocumentTypeConfig.editedRowItem);
      }
      this.lstDocumentTypeConfig._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.lstDocumentTypeConfig.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.lstDocumentTypeConfig.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.lstDocumentTypeConfig.isNewRowPristine) {
        this.lstDocumentTypeConfig.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.lstDocumentConfigGrid_Group.control]);
      }
      return this.lstDocumentConfigGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.lstDocumentTypeConfig.removedItems = [];
      this.lstDocumentTypeConfig.Items.map((item: any) => {
        if (this.lstDocumentConfigDateProperties.length > 0) {
          this.lstDocumentConfigDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.lstDocumentTypeConfig._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
    },
    _setCheckedAll: () => {
      if (
        this.lstDocumentTypeConfig.Items.find((item: any) => item["selected"] == false)
      ) {
        this.lstDocumentTypeConfig.headerCheckBoxValue = false;
      } else {
        this.lstDocumentTypeConfig.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.lstDocumentTypeConfig._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.lstDocumentTypeConfig.headerCheckBoxValue = !this.lstDocumentTypeConfig
        .headerCheckBoxValue;
      this.lstDocumentTypeConfig.Items.map((item: any) => {
        item["selected"] = this.lstDocumentTypeConfig.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        this.lstDocumentTypeConfig.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        this.lstDocumentTypeConfig.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        this.lstDocumentTypeConfig.removedItems,
      ];
      if (!this.lstDocumentTypeConfig._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.lstDocumentTypeConfig.editedRowItem["uid"]
        );
        dirtyItemsList.splice(index, 1);
        dirtyItemsList = dirtyItemsList.slice();
      }
      return dirtyItemsList;
    },
    _validatedEditExit: (event) => {
      var isBypassEvent = false;
      if (typeof event !== "boolean") {
      if(this.cfs.hasValue(event.path))
      {
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
      }
        if (this.lstDocumentTypeConfig._isDataValid())
          this.lstDocumentTypeConfig._closeEditableRow();
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
  GetDocumentConfiguration() {
    debugger
    this.lstDocumentTypeConfig.Items=[]
   this.objrequest={PageNumber:1,PageSize:1};
   //obj.PageNumber=1; obj.PageSize=1;
    this.apiServc.GetDocumentConfiguration("documenttypeconfiguration/getalldoctypeconfig", {},JSON.stringify(this.objrequest))
    .subscribe(
      (r) => {
        this.GetDocumentConfiguration_Completed(r);
      },
      (e) => {
        this.GetDocumentConfiguration_ErrorRaised(e);
      }
    );
  }
  GetDocumentConfiguration_Completed(r){
    debugger
    this.lstDocumentTypeConfig.Items=r
debugger
  }
  GetDocumentConfiguration_ErrorRaised(e) {}
  EditDocumentTypeConfig(e){ let variables = { }; }
  DeleteDocumentTypeConfig(e){ let variables = { }; }

  AddDocumentConfiguration(e) {
    this.router.navigate(["AddDocumentConfiguration"], { queryParamsHandling: "merge" });
  }




}
