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
  selector: 'DocumentPreparation',
  templateUrl: './DocumentPreparation.component.html'
})
export class DocumentPreparation implements OnInit, CanComponentDeactivate
{
  validationMessages : string[] = [];
  subscription: Subscription = new Subscription();
   canDeactivate(): boolean {
    return !this.tessForm.dirty; //this.tessForm.valid &&

  }
  @ViewChild('tessForm', null) tessForm: NgForm;
  @ViewChild('formsec73082d7cd5c13450eb52', null)
  public formsec73082d7cd5c13450eb52:NgModelGroup;
  @ViewChild("lstDocumentPreparationGridInstance", null)
  public lstDocumentPreparationGridInstance: GridComponent;
  @ViewChild("lstDocumentPreparationGrid_Group", null)
  public lstDocumentPreparationgGrid_Group: NgModelGroup;
  @ViewChild(TooltipDirective,null) public tooltipDir_dgc814f87b1e1667695454: TooltipDirective;
  public showTooltip_dgc814f87b1e1667695454(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (element.nodeName === 'TH' && element.offsetWidth < element.scrollWidth) {
        this.tooltipDir_dgc814f87b1e1667695454.toggle(element);
    } else {
        this.tooltipDir_dgc814f87b1e1667695454.hide();
    }
}
lstDocumentPreparationEditMode: boolean = false;
lstDocumentPreparationDateProperties = [];
  constructor(public vs: ValidatorService,public us: UtilityService, public apiServc: ApiService,public cfs:CustomFunctionService,public appContext: ApplicationContextService, private router: Router, private route: ActivatedRoute,private title: Title){
	title.setTitle('TestPage');
  }
  ngOnInit(){
    this.GetDocumentPreparation();

  }

  lstDocumentPreparation = {
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
      if (!this.lstDocumentPreparationEditMode) {
        return;
      }
      if (!this.lstDocumentPreparation._isDataValid()) {
        return;
      }
      this.lstDocumentPreparation._closeEditableRow();
      let obj = new DocumentPreparation();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.lstDocumentPreparation._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.lstDocumentPreparation.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.lstDocumentPreparation._pageChange({ skip: 0, take: 10 });
      this.lstDocumentPreparation._pushItem(obj);
      this.lstDocumentPreparation.editedRowIndex = 0;
      this.lstDocumentPreparation.staticRowIndex = 0;
      this.lstDocumentPreparation.Items[this.lstDocumentPreparation.editedRowIndex] = obj;
      this.lstDocumentPreparation.editedRowItem = obj;
      this.lstDocumentPreparation.selecteditem = obj;
      this.lstDocumentPreparation.isNewRowPristine = true;
      this.lstDocumentPreparationGridInstance.editRow(
        this.lstDocumentPreparation.editedRowIndex
      );
    },
    _editRowItem: (event) => {
      if (!this.lstDocumentPreparationEditMode) {
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
      if (this.lstDocumentPreparation._isDataValid()) {
        this.lstDocumentPreparation._closeEditableRow();
        this.lstDocumentPreparation.editedRowItem = Object.assign({}, event.dataItem);
        this.lstDocumentPreparation.selecteditem = event.dataItem;
        this.lstDocumentPreparation.editedRowIndex = event.rowIndex;
        let relativeIndex = this.lstDocumentPreparation._getIndexOfItem(event.dataItem);
        if (relativeIndex > -1) {
          this.lstDocumentPreparation.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.lstDocumentPreparationGridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.lstDocumentPreparationEditMode) {
        return;
      }
      let index = this.lstDocumentPreparation._getIndexOfItem(dataItem.data);
      if (
        this.lstDocumentPreparation.staticRowIndex != index &&
        !this.lstDocumentPreparation._isDataValid()
      ) {
        return;
      }
      if (index > -1) {
        this.lstDocumentPreparation.Items.splice(index, 1);
        this.lstDocumentPreparation.Items = this.lstDocumentPreparation.Items.slice();
        this.lstDocumentPreparation._closeEditableRow();
      } else {
        this.lstDocumentPreparation._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.lstDocumentPreparation.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.lstDocumentPreparation.editedRowIndex > -1)
        this.lstDocumentPreparationGridInstance.closeRow(
          this.lstDocumentPreparation.editedRowIndex
        );
      this.lstDocumentPreparation.editedRowIndex = -1;
      this.lstDocumentPreparation.staticRowIndex = -1;
      this.lstDocumentPreparation.editedRowItem = undefined;
      this.lstDocumentPreparation.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.lstDocumentPreparation.Items = [[dataItem], this.lstDocumentPreparation.Items];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.lstDocumentPreparation._isDataValid() &&
        this.lstDocumentPreparation.editedRowIndex == 0 &&
        this.lstDocumentPreparation.editedRowItem["isNewRow"]
      ) {
        this.lstDocumentPreparation.removeItem({
          data: this.lstDocumentPreparation.editedRowItem,
        });
      }
      if (
        !this.lstDocumentPreparation._isDataValid() &&
        this.lstDocumentPreparation.staticRowIndex > -1 &&
        this.lstDocumentPreparation.editedRowItem
      ) {
        const changedObj = this.lstDocumentPreparation.Items[
          this.lstDocumentPreparation.staticRowIndex
        ];
        Object.assign(changedObj, this.lstDocumentPreparation.editedRowItem);
      }
      this.lstDocumentPreparation._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.lstDocumentPreparation.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.lstDocumentPreparation.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.lstDocumentPreparation.isNewRowPristine) {
        this.lstDocumentPreparation.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.lstDocumentPreparationGrid_Group.control]);
      }
      return this.lstDocumentPreparationGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.lstDocumentPreparation.removedItems = [];
      this.lstDocumentPreparation.Items.map((item: any) => {
        if (this.lstDocumentPreparationDateProperties.length > 0) {
          this.lstDocumentPreparationDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.lstDocumentPreparation._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
    },
    _setCheckedAll: () => {
      if (
        this.lstDocumentPreparation.Items.find((item: any) => item["selected"] == false)
      ) {
        this.lstDocumentPreparation.headerCheckBoxValue = false;
      } else {
        this.lstDocumentPreparation.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.lstDocumentPreparation._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.lstDocumentPreparation.headerCheckBoxValue = !this.lstDocumentPreparation
        .headerCheckBoxValue;
      this.lstDocumentPreparation.Items.map((item: any) => {
        item["selected"] = this.lstDocumentPreparation.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        this.lstDocumentPreparation.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        this.lstDocumentPreparation.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        this.lstDocumentPreparation.removedItems,
      ];
      if (!this.lstDocumentPreparation._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.lstDocumentPreparation.editedRowItem["uid"]
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
        if (this.lstDocumentPreparation._isDataValid())
          this.lstDocumentPreparation._closeEditableRow();
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
    this.lstDocumentPreparation.Items=[]
    // this.apiServc.GetDocumentConfiguration("Model/GetDocumentConfiguration", {}, "")
    // .subscribe(
    //   (r) => {
    //     this.GetDocumentConfiguration_Completed(r);
    //   },
    //   (e) => {
    //     this.GetDocumentConfiguration_ErrorRaised(e);
    //   }
    // );
  }
  GetDocumentConfiguration_Completed(r){
    this.lstDocumentPreparation =r

  }
  GetDocumentConfiguration_ErrorRaised(e) {}
  EditDocumentTypeConfig(e){ let variables = { }; }
  DeleteDocumentTypeConfig(e){ let variables = { }; }

  AddDocumentPreparation(e) {
    this.router.navigate(["AddDocumentPreparation"], { queryParamsHandling: "merge" });
  }




}
