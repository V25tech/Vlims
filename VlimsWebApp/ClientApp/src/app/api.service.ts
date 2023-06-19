
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerconfigService } from './core/serverconfig.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService { 
  constructor(public http:HttpClient,public serverconfig:ServerconfigService) {
  }

    GetChangesetbyChangeSetID = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetScenarioDetails = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Analysis') + url, data, this.GetOptions(headerdata));
		}
    GetDomainTableDataFields = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_DomianTables') + url, this.GetOptions(headerdata), data);
		}
    GetDimensions = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    SaveCity = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Country') + url, data, this.GetOptions(headerdata));
		}
    OverRidePlanMappings = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, data, this.GetOptions(headerdata));
		}
    GetRoleById = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    GetPlanVersionsForEditApprove = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetPlansForPlanFactors = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    GetApprovedInitiatives = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    DeleteVariables = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Rules') + url, this.GetOptions(headerdata), data);
		}
    ExportProductModel = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    UpdateUserInfo = function(url:string, headerdata:any, data:any){
	   return this.http.put(this.serverconfig.getBaseUrl('baseurl_Admin_IdentityServer') + url, data, this.GetOptions(headerdata));
		}
    savetransactiontypes = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetAllChanges = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetWhereUsedStructure = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetDomainTableData = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_DomianTables') + url, this.GetOptions(headerdata), data);
		}
    GetAllUsersIdentityServer = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Admin_IdentityServer') + url, this.GetOptions(headerdata), data);
		}
    GetAllRoles = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    GetAllWorkspaces = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    DeleteCountry = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Country') + url, this.GetOptions(headerdata), data);
		}
    SaveCountry = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Country') + url, data, this.GetOptions(headerdata));
		}
    DeleteBusinessEventByBusinessEventId = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    ManageProducts = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, data, this.GetOptions(headerdata));
		}
    ManageDomainTableColumnsMappings = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_DomianTables') + url, data, this.GetOptions(headerdata));
		}
    GetRateTableCategories = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_RateTables') + url, this.GetOptions(headerdata), data);
		}
    ValidateifPricerChangeEventExists = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetTestBedInfo = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    GetSnapshotWorkspacesbyStatus = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Reports') + url, this.GetOptions(headerdata), data);
		}
    GetPlanFactorsForPlanMapping = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    ManageLookupTableData = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_RateTables') + url, data, this.GetOptions(headerdata));
		}
    DeleteUser = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    GetAllTestBeds = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    GetAllUsers = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    GetGridDataForBomDesign = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    CreateModel = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Model') + url, data, this.GetOptions(headerdata));
		}
    DeleteState = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Country') + url, this.GetOptions(headerdata), data);
		}
    GetSummeryMetricsData = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Analysis') + url, this.GetOptions(headerdata), data);
		}
    GetInitiativeInfo = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    UpdateTransactionType = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetRateTables = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_RateTables') + url, this.GetOptions(headerdata), data);
		}
    ImportAttributes = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Model') + url, data, this.GetOptions(headerdata));
		}
    DeleteAllWorkflowStatus = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetWorkspacebyID = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetReleasePackageByReleaseId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    GetRateTableData = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_RateTables') + url, this.GetOptions(headerdata), data);
		}
    DeleteAllTransactionType = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetImportPackages = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetPricerFlowInfo = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Rules') + url, this.GetOptions(headerdata), data);
		}
    deleteTestSuites = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Testing') + url, data, this.GetOptions(headerdata));
		}
    DeleteWorkflowStatusByTransactionStatusId = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetLookUpTableDefination = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_RateTables') + url, this.GetOptions(headerdata), data);
		}
    ExportAttributes = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    ManagePlanMappings = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Testing') + url, data, this.GetOptions(headerdata));
		}
    GetPlanFactorsMap = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    GetDomainTableDefinationForCompareScreen = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_DomianTables') + url, this.GetOptions(headerdata), data);
		}
    GetWorkspaces = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetRuleFactors = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Analysis') + url, this.GetOptions(headerdata), data);
		}
    GetReferncePlanApprovedversions = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    ManageProductRuleData = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Rules') + url, data, this.GetOptions(headerdata));
		}
    DeleteProduct = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    UpdateWorkflowStatus = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetWorkflowItemByWorkflowStatusId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetGlobalVariables = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Rules') + url, this.GetOptions(headerdata), data);
		}
    GetPlans = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetAllProducts = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetPlansForReleasePlans = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Publish') + url, this.GetOptions(headerdata), data);
		}
    GetAllWorkflowStatus = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetGridDataForPlanDesign = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetChangesByTypeForDropDown = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    WorkspaceAutoApprove = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, data, this.GetOptions(headerdata));
		}
    ManageEnvironment = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Admin') + url, data, this.GetOptions(headerdata));
		}
    SaveState = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Country') + url, data, this.GetOptions(headerdata));
		}
    DeleteInitiative = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    DeleteCity = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Country') + url, this.GetOptions(headerdata), data);
		}
    GetPlanFactorsByPlanModelId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    VerifyIfVersionExists = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetAttributeTypes = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    GetReturnFactorMappedWorkSpaces = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    ProductSpecificationReportGeneration = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Inquire') + url, data, this.GetOptions(headerdata));
		}
    savetransactionstatus = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetRoleCategoriesInfo = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    UpdateInitiativeStatus = function(url:string, headerdata:any, data:any){
	   return this.http.put(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, data, this.GetOptions(headerdata));
		}
    GetVersionNumbersForDropDown = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    ManageWorspace = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, data, this.GetOptions(headerdata));
		}
    DeleteRole = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    GetTestbedChangeEventsPlanversion = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    GetPlanVersionsForModel = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    GetAllStates = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Country') + url, this.GetOptions(headerdata), data);
		}
    GetModelData = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_dev') + url, this.GetOptions(headerdata), data);
		}
    GetImpactPoliciesAndPremium = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Analysis') + url, data, this.GetOptions(headerdata));
		}
    DeleteWorkflowItemByWorkflowStatusId = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetAllCountries = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Country') + url, this.GetOptions(headerdata), data);
		}
    ManageReleasePlan = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Publish') + url, data, this.GetOptions(headerdata));
		}
    DeleteChangeset = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    ExcutePublish = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('ExcutePublish_url') + url, data, this.GetOptions(headerdata));
		}
    ManageFactors = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Testing') + url, data, this.GetOptions(headerdata));
		}
    ManageLookupTableDefinition = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_RateTables') + url, data, this.GetOptions(headerdata));
		}
    DeleteReport = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Reports') + url, data, this.GetOptions(headerdata));
		}
    ManageFilebasePackage = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Testing') + url, data, this.GetOptions(headerdata));
		}
    SaveWorkFlowStatus = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetApprovedPlansInfo = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_dev') + url, this.GetOptions(headerdata), data);
		}
    GetProductRuleDefInfo = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Rules') + url, this.GetOptions(headerdata), data);
		}
    GetplansbyChangesets = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    ManageProductRuleDefInfo = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Rules') + url, data, this.GetOptions(headerdata));
		}
    ManagePlanFactorsMap = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Testing') + url, data, this.GetOptions(headerdata));
		}
    UpdateScheduler = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetMappedWorkspacesbyBrqId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetScenarios = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Analysis') + url, this.GetOptions(headerdata), data);
		}
    ManageRoles = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Admin') + url, data, this.GetOptions(headerdata));
		}
    GetAllBusinessEvents = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetTemplates = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Reports') + url, this.GetOptions(headerdata), data);
		}
    GetDomainTableColumnMappings = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_DomianTables') + url, this.GetOptions(headerdata), data);
		}
    ApproveWorkspace = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, data, this.GetOptions(headerdata));
		}
    DeleteAllWorkflowItem = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetRateTablesByDataId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_RateTables') + url, this.GetOptions(headerdata), data);
		}
    GetBusinessEventByBusinessEventId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetModels = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetPricer = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Rules') + url, this.GetOptions(headerdata), data);
		}
    GetEnvironmentById = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    GetAllTransactionStatus = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetFactorsForPlanFactors = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    GetAppovedPlans = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetProductInfoById = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetPublishEnvironments = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('publish_url') + url, this.GetOptions(headerdata), data);
		}
    GetPricerList = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Rules') + url, this.GetOptions(headerdata), data);
		}
    GetBomModel = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    ManageChangeset = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, data, this.GetOptions(headerdata));
		}
    GetAllSnapshotEntitiesByType = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Reports') + url, this.GetOptions(headerdata), data);
		}
    GetBookDetailsByLOB = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Analysis') + url, this.GetOptions(headerdata), data);
		}
    GetAllDomainTables = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_DomianTables') + url, this.GetOptions(headerdata), data);
		}
    GetChanges = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    DeleteEnvironment = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    GetTransactionTypeByTransactionTypeId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    Sample = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Sample') + url, this.GetOptions(headerdata), data);
		}
    GetChangesetsbyWorkSpaceID = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    ManageDomainTableData = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_DomianTables') + url, data, this.GetOptions(headerdata));
		}
    ApproveEditApproveInitiative = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, data, this.GetOptions(headerdata));
		}
    DeleteAllBusinessEvent = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    DeleteWorkSpace = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetCityByCityId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Country') + url, this.GetOptions(headerdata), data);
		}
    GenerateProductComparisonReport = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Inquire') + url, data, this.GetOptions(headerdata));
		}
    ValidateProductNameMapping = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    ManageImportPackage = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, data, this.GetOptions(headerdata));
		}
    GetAllScheduler = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    TestReportGeneration = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Inquire') + url, data, this.GetOptions(headerdata));
		}
    GetGeneralInquireGRID = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetWhereUsedDetails = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    DeleteSchedulerBySchedulerId = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    DeleteWorkSpaceEntities = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, data, this.GetOptions(headerdata));
		}
    GetMatchedRateTableInfo = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    DeleteChangesFromChangeSet = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, data, this.GetOptions(headerdata));
		}
    ManageEditApproveMappings = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, data, this.GetOptions(headerdata));
		}
    GetAllInitiatives = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetVersionNumbers = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetAlgorithms = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Rules') + url, this.GetOptions(headerdata), data);
		}
    GetAllTransactionTypes = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetFactorGroupByType = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    Pricer = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Rules') + url, data, this.GetOptions(headerdata));
		}
    GetModelEntityBasedOnversion = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    GetBomTypes = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    GetBomFactor = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    OverRideEditApproveMappings = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, data, this.GetOptions(headerdata));
		}
    DeleteTransactionTypeByTransactionTypeId = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetUsersForInitiatives = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    GetStateByStateId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Country') + url, this.GetOptions(headerdata), data);
		}
    GetRulesDefinationInfo = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Rules') + url, this.GetOptions(headerdata), data);
		}
    GetAllEnvironments = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    GetDimensionGrid = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_RateTables') + url, this.GetOptions(headerdata), data);
		}
    ManagePricerFlowDefinition = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Rules') + url, data, this.GetOptions(headerdata));
		}
    GetLooupDefinationForCompareScreen = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_RateTables') + url, this.GetOptions(headerdata), data);
		}
    SaveScheduler = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetWhereUsedEntities = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, data, this.GetOptions(headerdata));
		}
    savebusinessevents = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetModelsForDropDown = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    ManageReport = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Reports') + url, data, this.GetOptions(headerdata));
		}
    GetMappingEntityDetails = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    DeleteAllScheduler = function(url:string, headerdata:any, data:any){
	   return this.http.delete(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetAllCities = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Country') + url, this.GetOptions(headerdata), data);
		}
    GetRateTableByDataId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_RateTables') + url, this.GetOptions(headerdata), data);
		}
    ManagePricer = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Rules') + url, data, this.GetOptions(headerdata));
		}
    GetDomainTableInfo = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_DomianTables') + url, this.GetOptions(headerdata), data);
		}
    GetWorkflowStatusByTransactionStatusId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetFormRuleAttachments = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Rules') + url, this.GetOptions(headerdata), data);
		}
    GetMappedWorkspacesOrPlanDetailsOfEntity = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Reports') + url, this.GetOptions(headerdata), data);
		}
    GetCountryByCountryId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Country') + url, this.GetOptions(headerdata), data);
		}
    ManageInitiative = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, data, this.GetOptions(headerdata));
		}
    GetScenariosSandbox = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Analysis') + url, this.GetOptions(headerdata), data);
		}
    ManageTestBed = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Testing') + url, data, this.GetOptions(headerdata));
		}
    GetAllParentPaths = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    GetRuleValues = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Analysis') + url, data, this.GetOptions(headerdata));
		}
    GetWorkspacesForDropDown = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetProductRuleDataDynamicGrid = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Rules') + url, this.GetOptions(headerdata), data);
		}
    UpdateBusinessEvent = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    GetSnapshotUnmappedEntities = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Reports') + url, this.GetOptions(headerdata), data);
		}
    GetSchedulerBySchedulerId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetSchemaByModelId = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Reports') + url, this.GetOptions(headerdata), data);
		}
    CopyChangestoWorkspace = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, data, this.GetOptions(headerdata));
		}
    GetInitiativesGRID = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetModel = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    DeletePlanFactorsByPlanModelIdDetID = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    SaveGlobalVariable = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Rules') + url, data, this.GetOptions(headerdata));
		}
    ManageUsers = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Admin') + url, data, this.GetOptions(headerdata));
		}
    GetReports = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Analysis') + url, this.GetOptions(headerdata), data);
		}
    GetUserById = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Admin') + url, this.GetOptions(headerdata), data);
		}
    GetPlansForDropDown = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Initiatives') + url, this.GetOptions(headerdata), data);
		}
    GetDistinctTypes = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    ManageTemplate = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Reports') + url, data, this.GetOptions(headerdata));
		}
    ManageDomainTable = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_DomianTables') + url, data, this.GetOptions(headerdata));
		}
    GetSnapshotPlansInfobyChangeevent = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Reports') + url, this.GetOptions(headerdata), data);
		}
    GetPredefinedAttributes = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    GetReleasePackages = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Testing') + url, this.GetOptions(headerdata), data);
		}
    GetAppovedWorkspaces = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    ManageUsersIdentityServer = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_Admin_IdentityServer') + url, data, this.GetOptions(headerdata));
		}
    GetFactorById = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Model') + url, this.GetOptions(headerdata), data);
		}
    UpdateWorkflowItem = function(url:string, headerdata:any, data:any){
	   return this.http.post(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, data, this.GetOptions(headerdata));
		}
    ValidateEntityName = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetWorkflowItemByWorkflowStatusName = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_ProcessCenter') + url, this.GetOptions(headerdata), data);
		}
    GetApprovedWorkspace = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    GetChangeEventsInfo = function(url:string, headerdata:any, data:any){
	   return this.http.get(this.serverconfig.getBaseUrl('baseurl_Workspaces') + url, this.GetOptions(headerdata), data);
		}
    private GetOptions(headers: any) {
    const options = {
      responseType: (typeof headers["responsetype"] != "undefined" ? headers['responsetype'] : "json"),
      observe: (typeof headers["observe"] != "undefined" ? headers['observe'] : "body")
    }
    delete headers["responsetype"];
    delete headers["observe"];
    options["headers"] = new HttpHeaders(headers);
    return options;
  }
}
