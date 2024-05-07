import { Injectable } from '@angular/core';
import { HttpbaseService } from 'src/app/shared/httpbase.service';
import { ExistingDocumentRequest, RequestContext } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class ExistingDocumentRequestService {  
  type: string = "manager";
  
  constructor(private http: HttpbaseService) { }

  GetExistingDocumentAll(objrequest: RequestContext) {   
    return this.http.postJsonWithToken(objrequest, "api/existingdocumentreq/GetAllDocEff", this.type);
  }
  GetExistingDocumentById(Id: string) {   
    return this.http.getwithheader("api/existingdocumentreq/"+Id, this.type);
  }
  adddExistingDocument(objrequest: ExistingDocumentRequest) {
    return this.http.postJsonLogin(objrequest, "api/existingdocumentreq/savedocumenteffective", this.type);
  }
  UpdateExistingDocument(objrequest: any) {   
    return this.http.postJsonLogin(objrequest, "api/existingdocumentreq/updatedocumenteffective", this.type);
  }
  geturl() {
    return this.http.getwithheader(`api/existingdocumentreq/getpath`, this.type);
  }
  preview(objrequest: ExistingDocumentRequest) {
    return this.http.postJsonLogin(objrequest, "api/existingdocumentreq/preview",this.type);
  }
  upload(objrequest: FormData){
    return this.http.postJsonLogin(objrequest, "api/existingdocumentreq/upload",this.type);
  }

  import(objrequest: FormData){
    return this.http.postJsonLogin(objrequest, "api/existingdocumentreq/import",this.type);
  }
}

