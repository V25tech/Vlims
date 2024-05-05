export class RequestContext {
  public PageNumber: number = 0;
  public PageSize: number = 0;
  public Id: number = 0;
}
export class RequestContext1 {
  public PageNumber: number = 0;
  public PageSize: number = 0;
  public Id: number = 0;
  public UserName: string | null = null;
  public type:string | null = null;
 
  
}
export class dashboardconfiguration {
  dCId: string = ''
  documentMasterId: string = ''
  createdBy: string = ''
  createdDate: string | null = '';
  modifiedBy: string = ''
  modifiedDate: string | null = '';
  Status: string | null = '';
}

export class DocumentTypeConfiguration {
  DTCId: string = ''
  DocumentMasterId: string = ''
  Documenttypename: string = ''
  documenttypeprefix: string = ''
  Description: string = ''
  Assigntodepartment: string = ''
  CreatedBy: string = ''
  CreatedDate: string | null = null;
  ModifiedBy: string = ''
  ModifiedDate: string | null = null;
  Status: string | null = null;
  IsParent:boolean=false;
}
export class DocumentRequestConfiguration {
  drid: string = '';
  documentmanagerid: string = '';
  documenttype: string = '';
  department: string = '';
  purpose: string = '';
  approvalsCount = 0;
  assigntoGroup: string = '';
  createdBy: string = '';
  createdDate: string | null = '';
  modifiedBy: string = '';
  modifiedDate: string | null = '';
  status: string = '';
  workflow: string = '';
  approvedby: string = '';
  approvedOn?: string;
  UserGroup: string = '';
  reason: string = '';
}

export class DocumentPreperationConfiguration {
  DTCId: string = '';
  Documentmanagerid: string = '';
  documenttype: string = '';
  AssignedtoGroup: string = '';
  Approvedby: string = '';
  ApprovedOn: string | null = '';
  CreatedBy: string = '';
  CreatedDate: string | null = '';
  ModifiedBy: string = '';
  ModifiedDate: string | null = '';
  status: string = '';
  documenttitle: string = '';
  documentno: string = '';
  department: string = '';
  template: string = '';
  wokflow: string = '';
  details: string = '';
  document: string = '';
  path: string = '';
  dpnid: string = '';
  referenceId: number = 0;
  isrevision: boolean = false;
  isEffectiveApproved=false;
  isRevision:boolean=false;
  prepdocument: Prepdocument = {
    labelClaim : '',
    packingInformation : '',
    revisionNo : '',
    sampleQuantity : '',
    supersedesNo: '',
    reference: '',
    productCode:''

  };
}

export class Prepdocument {
  revisionNo: string = '';
  sampleQuantity: string = '';
  packingInformation: string = '';
  labelClaim: string = '';
  supersedesNo: string = ''; 
  productCode:string=''; 
  reference:string='';
}

export class DocPrep_LableMapping{
  documentTitle: string = '';
  documentNumber: string = '';
  revisionNo: string = '';
  supersedesNo: string = '';
  reference: string = '';
  sampleQuantity: string = '';
  packingInformation: string = '';
  labelClaim: string = '';
  productCode:string=''; 

}

export class DocumentEffectiveConfiguration {
  DTCId: string = '';
  deid: string = '';
  documenttitle: string = '';
  documentno: string = '';
  documenttype: string = '';
  department: string = '';
  document: string = '';
  effectiveDate: string = '';
  reviewDate: string = '';
  CreatedBy: string = '';
  CreatedDate: string | null = null;
  ModifiedBy: string = '';
  ModifiedDate: string | null = '';
  Status: string = '';
  workflow: string = '';
  template: string = '';
  referenceId:number=0;
  isrevision:boolean=false;
  documentmanagerid: string = '';
  status: string = '';
}
export class DocumentAdditionalTasks {
  documentTitle: string = ''
  documentno: string = ''
  documentType: string = ''
  department: string = ''
  document: string = ''
  status: string = '';
  version: number = 0;
  documentEffectiveID: number = 0;
  atid: number = 0;
  createdBy: string = '';
  createdDate: Date | undefined;
  modifiedBy: string = '';
  effectiveDate: Date | undefined;
  reviewDate: Date | undefined;
  modifiedDate: Date | undefined;
  workflow:string='';
  template:string = '';  
  referenceId:number=0;
  prepId:number=0;
}

