import { getLocaleDateFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import { DocumentPreperationConfiguration, DocumentRequestConfiguration, RequestContext } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentRevisionService {
  type: string = "manager";
  constructor(private http: HttpbaseService) { }
  getdocumentRevisions(objrequest: RequestContext) {    
    return this.http.postJsonLogin(objrequest, "api/additionaltask/GetAddtask", this.type);
  }
  adddocrevconfig(objrequest: DocumentRequestConfiguration) {    
    return this.http.postJsonLogin(objrequest, "api/documentrequest/SaveDocumentrequest", this.type);
  }
  updatedocrevconfig(objrequest: DocumentRequestConfiguration) {    
    return this.http.postJsonLogin(objrequest, "api/documentrequest/updatedocumentrequest", this.type);
  }
  getbyId(docreq: number) {        
    return this.http.getwithheader("api/documentrequest/getbyId" + "?dRID=" + docreq, this.type);
  }

  ManageApprovalFlow(objrequest: DocumentRequestConfiguration) {   
    var docPrep = new DocumentPreperationConfiguration();
    docPrep.documenttype = objrequest.documenttype;
    docPrep.department = objrequest.department;
    docPrep.wokflow = '';
    docPrep.CreatedDate = objrequest.createdDate;
    docPrep.CreatedBy = objrequest.createdBy
    docPrep.Approvedby = objrequest.approvedby;
    docPrep.ApprovedOn = objrequest.approvedOn??'';
    docPrep.details = '';
    docPrep.AssignedtoGroup = objrequest.UserGroup;
    docPrep.document = '';
    docPrep.status = 'Approved';
    docPrep.documenttitle = '';
    docPrep.documentno = '';
    docPrep.ModifiedBy = 'admin';
    docPrep.Documentmanagerid = objrequest.drid;
  
    return this.http.postJsonLogin(docPrep, "api/documentpreparation/savedocumentpreparation", this.type);
  }
}
