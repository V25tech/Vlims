import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ValidatorService } from 'src/app/core/validator.service';
import { Subscription } from 'rxjs';
import { RisksDataBusService } from '../coverage-services/risksdatabus.service';
import { CoverageDataBusService } from '../coverage-services/coveragedatabus.service';
import { HttpClient } from '@angular/common/http';
import { CoverageGridComponent } from '../coverage-grid/coveragegrid.component';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'risk-dropdown-filter',
  templateUrl: './riskdropdownfilter.component.html'
})

export class RiskFilterComponent implements OnInit, OnDestroy {
  @Input('uriParamters') uriParamters: any[];
  @Input('coverageURL') coverageURL: string;
  @Input('headers') headers: any;
  @Input('coverageGrid') coverageGrid: CoverageGridComponent;

  riskInstances: any[] = [];
  Subscription: Subscription = new Subscription();
  riskArrayIndex: number = 0;
  hidePolicyFilter: boolean = false;
  showNoRImessage: boolean = false;
  SelectedRisk: any;
  constructor(
    public vs: ValidatorService,
    private coveragedataService: CoverageDataBusService,
    private filterDataMessage: RisksDataBusService,
    public us: UtilityService,
    private http: HttpClient
  ) {
  }
  ngOnInit() {
    try {
      this.Subscription.add(this.filterDataMessage.getFilteredRisks().subscribe(message => {
        this.SelectedRisk = {};
        this.riskInstances = [];
        this.riskArrayIndex = 0;
        if (message.data.riskInstances.length > 0 && message != undefined) {
          this.riskInstances = message.data.riskInstances;
          this.SelectedRisk = message.data.riskInstances[0];
          this.showNoRImessage = false;
          this.hidePolicyFilter = message.data.isPolicy;
          this.getCoverages(message.data.riskInstances[0]);

        } else {
          this.hidePolicyFilter = true;
          this.showNoRImessage = true;
          this.coveragedataService.sendCoverages('noRiskInstance');
        }
      }));
    } catch (ex) {
      this.us.Show("Something went wrong" + ex, "error");
    }
  }

  getCoverages(riskObject: any) {
    try {
      this.coveragedataService.sendCoverages('coveragesLoadingStarted');
      this.Subscription.add(this.http.get(this.coverageURL.replace(/{RiskId}/ig, riskObject.Id).replace(/{RiskType}/ig, riskObject.Type), { headers: this.headers }).subscribe((response: any) => {
        this.coveragedataService.sendCoverages('coveragesLoadingEnd');
        if (response != null) {
          if (response.length > 0) {
            response.forEach(x => {
              x.IsExpanded = false;
              x.Searched = true;
              if (x.Attributes != null) {
                x.Attributes.forEach(y => {
                  y.IsDTxInvalid = false;
                  if (y.ControlType == 'DateTime' || y.ControlType == 'DatePicker') {
                    if (y.UserValue != null && y.UserValue != "") {
                      y.UserValue = new Date(y.UserValue)
                    }
                  }
                  if ((y.DataType == "Numeric" || y.DataType == "Integer" || y.DataType == "Decimal") && y.UserValue != null && y.UserValue != "") {
                    y.UserValue = parseFloat(y.UserValue)
                  }
                })
              }
            })
            response.riskId = riskObject.Id;
            response.riskType = riskObject.Type;
            this.coveragedataService.sendCoverages(response);
          } else {
            this.coveragedataService.sendCoverages('noCoverages');
          }
        } else {
          this.coveragedataService.sendCoverages('noCoverages');
        }

      }, error => {
        this.us.Show("Something went wrong -" + error.statusText, "error");
      }));
    } catch (ex) {
      this.us.Show("Something went wrong -" + ex, "error");
    }
  }
  riskInstanceChange() {

    if (this.coverageGrid && this.coverageGrid.coverageForm && this.coverageGrid.coverageForm.dirty) {
      this.us.Confirmation('"You have some unsave changes, are you sure you  want to proceed?').subscribe(confirmed => {
        if (confirmed) {
          this.riskChange();
        }
      });
    }
    else {
      this.riskChange();
    }

  }
  riskChange() {
    if (this.riskInstances.length > 0) {
      let riskObject = this.getSelectedRiskInstance(this.SelectedRisk.Id);
      this.riskArrayIndex = this.riskInstances.findIndex(x => x.Id == riskObject.Id);
      this.getCoverages(riskObject);
    }
  }
  toggleDropdownValue(direction: string) {
    if (this.coverageGrid && this.coverageGrid.coverageForm && this.coverageGrid.coverageForm.dirty) {
      this.us.Confirmation('"You have some unsave changes, are you sure you  want to proceed?').subscribe(confirmed => {
        if (confirmed) {
          this.toggleRisk(direction);
        }
      });

    }
    else {
      this.toggleRisk(direction);
    }
  }
  toggleRisk(direction: string) {
    try {
      if (direction == "forward" && (this.riskArrayIndex !== this.riskInstances.length - 1)) {
        this.riskArrayIndex++;
        this.SelectedRisk = this.riskInstances[this.riskArrayIndex];
        this.getCoverages(this.getSelectedRiskInstance(this.SelectedRisk.Id));
      }
      if (direction == "backward" && this.riskArrayIndex != 0) {
        this.riskArrayIndex--;
        this.SelectedRisk = this.riskInstances[this.riskArrayIndex];
        this.getCoverages(this.getSelectedRiskInstance(this.SelectedRisk.Id));
      }
    } catch (error) {
      this.us.Show("Something went wrong -" + error, "error");
    }
  }

  getSelectedRiskInstance(riskID: any): any {
    return this.riskInstances.filter(ele => { return ele.Id == riskID })[0];
  }


  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}


