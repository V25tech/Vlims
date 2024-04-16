export class UserPermissions{
  constructor(adminMgmt: boolean = true, securityConfig: boolean = true, securityMgmt: boolean = true, approvalConfigs: boolean = true,
    hirearchyMgmt: boolean = true, roleConfig: boolean = true, deptConfig: boolean = true, plantMgmt: boolean = true,
    userMgmt: boolean = true, userGroupConfig: boolean = true, activatestatus: boolean = true, audit: boolean = true,
    documentMaster: boolean = true, documentTypeConfig: boolean = true, documentTemplateConfig: boolean = true, workflowConfig: boolean = true,
    dashboardConfig: boolean = true, documentRequest: boolean = true, documentEffective: boolean = true, notificationConfig: boolean = true,
    documentRevison: boolean = true, docrepository: boolean = true, additionalTasks: boolean = true, documentPreperation: boolean = true,
    workItemsassigned: boolean = true, downloadPrint: boolean = true) {
    this.adminMgmt = adminMgmt;
    this.securityConfig = securityConfig;
    this.securityMgmt = securityMgmt;
    this.approvalConfigs = approvalConfigs;
    this.hirearchyMgmt = hirearchyMgmt;
    this.roleConfig = roleConfig;
    this.deptConfig = deptConfig;
    this.plantMgmt = plantMgmt;
    this.userMgmt = userMgmt;
    this.userGroupConfig = userGroupConfig;
    this.activatestatus = activatestatus;
    this.audit = audit;
    this.documentMaster = documentMaster;
    this.documentTypeConfig = documentTypeConfig;
    this.documentTemplateConfig = documentTemplateConfig;
    this.workflowConfig = workflowConfig;
    this.dashboardConfig = dashboardConfig;
    this.documentRequest = documentRequest;
    this.documentEffective = documentEffective;
    this.notificationConfig = notificationConfig;
    this.documentRevison = documentRevison;
    this.docrepository = docrepository;
    this.additionalTasks = additionalTasks;
    this.documentPreperation = documentPreperation;
    this.workItemsassigned = workItemsassigned,
    this.downloadPrint = downloadPrint;
  }
  adminMgmt?: boolean;
  securityConfig?: boolean;
  securityMgmt?: boolean;
  approvalConfigs?: boolean;
  hirearchyMgmt?: boolean;
  roleConfig?: boolean;
  deptConfig?: boolean;
  plantMgmt?: boolean;
  userMgmt?: boolean;
  userGroupConfig?: boolean;
  activatestatus?: boolean;
  audit?: boolean;
  documentMaster?: boolean;
  documentTypeConfig?: boolean;
  documentTemplateConfig?: boolean;
  workflowConfig?: boolean;
  dashboardConfig?: boolean;
  documentRequest?: boolean;
  documentEffective?: boolean;
  notificationConfig?: boolean;
  documentRevison?: boolean;
  docrepository?: boolean;
  additionalTasks?: boolean;
  documentPreperation?: boolean;
  workItemsassigned?: boolean;
  downloadPrint?: boolean;
}
