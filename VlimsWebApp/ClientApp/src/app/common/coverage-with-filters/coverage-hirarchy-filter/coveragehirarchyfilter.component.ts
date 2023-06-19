import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { RisksDataBusService } from '../coverage-services/risksdatabus.service';
import { CoverageHirarchyfilterService } from '../coverage-services/coveragehirarchyfilter.service';
import { CoverageGridComponent } from '../coverage-grid/coveragegrid.component';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'risk-hirarchy-filter',
  templateUrl: './coverageHirarchyFilter.component.html'
})
export class RiskHirarchyfilterComponent implements OnInit {
  @Input('uriParamters') uriParamters: any[];
  @Input('riskFilters') riskFilters: any[];
  @Input('data') item: any;
  @Input('coverageGrid') coverageGrid: CoverageGridComponent;

  @Output('filterchange') chagne: EventEmitter<any> = new EventEmitter<any>();
  @Output('activatefilter') activatefilter: EventEmitter<any> = new EventEmitter<any>();
  @Output('refreshFilters') refreshFilters: EventEmitter<any> = new EventEmitter<any>();



  constructor(
    public coverageservice: CoverageHirarchyfilterService,
    public us: UtilityService,
    private broadcastRiskinstance: RisksDataBusService
  ) {

  }
  changevalue(value, index) {
    let obj = {
      value: value,
      index: index
    }
    let length = this.item.filterdata.length;
    if (length - 1 > index) {
      this.item.filterdata[index + 1].filteritems = [];
      if (obj.value !== '') {
        this.item.filterdata[index + 1].items.forEach(element => {
          if (element.parentid == obj.value) {
            this.item.filterdata[index + 1].filteritems.push({ DisplayName: element.Name, Id: element.Id });
            this.item.filterdata[index + 1].value = null;
          }
        });
        index += 2;
      }
      else
        index += 1;
      for (; index < length; index++) {
        this.item.filterdata[index].filteritems = [];
        this.item.filterdata[index].items.forEach(element => {
          this.item.filterdata[index].filteritems.push({ DisplayName: element.Name, Id: element.Id });
        });
        this.item.filterdata[index].value = null;
      }
    }
    this.item.filterdata[obj.index].value = obj.value;
  }

  filterchange() {
    if (this.coverageGrid && (this.coverageGrid.coverageForm && this.coverageGrid.coverageForm.dirty)) {
      this.us.Confirmation('"You have some unsaved changes, are you sure you  want to proceed?').subscribe(confirmed => {
        if (confirmed) {
          this.filter();
        }
      });
    } else {
      this.filter();
    }
  }

  filter() {
    let filterdisplayname = [];
    this.item.filterdata.forEach(element => {
      if (element.value != null) {
        filterdisplayname.push(element.filteritems.find(x => x.Id == element.value).DisplayName)
      }
    });
    let filteredRisksById = this.item.riskInstances
      .filter(instanse => instanse.parentid == this.item.filterdata[this.item.filterdata.length - 1].value)
    this.broadcastRiskinstance.sendFilteredRisks({
      'riskInstances': filteredRisksById,
      'isPolicy': false
    });
    this.chagne.emit({
      filterby: filterdisplayname.join(),
    });
  }
  clear() {
    this.item.filterdata.forEach(element => {
      element.value = undefined;
      element.filteritems = element.items;
    });
  }
  ActivateFilter(item) {
    if (this.coverageGrid && (this.coverageGrid.coverageForm && this.coverageGrid.coverageForm.dirty)) {
      this.us.Confirmation('"You have some unsaved changes, are you sure you  want to proceed?').subscribe(confirmed => {
        if (confirmed) {
          this.activate(item);
        }
      });
    } else {
      this.activate(item);
    }
  }
  activate(item) {
    if (item.filterdata.length > 0) {
      item.filterdata.forEach(element => {
        element.items = this.coverageservice.GetRiskDatasource(element.Type);
        element.filteritems = this.coverageservice.GetRiskDatasource(element.Type);
        element.value = null;
      });

    }
    let activatedFilterData = {
      filterby: item.DisplayName,
      index: item.index,
    }

    this.broadcastRiskinstance.sendFilteredRisks({
      'riskInstances': item.riskInstances,
      'isPolicy': item.IsPolicy
    });
    this.activatefilter.emit(activatedFilterData);
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    if (this.item.index == this.riskFilters.length - 1) {
      window.setTimeout(() => {
        this.ActivateFilter(this.riskFilters[0]);
      })
    }
  }

}
