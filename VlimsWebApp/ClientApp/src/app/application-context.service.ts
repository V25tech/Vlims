import { Injectable } from '@angular/core';
import {
  IdentityUser
} from "./models/models";

@Injectable({
  providedIn: 'root'
})
export class ApplicationContextService{ 
  
  username: string = '';workspaceId: string = '';changesetID: string = '';usrId:  number = 0;envId:  number = 0;btnName: string = '';roleID:  number = 0;AlgoInfo: string = '';PricerInfo: string = '';modelID:  number = 0;ProductId: string = '';CommonData: Array<any> = [];DataId: string = '';InitiativeId:  number = 0;PlanVersionId: string = '';InitiativeName: string = '';ChangeName: string = '';isViewMode: boolean = false;WDTabIndex:  number = 0;ProductName: string = '';Tab: string = 'Workspaces';IsVisible: boolean = true;DefinationId: string = '';ChangeType: string = '';IsEditMode: boolean = false;MasterPricerSelectedModelId:  number = 0;UserPermissionsList: Array<any> = [];PageName: string = '';ProductCode: string = '';GlobalSearchName: string = '';GlobalSearchCategory: string = '';SnapshotEntityType: string = '';LkpName: string = '';userId: string = '';whatifNavigationDetails: any;transactionTypeId:  number = 0;businessEventId:  number = 0;transactionStatusId:  number = 0;workflowStatusId:  number = 0;toggleOffcanvas: boolean = false;selectednavpil: string = '';schedulerId:  number = 0;countryId:  number = 0;stateId: string = '';cityId: string = '';Name: string = '';Dname: string = '';Desc: string = '';  loggedInUser: IdentityUser = new IdentityUser(); SelectedTab:string="";  }
  