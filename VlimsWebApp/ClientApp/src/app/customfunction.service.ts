import { Injectable } from '@angular/core';
import {UtilityService} from 'src/app/utility.service';
import {ApplicationContextService} from 'src/app/application-context.service';
import {ApiService} from 'src/app/api.service';
import { RolesDataEntity,RolePermissionInfo } from 'src/app/models/models';

@Injectable({
    providedIn: 'root'
})
export class CustomFunctionService  {
    

    constructor(public us: UtilityService, public appContext: ApplicationContextService,public apiServc:ApiService) {
    }

   ParseJson(value){
let variables = { };
if (this.hasValue(value)) {
   return JSON.parse(value);


}
else {
  return null;

}
}
GetOperatorNameBySymbol(pOperator){
let variables = { };
var operatorName:string=""
  
    switch (pOperator)
{
case ">":
operatorName = "GT";
break;
case "<":
operatorName = "LT";
break;
case ">=":
operatorName = "GE";
break;
case "<=":
operatorName = "LE";
break;
case "=":
operatorName = "EQ";
break;
case "!=":
operatorName ="NE";
break;
case "IN":
operatorName = "IN";
break;
case "NOTIN":
operatorName ="NOTIN";
break;
case "RANGE":
operatorName = "RANGE";
break;
case "AND":
operatorName = "AND";
break;
case "OR":
operatorName ="OR";
break;
case "IF EXISTS":
operatorName = "IFEXISTS";
break;
case "IF NOT EXISTS":
operatorName = "IFNOTEXISTS";
break;
default:
operatorName = "OR";
break;
  }
return operatorName;
}
GetEmptyGUID(){
let variables = { };
return '00000000-0000-0000-0000-000000000000';
}
ConvertInputBlocksToService(){
}
CheckGUIDEmptyOrNull(value){
let variables = { };
if (
      value == "" ||
      value == this.GetEmptyGUID() ||
      value == null ||
      value == undefined
    )
      return true;
    return false;
}
GetPagingInfoBasedOnData(data: any[], pageSize?: number) {
  let variables = {
    pageSize: 1//this.appContext.PageSize,
  };
  if (this.hasValue(pageSize) && pageSize > 0) variables.pageSize = pageSize;
  if (!this.hasValue(data)) return false;
  if (this.us.Length(data) <= variables.pageSize) return false;
  return { buttonCount: 3 };
}
GetRouteNameBasedOnCategory(CategoryID,Mode){
let variables =  {RouteName: '' };
switch (CategoryID) {
      //RATE TABLES & Lookup Tables
      case 32:
      case 72:
        variables.RouteName =
          Mode == "View" ? "ViewRateTable" : "AddRateTables";
        break;
      //DOMAIN TABLES
      case 71:
        variables.RouteName =
          Mode == "View" ? "AddDomainTable" : "AddDomainTable";
        break;
      //59 -	Schedule,60	- Risk,61	- Coverage,62	- Form,73	- RiskExtension,74	- Endorsement
      case 59:
      case 60:
      case 61:
      case 62:
      case 73:
      case 74:
        variables.RouteName =
         Mode == "View" ? "ProductModel" : "ProductModel";
        break;
      //64	ErrorMessages
      //65	PremiumCalculation
      //66	CommonRating
      //68	StatReporting
      //69	PolicyIndicator
      //70	PremiumRollups
      case 64:
      case 65:
      case 66:
      case 68:
      case 69:
      case 70:
        variables.RouteName =
          Mode == "View" ? "AddAlgorithm" : "AddAlgorithm";
        break;
      
    case 77:
      case 78:
      case 79:
      case 80:
      case 81:
      case 82:
      case 83:
      case 84:
      case 85:
        variables.RouteName =
          Mode == "View" ? "AddProductRule" : "AddProductRule";
        break;
      case 9:
        variables.RouteName = Mode == "View" ? "AddPricer" : "AddPricer";
        break;
      case 29:
      case 30:

        break;
      default:
        break;
    }
    return variables.RouteName;
}
hasValue(value){
let variables = { };
if(value==null||value==undefined||value=="")return false
return true
}
CheckUserPermissions(Category,Permission){
let variables =  {objroleInfo: new RolesDataEntity(),objRolePermissionInfo: new RolePermissionInfo(),roleIndex: 0,permIndex: 0,PermissionExists:true };
if (this.us.Length(this.appContext.UserPermissionsList) > 0) {
      for (
        variables.roleIndex;
        variables.roleIndex < this.appContext.UserPermissionsList.length;
        variables.roleIndex++
      ) {
        variables.objroleInfo = this.appContext.UserPermissionsList[
          variables.roleIndex
        ];
        if (
          this.hasValue(variables.objroleInfo) &&
          this.hasValue(variables.objroleInfo.RolePermission) &&
          this.hasValue(variables.objroleInfo.RolePermission.RolePermissionInfo)
        ) {
          if (
            this.us.Length(
              variables.objroleInfo.RolePermission.RolePermissionInfo
            ) > 0
          ) {
            for (
              variables.permIndex;
              variables.permIndex <
              variables.objroleInfo.RolePermission.RolePermissionInfo.length;
              variables.permIndex++
            ) {
              variables.objRolePermissionInfo =
                variables.objroleInfo.RolePermission.RolePermissionInfo[
                  variables.permIndex
                ];

              if (
                this.hasValue(variables.objRolePermissionInfo.Name) &&
                this.hasValue(variables.objRolePermissionInfo.Permission)
              ) {
                if (
                  variables.objRolePermissionInfo.Name.trim().toLocaleLowerCase() ===
                  Category
                ) {
                  if (
                    variables.objRolePermissionInfo.Permission.trim().toLocaleLowerCase() ===
                    'fullaccess'
                  ) {
                    variables.PermissionExists = true;
                  }
                  else if (
                    variables.objRolePermissionInfo.Permission.trim().toLocaleLowerCase() ===
                    Permission
                  ) {
                    variables.PermissionExists = true;
                  }else{
                    this.us.Show("You are Not Authorized","error");
                    variables.PermissionExists = false;
                    
                  }
                }
              }
            }
          }
        }
      }
    }
    return variables.PermissionExists;
}

}