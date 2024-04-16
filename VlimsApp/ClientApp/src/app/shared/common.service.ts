import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DocumentTemplateConfiguration } from '../modules/documents/models/DocumentTemplateConfiguration';
import { DepartmentConfiguration, DocumentAdditionalTasks,DocumentTypeConfiguration, DocumentEffectiveConfiguration, DocumentPreperationConfiguration, DocumentPrintConfiguration, DocumentRequestConfiguration, ExistingDocumentRequest, PlantConfiguration, RequestContext1, RoleConfiguration, UserConfiguration, Usergroupconfiguration, functionalprofile } from '../models/model';
import { DepartmentComponent } from '../modules/authentication/components/Department/department.component';
import { setfunctionalprofileconfigurationservice } from '../modules/services/setfunctionalprofile.service';
import { DatePipe, formatDate } from '@angular/common';
import { UserPermissions } from '../models/userpermissions';



@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private readonly sessionTimeoutKey = 'sessionTimeout';
  documentType=new DocumentTypeConfiguration();
  template=new DocumentTemplateConfiguration();
  templateCount: number = 0;
  userGroupConfig = new Usergroupconfiguration();
  userConfig = new UserConfiguration();
  departConfig = new DepartmentConfiguration();
  plantConfig = new PlantConfiguration();
  roleConfig = new RoleConfiguration();
  request = new DocumentRequestConfiguration();
  revision = new DocumentAdditionalTasks();
  preperation = new DocumentPreperationConfiguration();
  efffective = new DocumentEffectiveConfiguration();  
  printConfig = new DocumentPrintConfiguration();  
  existingDocReq = new ExistingDocumentRequest();
  public userPermissions = new UserPermissions();
  public userEntityPermissions$ = new BehaviorSubject<any>(null);
  private sidebarStatusChanged = new Subject<boolean>();
  sidebarchanged$=this.sidebarStatusChanged.asObservable();
  issidebardisabled=false;
  createdBy = 'admin';
  
  retailerId: number = 0;
  userId: number = 0;
  baseurl: string='';
  documenttypeId:string='';
  objname:string='';
  //pdfBytes: Uint8Array;
  private _searchBS = new BehaviorSubject<string>('');

  private _sliderToggleBS = new BehaviorSubject<boolean>(false);
  public _token=new BehaviorSubject<string>('');
  token=this._token.asObservable();

  private _cartsCountBS = new BehaviorSubject<number>(0);
  public _cartsCount: number = 0;
  public cartsCount = this._cartsCountBS.asObservable();
  req=new RequestContext1();
  

  //gloabl file upload config
  fileuploadConfig: any = {
    import: {
      accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      btnName: 'Import'
    }
  };

  constructor() {
    this.req.PageNumber=1;
    this.req.PageSize=1000;
    this.req.Id=0;
    this.req.UserName = 'admin';
    this.userEntityPermissions$.next(localStorage.getItem("roles"));
    this.setUserPermissions();
    //this.retaileR = new Retailer();
    //this.retaileR.RetailId = 1;

  }
  private storage = localStorage;
  setUsername(username: string) {
    this.storage.setItem('username', username);
  }
  setUser(user:UserConfiguration){
    const userstring = JSON.stringify(user);
    this.storage.setItem('user',userstring);
  }
  setsidebardisabled(issidebar:boolean){
    this.storage.setItem('sidebar',JSON.stringify(issidebar));
  }
  getsidebardisabled(){
    const sidebar=this.storage.getItem('sidebar');
    if(sidebar==='false')
      {
        this.sidebarStatusChanged.next(false);
        return false;
      }
      else
      {
        this.sidebarStatusChanged.next(true);
        return true;
      }
   //return Boolean(sidebar);
  }
  setUserRoles(roles:functionalprofile){
    const rolesString = JSON.stringify(roles);
  this.storage.setItem('roles', rolesString);
  }
  removeUserRole(){
    this.storage.removeItem('roles');
  }
  getUsername() {
    const username = this.storage.getItem('username');
    return username !== null ? username : 'defaultUsername';
  }
  getUserRoles(): functionalprofile | null {
    const rolesString = this.storage.getItem('roles');
    if (rolesString) {
      return JSON.parse(rolesString);
    } else {
      return null; // Or handle the absence of roles as needed
    }
  }
  getUser(): UserConfiguration | null {
    const userstring = this.storage.getItem('user');
    if (userstring) {
      return JSON.parse(userstring);
    } else {
      return null; // Or handle the absence of roles as needed
    }
  }
  setadminroles(){
    const admin=new functionalprofile();
    admin.userMgmt=true;
    admin.deptConfig=true;
    admin.roleConfig=true;
    admin.plantMgmt=true;
    admin.securityConfig=true;
    const rolesString = JSON.stringify(admin);
  this.storage.setItem('roles', rolesString);
  }
  startSessionTimeout(minutes: number) {
    const sessionTimeoutMilliseconds = minutes * 60 * 1000;
    const expirationTimestamp = Date.now() + sessionTimeoutMilliseconds;
    localStorage.setItem(this.sessionTimeoutKey, expirationTimestamp.toString());
  }

  resetSessionTimeout(minutes: number) {
    console.log('reset called');
    const sessionTimeoutMilliseconds = minutes * 60 * 1000;
    const currentTime = Date.now();
    const newSessionTimeout = currentTime + sessionTimeoutMilliseconds;
    localStorage.setItem(this.sessionTimeoutKey, newSessionTimeout.toString());
  }
  

  isSessionExpired(): boolean {
    const sessionTimeout = parseInt(localStorage.getItem(this.sessionTimeoutKey) || '0', 10);
    console.log('session',sessionTimeout);
    const currentTime = Date.now();
    return currentTime >= sessionTimeout;
  }
  setDate(date: any) {
    if (date == undefined || date == null || date == '')
      return '';

    let dp = new DatePipe(navigator.language);
    let l_date = dp.transform(date, 'dd/MM/yyyy', navigator.language);
    return l_date;
  }
  setUserPermissions() {
    this.userEntityPermissions$.subscribe(data => {
      if (data != null) {
        this.setPermissions(JSON.parse(data));
      }
    })
  }
  setPermissions(data: UserPermissions) {
    this.userPermissions = new UserPermissions(data.adminMgmt, data.securityConfig,data.securityMgmt, data.approvalConfigs, data.hirearchyMgmt, data.roleConfig
      , data.deptConfig, data.plantMgmt, data.userMgmt, data.userGroupConfig, data.activatestatus, data.audit, data.documentMaster, data.documentTypeConfig
      , data.documentTemplateConfig, data.workflowConfig, data.dashboardConfig, data.documentRequest, data.documentEffective, data.notificationConfig, data.documentRevison
      , data.docrepository, data.additionalTasks, data.documentPreperation, data.workItemsassigned, data.downloadPrint);
    console.log(this.userPermissions);
  }
}
