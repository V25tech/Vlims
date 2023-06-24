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
  selector: 'DocumentRevision',
  templateUrl: './DocumentRevision.component.html'
})
export class DocumentRevision implements OnInit, CanComponentDeactivate
{
  validationMessages : string[] = [];
  subscription: Subscription = new Subscription();
   canDeactivate(): boolean {
    return !this.tessForm.dirty; //this.tessForm.valid &&

  }
  @ViewChild('tessForm', null) tessForm: NgForm;
  @ViewChild('formsec73082d7cd5c13450eb52', null)
  public formsec73082d7cd5c13450eb52:NgModelGroup;
  @ViewChild("lstDocumentRevisionGridInstance", null)
  public lstDocumentPreparationGridInstance: GridComponent;
  @ViewChild("lstDocumentRevisionGrid_Group", null)
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
lstDocumentRevisionEditMode: boolean = false;
lstDocumentRevisionDateProperties = [];
  constructor(public vs: ValidatorService,public us: UtilityService, public apiServc: ApiService,public cfs:CustomFunctionService,public appContext: ApplicationContextService, private router: Router, private route: ActivatedRoute,private title: Title){
	title.setTitle('TestPage');
  }
  ngOnInit(){
    this.GetDocumentRevision();

  }

  lstDocumentRevision = {
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
      if (!this.lstDocumentRevisionEditMode) {
        return;
      }
      if (!this.lstDocumentRevision._isDataValid()) {
        return;
      }
      this.lstDocumentRevision._closeEditableRow();
      let obj = new DocumentRevision();
      obj["isNewRow"] = true;
      obj["isDirtyRow"] = true;
      obj["uid"] = this.lstDocumentRevision._newGuid();
      obj["selected"] = false;
      obj["mode"] = "ADDED";
      this.lstDocumentRevision.state = {
        filter: { filters: [], logic: "and" },
        group: [],
        skip: 0,
        sort: [],
        take: 10,
      };
      this.lstDocumentRevision._pageChange({ skip: 0, take: 10 });
      this.lstDocumentRevision._pushItem(obj);
      this.lstDocumentRevision.editedRowIndex = 0;
      this.lstDocumentRevision.staticRowIndex = 0;
      this.lstDocumentRevision.Items[this.lstDocumentRevision.editedRowIndex] = obj;
      this.lstDocumentRevision.editedRowItem = obj;
      this.lstDocumentRevision.selecteditem = obj;
      this.lstDocumentRevision.isNewRowPristine = true;
      this.lstDocumentRevisionGridInstance.editRow(
        this.lstDocumentRevision.editedRowIndex
      );
    },
    _editRowItem: (event) => {
      if (!this.lstDocumentRevisionEditMode) {
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
      if (this.lstDocumentRevision._isDataValid()) {
        this.lstDocumentRevision._closeEditableRow();
        this.lstDocumentRevision.editedRowItem = Object.assign({}, event.dataItem);
        this.lstDocumentRevision.selecteditem = event.dataItem;
        this.lstDocumentRevision.editedRowIndex = event.rowIndex;
        let relativeIndex = this.lstDocumentRevision._getIndexOfItem(event.dataItem);
        if (relativeIndex > -1) {
          this.lstDocumentRevision.staticRowIndex = relativeIndex;
        }
        event.dataItem.isDirtyRow = true;
        if (!event.dataItem.isNewRow) event.dataItem.mode = "EDITED";
        this.lstDocumentRevisionGridInstance.editRow(event.rowIndex);
      }
    },
    removeItem: (dataItem: any) => {
      if (!this.lstDocumentRevisionEditMode) {
        return;
      }
      let index = this.lstDocumentRevision._getIndexOfItem(dataItem.data);
      if (
        this.lstDocumentRevision.staticRowIndex != index &&
        !this.lstDocumentRevision._isDataValid()
      ) {
        return;
      }
      if (index > -1) {
        this.lstDocumentRevision.Items.splice(index, 1);
        this.lstDocumentRevision.Items = this.lstDocumentRevision.Items.slice();
        this.lstDocumentRevision._closeEditableRow();
      } else {
        this.lstDocumentRevision._closeEditableRow();
      }
      if (!dataItem.data["isNewRow"]) {
        dataItem.data["mode"] = "REMOVED";
        this.lstDocumentRevision.removedItems.push(dataItem.data);
      }
    },
    _closeEditableRow: () => {
      if (this.lstDocumentRevision.editedRowIndex > -1)
        this.lstDocumentRevisionGridInstance.closeRow(
          this.lstDocumentRevision.editedRowIndex
        );
      this.lstDocumentRevision.editedRowIndex = -1;
      this.lstDocumentRevision.staticRowIndex = -1;
      this.lstDocumentRevision.editedRowItem = undefined;
      this.lstDocumentRevision.selecteditem = undefined;
    },
    _pushItem: (dataItem: any) => {
      this.lstDocumentRevision.Items = [[dataItem], this.lstDocumentRevision.Items];
    },
    _cancelChanges: (state?: DataStateChangeEvent) => {
      if (
        !this.lstDocumentRevision._isDataValid() &&
        this.lstDocumentRevision.editedRowIndex == 0 &&
        this.lstDocumentRevision.editedRowItem["isNewRow"]
      ) {
        this.lstDocumentRevision.removeItem({
          data: this.lstDocumentRevision.editedRowItem,
        });
      }
      if (
        !this.lstDocumentRevision._isDataValid() &&
        this.lstDocumentRevision.staticRowIndex > -1 &&
        this.lstDocumentRevision.editedRowItem
      ) {
        const changedObj = this.lstDocumentRevision.Items[
          this.lstDocumentRevision.staticRowIndex
        ];
        Object.assign(changedObj, this.lstDocumentRevision.editedRowItem);
      }
      this.lstDocumentRevision._closeEditableRow();
    },
    getCheckedItems: () => {
      return this.lstDocumentRevision.Items.filter((item: any) => {
        return item["selected"];
      });
    },
    _getIndexOfItem: (dataItem: any) => {
      return this.lstDocumentRevision.Items.findIndex(
        (x: any) => x["uid"] == dataItem["uid"]
      );
    },
    _isDataValid: () => {
      if (this.lstDocumentRevision.isNewRowPristine) {
        this.lstDocumentRevision.isNewRowPristine = false;
      } else {
        this.vs.ValidateSections([this.lstDocumentRevisionGrid_Group.control]);
      }
      return this.lstDocumentRevisionGrid_Group.valid;
    },
    initializeGridDataSource: () => {
      this.lstDocumentRevision.removedItems = [];
      this.lstDocumentRevision.Items.map((item: any) => {
        if (this.lstDocumentRevisionDateProperties.length > 0) {
          this.lstDocumentRevisionDateProperties.forEach((property: any) => {
            item[property] = new Date(item[property]);
          });
        }
        item["isDirtyRow"] = false;
        item["uid"] = this.lstDocumentRevision._newGuid();
        item["selected"] = false;
        item["isNewRow"] = false;
        return item;
      });
    },
    _setCheckedAll: () => {
      if (
        this.lstDocumentRevision.Items.find((item: any) => item["selected"] == false)
      ) {
        this.lstDocumentRevision.headerCheckBoxValue = false;
      } else {
        this.lstDocumentRevision.headerCheckBoxValue = true;
      }
    },
    _rowCheckboxEvent: (dataItem: any) => {
      dataItem["selected"] = !dataItem["selected"];
      this.lstDocumentRevision._setCheckedAll();
    },
    _headerCheckboxEvent: () => {
      this.lstDocumentRevision.headerCheckBoxValue = !this.lstDocumentRevision
        .headerCheckBoxValue;
      this.lstDocumentRevision.Items.map((item: any) => {
        item["selected"] = this.lstDocumentRevision.headerCheckBoxValue;
      });
    },
    getDirtyItems: () => {
      let dirtyItemsList = [
        this.lstDocumentRevision.Items.filter((item: any) => {
          return item["isNewRow"] == true;
        }),
        this.lstDocumentRevision.Items.filter((item: any) => {
          return item["isNewRow"] == false && item["isDirtyRow"] == true;
        }),
        this.lstDocumentRevision.removedItems,
      ];
      if (!this.lstDocumentRevision._isDataValid()) {
        let index = dirtyItemsList.findIndex(
          (x: any) => x["uid"] == this.lstDocumentRevision.editedRowItem["uid"]
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
        if (this.lstDocumentRevision._isDataValid())
          this.lstDocumentRevision._closeEditableRow();
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
    this.lstDocumentRevision.Items=[]
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
  GetDocumentRevision_Completed(r){
    this.lstDocumentRevision =r

  }
  GetDocumentRevision_ErrorRaised(e) {}
  EditDocumentRevision(e){ let variables = { }; }
  DeleteDocumentRevision(e){ let variables = { }; }

  AddDocumentRevision(e) {
    this.router.navigate(["AddDocumentRevision"], { queryParamsHandling: "merge" });
  }




}
