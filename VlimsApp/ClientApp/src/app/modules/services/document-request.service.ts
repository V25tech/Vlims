import { getLocaleDateFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import { DocumentPreperationConfiguration, DocumentRequestConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentRequestService {
  type: string = "manager";
  constructor(private http: HttpbaseService) { }
  getdocumentrequest(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentrequest/GetAllDocreq", this.type);
  }
  adddocreqconfig(objrequest: DocumentRequestConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentrequest/SaveDocumentrequest", this.type);
  }
  getdocrequestbyname(docreq: string) {
    debugger
    debugger
    return this.http.getwithheader("api/documentrequest/GetDocumentRequestbyName" + "?name=" + docreq, this.type);
  }
  ManageApprovalFlow(objrequest: DocumentRequestConfiguration) {
    debugger
    var docPrep = new DocumentPreperationConfiguration();
    docPrep.documenttype = objrequest.documenttype;
    docPrep.Department = objrequest.department;
    docPrep.wokflow = '';
    docPrep.CreatedDate = objrequest.CreatedDate;
    docPrep.CreatedBy = objrequest.CreatedBy;
    docPrep.Approvedby = objrequest.Approvedby;
    docPrep.ApprovedOn = objrequest.ApprovedOn;
    docPrep.details = '';
    docPrep.AssignedtoGroup = objrequest.UserGroup;
    docPrep.document = '';
    docPrep.Status = 'Approved';
    docPrep.documenttitle = '';
    docPrep.documentno = '';
    docPrep.ModifiedBy = 'admin';
    docPrep.Documentmanagerid = objrequest.drid;
  
    return this.http.postJsonLogin(docPrep, "api/documentpreparation/savedocumentpreparation", this.type);
  }
}
