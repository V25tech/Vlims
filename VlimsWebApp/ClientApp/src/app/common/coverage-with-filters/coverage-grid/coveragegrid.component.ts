import { Component, OnDestroy, Output, EventEmitter, ViewChild, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ValidatorService } from 'src/app/core/validator.service';
import { Subscription } from 'rxjs';
import { CoverageDataBusService } from '../coverage-services/coveragedatabus.service';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from 'src/app/utility.service';


@Component({
  selector: 'coverage-grid',
  templateUrl: './coveragegrid.component.html',
  animations: [trigger('animationOption', [
    transition(':enter', [
      style({ backgroundColor: 'white' }),
      animate(300)
    ]),
    transition(':leave', [
      animate(300)
    ]),
    state('*', style({ backgroundColor: '#f7f7f7' })),
  ])]
})
export class CoverageGridComponent {


  @Input('editMode') editMode: boolean;
  @Input('interactiveConfigurationURL') interactiveConfigurationURL: string;
  @Input('Decimal') Decimal: number;
  @Input('Currency') Currency: number;
  @Input('headers') headers: any;

  @Output('saveCoverages') emitValidCoverages: EventEmitter<any> = new EventEmitter<any>();
  @Output('ISolverMessages') solverMessages: EventEmitter<any> = new EventEmitter<any>();
  @Output('CancelCov') CancelCov: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('coverageForm', null) public coverageForm: any;

  coveragesDisplayCount: any;
  SearchAvailable: boolean;
  Subscription: Subscription = new Subscription();
  RiskInstancePresent: boolean = true;
  CoveragesPresent: boolean = true;
  coverageLoading: boolean = false;
  queryString: string = "";
  coveragesOptions: string[] = ["All Coverages", "Mandatory Coverages", "Optional Coverages", "Selected Coverages"];
  coverageSelected = this.coveragesOptions[0];
  coverages: any = [];
  riskDetails: any;
  backupCoverages: any;
  HideCoverageGrid: boolean;
  formReseting: boolean = false;
  constructor(
    public vs: ValidatorService,
    private coveragedataService: CoverageDataBusService,
    private http: HttpClient,
    public us: UtilityService,
    private cdr: ChangeDetectorRef
  ) {
    try {
      this.Subscription.add(this.coveragedataService.getCoverages().subscribe(message => {
        this.coverages = [];
        this.RiskInstancePresent = true;
        this.CoveragesPresent = true;
        this.HideCoverageGrid = true;
        this.SearchAvailable = true;
        this.resetSearch();
        if (message.data == "coveragesLoadingStarted") this.coverageLoading = true;
        if (message.data == "coveragesLoadingEnd") this.coverageLoading = false;
        if (Array.isArray(message.data) == true) {
          this.coverages = message.data;
          if (this.coverages.length == 0)
            this.CoveragesPresent = false;
          this.riskDetails = {
            riskId: this.coverages.riskId,
            riskType: this.coverages.riskType,
          }
          this.backupCoverages = this.deepCopyCoverage(this.coverages);
        } else {
          this.coverages = [];
          if (message.data == "noRiskInstance")
            this.RiskInstancePresent = false;
          if (message.data == "noCoverages")
            this.CoveragesPresent = false;
        }
        if (this.coverages.length > 0) {
          this.HideCoverageGrid = false;
        } else {
          this.HideCoverageGrid = true;
        }
      }));
    } catch (ex) {
      this.us.Show("something went wrong", "error");
    }

  }
  ExecuteISolver(parent: any, executor: any, executedOn?: any) {
    if (this.interactiveConfigurationURL == "" || this.interactiveConfigurationURL == undefined) {
      return;
    }
    if (executedOn != "coverage" && !executor.UserValue) {
      return;
    }
    let postObject = {};
    if (executedOn == 'coverage') {
      postObject = {
        Id: parent.Id,
        Name: parent.Name,
        Value: parent.IsSelected,
        Type: 'coverage',
        Parent: '',
        RuleType: parent.RuleType,
        ParentName: ''
      };
    } else {
      postObject = {
        Id: executor.Id,
        Name: executor.Name,
        Value: executor.UserValue,
        Type: "Attribute",
        Parent: parent.Id,
        RuleType: executor.RuleType,
        ParentName: parent.Name
      };
    }
    try {
      this.Subscription.add(this.http.post(this.interactiveConfigurationURL, postObject, { headers: this.headers }).subscribe((response: any) => {
        if (response.Details != null && response.Details.length > 0) {
          this.updateCoveragesAttributes(response);
        }
        if (response.Coverages != null) {
          if (response.Coverages.length > 0) {
            response.Coverages.filter(newCoverage => {

              let isCoverageAlreadyExist = this.isCoverageAvailable(newCoverage.Id);
              if (isCoverageAlreadyExist) {
                if (newCoverage.IsDeleted) {
                  this.deleteExistingCoverage(newCoverage);
                }
                if (newCoverage.IsAdded) {
                  this.updateExistingCoverage(newCoverage);
                }
              }
              if (newCoverage.IsAdded && !isCoverageAlreadyExist) {
                this.addNewCoverage(newCoverage);
              }
              this.updateSVMflags(newCoverage);
            })
          }
        }
        if (response.Messages != null) {
          this.solverMessages.emit(response.Messages);
        }
      }, error => {
        this.us.Show("ISolver not executed successfully" + error.message, "error");
      }))
    } catch (ex) {
      this.us.Show(ex.message, "error");
    }
  }