export class noticationconfiguration {
  nCId: string = ''
  documentMasterId: string = ''
  createdBy: string = ''
  createdDate: string | null = '';
  modifiedBy: string = ''
  modifiedDate: string | null = '';
  Status: string | null = '';
}
export class workflowconiguration {
  WFCId: string | null = null;
  DocumentMasterId: string | null = '';
  documentstage: string | null = '';
  workflowName: string | null = '';
  code: string | null = '';
  documenttype: string | null = '';
  department: DepartmentConfiguration[] | null = []
  departments: string | null = null;
  reviewsCount: number = 0;
  approvalsCount: number = 0;
  reviewsType: string | null = '';
  reviewersGroup: string | null = null
  reviewers: UserConfiguration[] | null = []
  approvalsType: string = ''
  approvalsGroup: string | null = null
  approvals: UserConfiguration[] | null = []
  review: UserConfiguration | null = null;
  approve: UserConfiguration | null = null;
  CreatedBy: string = '';
  CreatedDate: string | null = null;
  ModifiedBy: string = '';
  ModifiedDate: string | null = null;
  Status: string | null = '';
  IsParent:boolean=false;
}
export class DocumentTemplateConfiguration {
  DTID: string = ''
  DocumentMasterId: string = ''
  Templatename: string = ''
  Uniquecode: string = ''
  documenttype: string = ''
  description: string = ''
  header: string = ''
  rows: string = ''
  columns: string = ''
  footer: string = ''
  footerrows: string = ''
  footercolumns: string = ''
  CreatedBy: string = ''
  CreatedDate: string | null = null;
  ModifiedBy: string = ''
  ModifiedDate: string | null = null;
  Status: string | null = '';
  headerTable: HeaderTable[] | null = [];
  footerTable: FooterTable[] | null = [];
  titleTable:HeaderTable[] | null=[];
  Page:Page[] | null=[];
  Pages:number=0;
  IsParent:boolean=false;
  Isclone:boolean=false;
  PreparationId:number=0;
  FormatNo:string='';
}
interface Page {
  text: string;
  header:string;
  footer:string;
  pagenumber:number;
  pagetype:string;
  bodyData:BodyDataElement[][];
  istext:boolean;
  isgrid:boolean;
  istextposition:boolean;
  isheader:boolean;
  isfooter:boolean;
}
export class reviewers {
  value: string = ''
}
export class approvers {
  value: string = ''
}
export class DepartmentConfiguration {
  DPCFId: string = ''
  HierarchyManagementId: string = ''
  DepartmentName: string = ''
  DepartmentCode: string = ''
  Comments: string = ''
  CreatedBy: string = ''
  CreatedDate: Date | undefined;
  ModifiedBy: string = ''
  ModifiedDate: Date | undefined;
}
export class RoleConfiguration {
  ROCFId: string = ''
  HierarchyManagementId: string = ''
  Role: string = ''
  Department: string = ''
  Comments: string = ''
  CreatedBy: string = ''
  CreatedDate: Date | undefined;
  ModifiedBy: string = ''
  ModifiedDate: Date | undefined;
}
export class UserConfiguration {
  
  UCFId: string = ''
  UserManagementID: string = ''
  FirstName: string = ''
  LastName: string = ''
  UserID: string = ''
  Department: string = ''
  Role: string = ''
  Doj: string = ''
  Empid: number = 0;
  EmailId: string = ''
  Activedirectory: string = ''
  Standarduser: string = ''
  CreatedBy: string = ''
  InvAttempt:string='';
  CreatedDate: Date | undefined;
  ModifiedBy: string = ''
  ModifiedDate: Date | undefined;
  Password: string | null = ''
  //InvAttempt:number=0
  Status : string=''
}

export class PasswordChangeConfig{
  UserID: string = '';
  Password: string = '';
  OldPassword: string = '';
}

export class WorkItemsConfiguration {
  WITId: number = 0
  TaskType: string = ''
  Stage: string = ''
  AssignedtoGroup: string = ''
  InitiatedBy: string = ''
  InitiatedOn: string = ''
  Status: string = ''
  DueDate: string = ''
  ReferenceId: number = 0
  ActionType: string = ''
  IsCompleted: boolean = false
  CreatedBy: string = ''
  ModifiedBy: string = ''
}
export class PlantConfiguration {
 // DPCFId: string = ''
  HierarchyManagementId: string = ''
  PlantName: string = ''
  PlantCode: string = ''
  PlantAddress: string = ''
  Comments: string = ''
  CreatedBy: string = ''
  CreatedDate: Date | undefined;
  ModifiedBy: string = ''
  ModifiedDate: Date | undefined;
  Status: string = '';
  PMId: number = 0;
  

}
export class SecurityManagement {

  public MinimumUserIdLength: string = ''
  public MinimumPasswordLength: string = ''
  public PasswordComplexity: string = ''
  public InvalidAttempts: string = ''
  public SessionTimeOut: string = ''

}

