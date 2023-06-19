import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoverageHirarchyfilterService {
  constructor() { }
  RiskHierarchy: any = {};
  GetRiskDatasource(type: string) {
    return this.RiskHierarchy[type] ? this.RiskHierarchy[type] : [];
  }
  AddRiskHierarchyItems(items: Array<any>, type: string) {
    this.RiskHierarchy[type] = items;
  }

  getHierarchy(json: any) {
    let filterdata = [];
    function getFilterTemplateData(risks, parentrisks) {
      risks.forEach(element => {
        element.filterdata = parentrisks;
        let parentr = Array();
        if (!element.IsPolicy) {
          parentr = parentr.concat(parentrisks);
          parentr.push(element);
        }
        if (element.RisksHierarchy != null && element.RisksHierarchy.length > 0)
          getFilterTemplateData(element.RisksHierarchy, parentr)
        delete element.RisksHierarchy;
        filterdata.splice(0, 0, element);
      });
    }
    let obj = { RiskHierarchy: {} };
    function loadrisks(risks, parentid) {
      risks.forEach(element => {
        if (element.Risks != null && element.Risks.length > 0)
          loadrisks(element.Risks, element.Id);
        delete element.Risks;
        if (!obj.RiskHierarchy[element.Type]) {
          obj.RiskHierarchy[element.Type] = [];
        }

        element.parentid = parentid;
        obj.RiskHierarchy[element.Type].push(element);
      });
    }

    loadrisks(json.Risks, 0);
    this.RiskHierarchy = obj.RiskHierarchy;
    getFilterTemplateData(json.RisksHierarchy, []);
    return filterdata;
  }
}