  changeCoverageFilterType(event) {
    this.searchcoverages(this.queryString, this.coverageSelected);
  }

  searchCoverage() {
    if (this.queryString.length == 0 || this.queryString.length > 3) {
      this.searchcoverages(this.queryString, this.coverageSelected);
    }
  }

  resetSearch() {
    this.queryString = "";
    this.coverages.forEach(function (item) {
      item.Searched = true;
    })
    this.coverageSelected = this.coveragesOptions[0];
  }
  resetSearchInput() {
    this.searchcoverages(this.queryString = "", 'All Coverages');
    this.resetSearch();
  }
  searchcoverages(searchstring: string, type: string) {
    let count = 0;
    if (type == "Mandatory Coverages") {
      this.coverages.forEach(ele => {
        if (ele.IsMandatory != false && ele.DisplayName.toLowerCase().includes(searchstring.toLowerCase()) && ele.IsVisible) {
          ele.Searched = true;
          count++;
        }
        else {
          ele.Searched = false;
        }
      });
    } else if (type == "Optional Coverages") {
      this.coverages.forEach(ele => {
        if (ele.IsMandatory != true && ele.DisplayName.toLowerCase().includes(searchstring.toLowerCase()) && ele.IsVisible) {
          ele.Searched = true;
          count++;
        }
        else {
          ele.Searched = false;
        }
      });
    } else if (type == "Selected Coverages") {
      this.coverages.forEach(ele => {
        if (ele.IsSelected != false && ele.DisplayName.toLowerCase().includes(searchstring.toLowerCase()) && ele.IsVisible) {
          ele.Searched = true;
          count++;
        }
        else {
          ele.Searched = false;
        }
      });
    }
    else {
      this.coverages.forEach(function (item) {
        if (item.DisplayName.toLowerCase().includes(searchstring.toLowerCase()) && item.IsVisible) {
          item.Searched = true;
          count++;
        } else {
          item.Searched = false;
        }
      });
    }
    if (count > 0) {
      this.SearchAvailable = true;
      this.HideCoverageGrid = false;
    } else {
      this.SearchAvailable = false;
      this.HideCoverageGrid = true;
    }
  }
  resetCoverageForm() {
    this.formReseting = true;
    this.resetSearch();
    // this.vs.markFormUntouched(formObj.form);
    this.coverageForm.reset();
    this.coverages = this.deepCopyCoverage(this.backupCoverages);
    this.CancelCov.emit();
    setTimeout(() => {
      this.formReseting = false;
    }, 10);
  }

  saveCoverages() {
    if (this.coverageForm.form.valid) {
      let emitObj = {
        Id: this.riskDetails.riskId,
        Type: this.riskDetails.riskType,
        covList: this.coverages
      }
      this.emitValidCoverages.emit(emitObj);
    } else {
      this.markFormTouchedAndExpandCov();
    }
  }
  getFormat(format: string, datatype: string) {
    if (datatype == "Numeric" || datatype == "Integer") {
      if (format == 'currency') {
        return "c0";
      }
      else {
        return "n0";
      }
    }
    else {
      if (format == 'currency') {
        return "c" + this.Currency;
      }
      else {
        return "n" + this.Decimal;
      }
    }
  }

  getDecimalPrecisionLength(format: string, datatype: string) {
    if (datatype == "Numeric" || datatype == "Integer") {
      return 0;
    }
    else {
      if (format == 'currency') {
        return this.Currency;
      }
      else {
        return this.Decimal;
      }
    }
  }
  covIdTracker(index, item) {
    return index + item.Id;
  }

  makeEmpty(attr) {
    if (attr.UserValue == "Please select") {
      attr.UserValue = "";
    }
  }

  getDateObj(dateString) {
    return new Date(dateString);
  }

