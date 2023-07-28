export class RequestContext {
  public PageNumber :number=0;
  public PageSize: number=0;
  public Id: number=0;
}
export class dashboardconfiguration {
  dCId: string=''
  documentMasterId: string=''
  createdBy: string=''
  createdDate: string | null='';
  modifiedBy: string=''
  modifiedDate: string | null='';
  Status: string | null='';
}

export class DocumentTypeConfiguration {
  DTCId: string=''
  DocumentMasterId: string=''
  Documenttypename: string=''
  documenttypeprefix: string=''
  Description: string=''
  Assigntodepartment: string=''
  CreatedBy: string=''
  CreatedDate: string | null=null;
  ModifiedBy: string=''
  ModifiedDate: string | null=null;
  Status: string | null=null;
}
export class DocumentRequestConfiguration {
  DTCId: string=''
  DocumentMasterId: string=''
  documenttype: string=''
  department: string=''
  Description: string=''
  Approvedby: string=''
  ApprovedOn: string=''
  CreatedBy: string=''
  CreatedDate: string | null='';
  ModifiedBy: string=''
  ModifiedDate: string | null='';
  Status: string=''
  Purpose: string=''
  ApprovalsCount: number=0;
  UserGroup: string=''
  drid: string=''
}

export class DocumentPreperationConfiguration {
  DTCId: string=''
  Documentmanagerid: string=''
  documenttype: string=''
  AssignedtoGroup: string=''
  Approvedby: string=''
  ApprovedOn: string=''
  CreatedBy: string=''
  CreatedDate: string | null='';
  ModifiedBy: string=''
  ModifiedDate: string | null='';
  Status: string=''
  documenttitle: string=''
  documentno: string=''
  Department: string=''
  template: string=''
  wokflow: string=''
  details: string=''
  document: string=''
  path:string=''
}
export class DocumentEffectiveConfiguration {
  DTCId: string=''
  documenttitle: string=''
  documentno: string=''
  documenttype: string=''
  Department: string=''
  document: string=''
  EffectiveDate: Date=new Date();
  ReviewDate: Date=new Date();
  CreatedBy: string=''
  CreatedDate: string | null='';
  ModifiedBy: string=''
  ModifiedDate: string | null='';
  Status: string=''
}
export class DocumentAdditionalTasks {
  DTCId: string=''
  DocumentTitle: string=''
  DocumentNo: string=''
  DocumentType: string=''
  Department: string=''
  Document: string=''
  CreatedBy: string=''
  CreatedDate: string | null='';
  ModifiedBy: string=''
  ModifiedDate: string | null='';
  Status: string=''
}

export class noticationconfiguration {
  nCId: string=''
  documentMasterId: string=''
  createdBy: string=''
  createdDate: string | null='';
  modifiedBy: string=''
  modifiedDate: string | null='';
  Status: string | null='';
}
export class workflowconiguration {
  WFCId: string=''
  DocumentMasterId: string=''
  documentstage: string=''
  name:string=''
  code:string=''
  documenttype: string=''
  department: string=''
  reviewsCount: number=0;
  approvalsCount: number=0;
  reviewsType:string=''
  reviewers:reviewers[]=[]
  approvalsType:string=''
  approvals:approvers[]=[]
  CreatedBy: string=''
  CreatedDate: string | null='';
  ModifiedBy: string=''
  ModifiedDate: string | null='';
  Status: string | null='';
}
export class DocumentTemplateConfiguration {
  DTID: string=''
  DocumentMasterId: string=''
  Templatename: string=''
  Uniquecode: string=''
  documenttype: string=''
  description:string=''
  header: string=''
  rows: string=''
  columns: string=''
  footer: string=''
  footerrows: string=''
  footercolumns: string=''
  CreatedBy: string=''
  CreatedDate: string | null=null;
  ModifiedBy: string=''
  ModifiedDate: string | null=null;
  Status: string | null='';
  headerTable:HeaderTable[] | null=[];
  footerTable:FooterTable[] | null=[];
}
export class reviewers{
  value:string=''
}
export class approvers{
  value:string=''
}
export class DepartmentConfiguration {
  DPCFId: string=''
  HierarchyManagementId: string=''
  DepartmentName: string=''
  DepartmentCode: string=''
  Comments: string=''
  CreatedBy: string=''
  CreatedDate: string | null='';
  ModifiedBy: string=''
  ModifiedDate: string | null='';
}
export class RoleConfiguration {
  ROCFId: string=''
  HierarchyManagementId: string=''
  Role: string=''
  Department: string=''
  Comments: string=''
  CreatedBy: string=''
  CreatedDate: string | null='';
  ModifiedBy: string=''
  ModifiedDate: string | null='';
}
export class UserConfiguration {
  UCFId: string=''
  UserManagementID: string=''
  FirstName: string=''
  LastName: string=''
  UserID: string=''
  Department: string=''
  Role: string=''
  Doj: string=''
  Empid: number=0;
  EmailId: string=''
  Activedirectory: string=''
  Standarduser: string=''
  CreatedBy: string=''
  CreatedDate: string | null='';
  ModifiedBy: string=''
  ModifiedDate: string | null='';
}
export class WorkItemsConfiguration {
  TaskType: string=''
  Stage: string=''
  AssignedtoGroup: string=''
  InitiatedBy: string=''
  InitiatedOn: string=''
  Status: string=''
  DueDate: string=''
}
export class PlantConfiguration {
  DPCFId: string=''
  HierarchyManagementId: string=''
  PlantName: string=''
  PlantCode: string=''
  PlantAddress: string=''
  Comments: string=''
  CreatedBy: string=''
  CreatedDate: string | null='';
  ModifiedBy: string=''
  ModifiedDate: string | null = '';
  Status: string = '';

}
export class SecurityManagement {

  public MinimumUserIdLength: string=''
  public MinimumPasswordLength: string=''
  public PasswordComplexity: string=''
  public InvalidAttempts: string=''
  public SessionTimeOut: string=''

}

export class Usergroupconfiguration {
  public SNo: number=0;
  public usergroupname: string=''
  public code: string=''
  public totalusers: number=0;
  public users: string=''
  public Registeredby: string=''
  public Registeredon: string=''
  public Status: string=''
  public Modify: string=''

}
export class activateDeactivateuser {
  public SNo: number=0;
  public UserName: string=''
  public UserId: number=0;
  public Department: string=''
  public Registeredon: string=''
  public Status: string=''


}
export class LoginConfiguration {

  public UserId: string = "";
  public password: string = "";


}
export class ApprovalManagament {

  public NoOfApprovals1: number=0;
  public NoOfApprovals2: number=0;
  public NoOfApprovals3: number=0;

}

//export class NewPlantRegistration {

//  public PlantName: string=''
//  public PlantCode: number=0;
//  public PlantAddress: string=''
//  public Comments: string=''

//}

export class FileResponse{
  public filePath:string=''
  public message:string=''
}
export class HeaderTable{
  public selectedOption:number=0;
  public inputValue:string='';
}
export class FooterTable{
  public selectedOption:number=0;
  public inputValue:string='';
}