export class Usergroupconfiguration {
  public Ugcid: string | null = '';
  //public SNo: number = 0;
  public usergroupname: string = ''
  public code: string = ''
  public totalusers: string | null = '';
  public users: UserConfiguration[] | null = []
  public Registeredby: string = ''
  public Registeredon: string = ''
  public Status: string = ''
  public Modify: string = ''

}
export class activateDeactivateuser {
  public SNo: number = 0;
  public UserName: string = ''
  public UserId: number = 0;
  public Department: string = ''
  public Registeredon: string = ''
  public Status: string = ''
  public UCFId:string=''

}
export class LoginConfiguration {

  public UserId: string = "";
  public password: string = "";


}
export class ApprovalManagament {

  public DocTypeNoOfApprovals: number = 0;
  public DocTempNoOfApprovals: number = 0;
  public WFlowNoOfApprovals: number = 0;

}

//export class NewPlantRegistration {

//  public PlantName: string=''
//  public PlantCode: number=0;
//  public PlantAddress: string=''
//  public Comments: string=''

//}

export class FileResponse {
  public filePath: string = ''
  public message: string = ''
}
export class HeaderTable {
  public selectedOption: number = 0;
  public inputValue: string = '';
}
interface BodyDataElement {
  selectedOption: number;
  inputValue: string;
}
export class FooterTable {
  public selectedOption: number = 0;
  public inputValue: string = '';
}
export class DocumentPrintConfiguration {
  public DRId: number = 0;
  public DocumentMasterId: string = '';
  // public documenttype: string = '';
  public department: string = '';
  public Description: string = '';
  public Approvedby: string = '';
  public ApprovedOn: string = '';
  public CreatedBy: string = '';
  public CreatedDate: Date | undefined;
  public ModifiedBy: string = '';
  public ModifiedDate: Date | undefined;
  public Status: string = '';
  public Purpose: string = '';
  public ApprovalsCount: number = 0;
  public workflow: string = '';
  public reason: string = '';
  public documenttitle: string = '';
  public documentNumber: string = '';
  public printtype: string = '';
  public noofcopies: string = '';
  public printCount: string = '';
  public template:string='';
  public batchNumber:string='';
  public batchSize:string='';
  public printCopy='';
  public existingdocumentNumber:string='';
  public isactive:boolean=false;
  public prepId:number=0;
}

export class ExistingDocumentRequest {
  edrId: number = 0;
  documentno: string = '';
  documenttitle: string = '';
  department: string = '';
  documenttype: string = '';
  document: string = '';
  sampletemplate: string = '';
  createdBy: string = '';
  createdDate: Date | undefined;
  modifiedBy: string = '';
  modifiedDate: Date | undefined;
  effectiveDate?: Date | undefined;
  reviewDate?: Date | undefined;
  reviewCountDownValue:  number| undefined;
  prepId:number=0
}


export class DocumentRevisionRequest {
  status: string = '';
  version: Number = 0;
  documentEffectiveID: Number = 0;
  atid: string = '';
  createdBy: string = '';
  createdDate: Date | undefined;
  modifiedBy: string = '';
  effectiveDate: Date | undefined;
  reviewDate: Date | undefined;
  modifiedDate: Date | undefined;
  template:string='';
  prepId:number=0;
}
export class functionalprofile {
  sfpid:number=0;
  role: string = '';
  adminMgmt: boolean = false;
  securityMgmt: boolean = false;
  securityConfig: boolean = false;
  approvalConfigs: boolean = false;
  hirearchyMgmt: Date | undefined;
  roleConfig: boolean = false;
  deptConfig: boolean = false;
  //setFunctionalprofile: boolean = false;
  plantMgmt: boolean = false;
  userMgmt: boolean = false;
  userConfig: boolean = false;
  userGroupConfig: boolean = false;
  documentMaster: boolean = false;
  documentTypeConfig: boolean = false;
  documentTemplateConfig: boolean = false;
  workflowConfig: boolean = false;
  dashboardConfig: boolean = false;
  notificationConfig: boolean = false;
  documentManager: boolean = false;
  documentRequest: boolean = false;
  documentPreperation: boolean = false;
  documentEffective: boolean = false;
  additionalTasks: boolean = false;
  documentRevison: boolean = false;
  downloadPrint:boolean=false;
  workItemsassigned: boolean = false;
  Activatestatus:boolean = false;
  docrepository:boolean = false;
  Audit:boolean = false;
  reviewDate: Date | undefined;
  modifiedDate: Date | undefined;
  modifiedby: string ='';
  createdby: string ='';
}
export class AuditConfiguration {
  DocumentType: string = ''
  Department: string = ''
  Users: string = ''
  ModifiedBy: any;
  CreatedBy: any;
  CreatedDate: Date | undefined;
  ModifiedDate: Date | undefined;
  DepartmentName: any;

  id: any;
  //EntityInfo:string=''
  EntityInfo: any; // Property for holding a JSON object
  Unique: any; // Property for holding a JSON object
  VersionNumber: number | undefined; // Include the VersionNumber property
  state: number | undefined;
 
}