  deepCopyCoverage(originalCoverage): any {
    var tempArray = JSON.parse(JSON.stringify(originalCoverage))
    tempArray.forEach(y => {
      if (y.Attributes != null) {
        y.Attributes.forEach(z => {
          if (z.ControlType == 'DateTime' || z.ControlType == 'DatePicker') {
            if (z.UserValue != null && z.UserValue != "") {
              z.UserValue = new Date(z.UserValue)
            }
          }
        })
      }
    })
    return tempArray;
  }
  isCoverageAvailable(coverageId: String) {
    return this.coverages.find(coverage => { return coverage.Id == coverageId }) ? true : false;
  }
  updateCoveragesAttributes(response) {
    response.Details.filter((newAtts: any) => {
      this.coverages.filter((oldCoverages: any) => {
        if (oldCoverages.Attributes != null) {
          oldCoverages.Attributes.filter((oldAtts: any) => {
            if (newAtts.Id == oldAtts.Id) {
              if (newAtts.ControlType == 'DateTime' || newAtts.ControlType == 'DatePicker') {
                if (newAtts.UserValue != null && newAtts.UserValue != "") {
                  newAtts.UserValue = new Date(newAtts.UserValue)
                }
              }
              if ((newAtts.DataType == "Numeric" || newAtts.DataType == "Integer" || newAtts.DataType == "Decimal") && newAtts.UserValue != null && newAtts.UserValue != "" || (isNaN(parseFloat(newAtts.UserValue)) == false)) {
                newAtts.UserValue = parseFloat(newAtts.UserValue)
              }
              if (newAtts.UIRuleIndicator == true) {
                oldAtts.IsEnabled = newAtts.IsEnabled;
                oldAtts.IsVisible = newAtts.IsVisible;
              }
              if (newAtts.ProductChoicesIndicator == true) {
                if (newAtts.Values != null) {
                  oldAtts.Values = newAtts.Values;
                  if (newAtts.Values.indexOf(oldAtts.UserValue) > -1) {
                    newAtts.UserValue = oldAtts.UserValue;
                  } else {
                    oldAtts.UserValue = '';
                  }
                }
                if (newAtts.UserValue != null && newAtts.UserValue != '') {
                  oldAtts.UserValue = newAtts.UserValue;
                }
                if (newAtts.Min != null && newAtts.Min != '') {
                  oldAtts.Min = newAtts.Min;
                  if (parseFloat(oldAtts.UserValue) < parseFloat(newAtts.Min)) {
                    oldAtts.UserValue = newAtts.Min;
                  }
                }
                if (newAtts.Max != null && newAtts.Max != '') {
                  oldAtts.Max = newAtts.Max;
                  if (parseFloat(oldAtts.UserValue) > parseFloat(newAtts.Max)) {
                    oldAtts.UserValue = newAtts.Max;
                  }
                }
              }
            }
          })
        }

      })
    })
  }

  deleteExistingCoverage(coverage: any) {
    let index = 0;
    for (var value of this.coverages) {
      if (coverage.Id == value.Id) {
        this.coverages.splice(index, 1);
        break;
      }
      index++
    }

  }
  updateExistingCoverage(newCoverage: any) {
    this.coverages.filter(oldCoverage => {
      if (oldCoverage.Id == newCoverage.Id) {
        if (oldCoverage.Attributes != null && newCoverage.Attributes != null) {
          oldCoverage.Attributes.filter(oldAttr => {
            for (var attribute of newCoverage.Attributes) {
              if (oldAttr.Id == attribute.Id && oldAttr.IsActionable) {
                oldAttr.UserValue = attribute.UserValue;
                break;
              }
            }
          })
        }

      }
    })
  }
  updateSVMflags(newCoverage: any) {
    this.coverages.filter(oldCoverage => {
      if (newCoverage.Id == oldCoverage.Id) {
        if (newCoverage.ProductChoicesIndicator) {
          oldCoverage.IsSelected = newCoverage.IsSelected;
          oldCoverage.IsMandatory = newCoverage.IsMandatory;
        }
        if (newCoverage.UIRuleIndicator) {
          oldCoverage.IsVisible = newCoverage.IsVisible;
        }
      }
    })
  }
  addNewCoverage(newCoverage: any) {
    newCoverage.IsExpanded = false;
    newCoverage.Searched = true;
    if (newCoverage.Attributes != null) {
      newCoverage.Attributes.filter(newAttr => {
        newAttr.IsDTxInvalid = false;
        if (newAttr.ControlType == 'DateTime' || newAttr.ControlType == 'DatePicker') {
          if (newAttr.UserValue != null && newAttr.UserValue != "") {
            newAttr.UserValue = new Date(newAttr.UserValue)
          }
        }
        if ((newAttr.DataType == "Numeric" || newAttr.DataType == "Integer" || newAttr.DataType == "Decimal") && newAttr.UserValue != null && newAttr.UserValue != "") {
          newAttr.UserValue = parseFloat(newAttr.UserValue)
        }
      })
    }
    this.coverages.push(newCoverage)
  }
  markFormTouchedAndExpandCov() {
    this.vs.Validate(this.coverageForm.form);
    this.coverages.forEach(coverage => {
      if (coverage.IsSelected) {
        coverage.IsExpanded = true;
      }
    })
  }
  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

}
