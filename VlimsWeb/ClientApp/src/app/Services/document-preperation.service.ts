import { Injectable } from '@angular/core';
import { DocumentEffectiveConfiguration, DocumentPreperationConfiguration, DocumentRequestConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentPreperationService {
  
  type: string = "manager";

  constructor(private http: HttpbaseService) {
  }
  getdocumentrequest(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/GetAllDocPrep",this.type);
  }
  getdocumentrequestbyId(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/getdocId");
  }
  ManageDocument(objrequest: DocumentPreperationConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/savedocumentpreparation",this.type);
  }
  UpdateDocument(objrequest: DocumentPreperationConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/updatedocumentpreparation", this.type);
  }
  preview(objrequest: DocumentPreperationConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/preview",this.type);
  }
  upload(objrequest: FormData){
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/upload",this.type);
  }
  getdocrequestbyname(docreq: string) {
    debugger
    return this.http.getwithheader("api/documentpreparation/GetDocumentRequestbyName" + "?name=" + docreq, this.type);
  }
  ManageApprovalFlow(objprep: DocumentPreperationConfiguration) {
    debugger
    var docEff = new DocumentEffectiveConfiguration();
    docEff.documenttype = objprep.documenttype;
    docEff.Department = objprep.Department;
    docEff.documentmanagerid = objprep.DTCId;
    docEff.CreatedDate = objprep.CreatedDate;
    docEff.CreatedBy = objprep.CreatedBy;
    //docEff.Approvedby = objprep.Approvedby;
    //docEff.ApprovedOn = objprep.ApprovedOn;
    //docEff.AssignedtoGroup = objprep.UserGroup;
    docEff.document = objprep.document;
    docEff.Status = 'Pending';
    docEff.documenttitle = objprep.documenttitle;
    docEff.documentno = objprep.documentno;
    docEff.ModifiedBy = 'admin';
    //docEff.Documentmanagerid = objprep.drid;
    return this.http.postJsonLogin(docEff, "api/documenteffective/savedocumenteffective", this.type);
  }

}
