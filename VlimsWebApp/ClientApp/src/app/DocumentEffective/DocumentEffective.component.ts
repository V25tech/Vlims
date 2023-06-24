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
import { DocumentTypeConfiguration } from 'src/app/models/models';
import { DataStateChangeEvent, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
declare var $: any;
@Component({
  selector: 'DocumentEffective',
  templateUrl: './DocumentEffective.component.html'
})
export class DocumentEffective implements OnInit, CanComponentDeactivate
{
  validationMessages : string[] = [];
  subscription: Subscription = new Subscription();
   canDeactivate(): boolean {
    return !this.tessForm.dirty; //this.tessForm.valid &&

  }
  @ViewChild('tessForm', null) tessForm: NgForm;
  @ViewChild('formsec73082d7cd5c13450eb52', null)
  public formsec73082d7cd5c13450eb52:NgModelGroup;
  @ViewChild("lstDocumentEffectiveGridInstance", null)
  public lstDocumentEffectiveGridInstance: GridComponent;
  @ViewChild("lstDocumentEffectiveGrid_Group", null)
  public lstDocumentEffectiveGrid_Group: NgModelGroup;
  @ViewChild(TooltipDirective,null) public tooltipDir_dgc814f87b1e1667695454: TooltipDirective;
  public showTooltip_dgc814f87b1e1667695454(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (element.nodeName === 'TH' && element.offsetWidth < element.scrollWidth) {
        this.tooltipDir_dgc814f87b1e1667695454.toggle(element);
    } else {
        this.tooltipDir_dgc814f87b1e1667695454.hide();
    }
}
lstDocumentEffectiveEditMode: boolean = false;
lstDocumentEffectiveDateProperties = [];
  constructor(public vs: ValidatorService,public us: UtilityService, public apiServc: ApiService,public cfs:CustomFunctionService,public appContext: ApplicationContextService, private router: Router, private route: ActivatedRoute,private title: Title){
	title.setTitle('TestPage');
  }
  ngOnInit(){
    this.GetDocumentEffective();

  }

  lstDocumentEffective = {
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
      if (!this.lstDocumentEffectiveEditMode) {
        return;
      }
      if (!this.lstDocumentEffective._isDataValid()) {
        return;
      }
      this.lstDocumentEffective._closeEditableRow();
      let obj = new DocumentTypeConfiguration();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.lstDocumentEffective._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.lstDocumentEffective.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.lstDocumentEffective._pageChange({ skip: 0, take: 10 });
      this.lstDocumentEffective._pushItem(obj);
      this.lstDocumentEffective.editedRowIndex = 0;
      this.lstDocumentEffective.staticRowIndex = 0;
      this.lstDocumentEffective.Items[this.lstDocumentEffective.editedRowIndex] = obj;
      this.lstDocumentEffective.editedRowItem = obj;
      this.lstDocumentEffective.selecteditem = obj;
      this.lstDocumentEffective.isNewRowPristine = true;
      this.lstDocumentEffectiveGridInstance.editRow(
        this.lstDocumentEffective.editedRowIndex
      );
    },
    _editRowItem: (event) => {
      if (!this.lstDocumentEffectiveEditMode) {
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
      if (this.lstDocumentEffective._isDataValid()) {
        this.lstDocumentEffective._closeEditableRow();
        this.lstDocumentEffective.editedRowItem = Object.assign({}, event.dataItem);
        this.lstDocumentEffective.selecteditem = event.dataItem;
        this.lstDocumentEffective.editedRowIndex = event.rowIndex;
        let relativeIndex = this.lstDocumentEffective._getIndexOfItem(event.dataItem);
        if (relativeIndex > -1) {
          this.lstDocumentEffective.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.lstDocumentEffectiveGridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.lstDocumentEffectiveEditMode) {
        return;
      }
      let index = this.lstDocumentEffective._getIndexOfItem(dataItem.data);
      if (
        this.lstDocumentEffective.staticRowIndex != index &&
        !this.lstDocumentEffective._isDataValid()
      ) {
        return;
      }
      if (index > -1) {
        this.lstDocumentEffective.Items.splice(index, 1);
        this.lstDocumentEffective.Items = this.lstDocumentEffective.Items.slice();
        this.lstDocumentEffective._closeEditableRow();
      } else {
        this.lstDocumentEffective._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.lstDocumentEffective.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.lstDocumentEffective.editedRowIndex > -1)
        this.lstDocumentEffectiveGridInstance.closeRow(
          this.lstDocumentEffective.editedRowIndex
        );
      this.lstDocumentEffective.editedRowIndex = -1;
      this.lstDocumentEffective.staticRowIndex = -1;
      this.lstDocumentEffective.editedRowItem = undefined;
      this.lstDocumentEffective.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.lstDocumentEffective.Items = [[dataItem], this.lstDocumentEffective.Items];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.lstDocumentEffective._isDataValid() &&
        this.lstDocumentEffective.editedRowIndex == 0 &&
        this.lstDocumentEffective.editedRowItem["isNewRow"]
      ) {
        this.lstDocumentEffective.removeItem({
          data: this.lstDocumentEffective.editedRowItem,
        });
      }
      if (
        !this.lstDocumentEffective._isDataValid() &&
        this.lstDocumentEffective.staticRowIndex > -1 &&
        this.lstDocumentEffective.editedRowItem
      ) {
        const changedObj = this.lstDocumentEffective.Items[
          this.lstDocumentEffective.staticRowIndex
        ];
        Object.assign(changedObj, this.lstDocumentEffective.editedRowItem);
      }
      this.lstDocumentEffective._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.lstDocumentEffective.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.lstDocumentEffective.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.lstDocumentEffective.isNewRowPristine) {
        this.lstDocumentEffective.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.lstDocumentEffectiveGrid_Group.control]);
      }
      return this.lstDocumentEffectiveGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.lstDocumentEffective.removedItems = [];
      this.lstDocumentEffective.Items.map((item: any) => {
        if (this.lstDocumentEffectiveDateProperties.length > 0) {
          this.lstDocumentEffectiveDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.lstDocumentEffective._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
    },
    _setCheckedAll: () => {
      if (
        this.lstDocumentEffective.Items.find((item: any) => item["selected"] == false)
      ) {
        this.lstDocumentEffective.headerCheckBoxValue = false;
      } else {
        this.lstDocumentEffective.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.lstDocumentEffective._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.lstDocumentEffective.headerCheckBoxValue = !this.lstDocumentEffective
        .headerCheckBoxValue;
      this.lstDocumentEffective.Items.map((item: any) => {
        item["selected"] = this.lstDocumentEffective.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        this.lstDocumentEffective.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        this.lstDocumentEffective.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        this.lstDocumentEffective.removedItems,
      ];
      if (!this.lstDocumentEffective._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.lstDocumentEffective.editedRowItem["uid"]
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
        if (this.lstDocumentEffective._isDataValid())
          this.lstDocumentEffective._closeEditableRow();
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
  GetDocumentEffective() {
    this.lstDocumentEffective.Items=[]
    // this.apiServc.GetDocumentEffective("Model/GetDocumentEffective", {}, "")
    // .subscribe(
    //   (r) => {
    //     this.GetDocumentEffective_Completed(r);
    //   },
    //   (e) => {
    //     this.GetDocumentEffective_ErrorRaised(e);
    //   }
    // );
  }
  GetDocumentConfiguration_Completed(r){
    this.lstDocumentEffective =r

  }
  GetDocumentEffective_ErrorRaised(e) {}
  EditDocumentEffective(e){ let variables = { }; }
  DeleteDocumentEffective(e){ let variables = { }; }

 // AddDocumentConfiguration(e) {
   // this.router.navigate(["AddDocumentConfiguration"], { queryParamsHandling: "merge" });
  //}




}
