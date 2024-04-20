import { Injectable } from '@angular/core';
import { HttpbaseService } from 'src/app/shared/httpbase.service';
import { ExistingDocumentRequest, RequestContext } from '../../../models/model';

@Injectable({
  providedIn: 'root'
})
export class ExistingDocumentsService {
  type: string = "manager";
  constructor(private http: HttpbaseService) { }

  getAllDocuments(objrequest: RequestContext) {
    return this.http.postJsonLogin(objrequest, "api/documents", this.type);

  }
  geturl() {
    debugger
    return this.http.getwithheader(`api/existingdocumentreq/getpath`, this.type);
  }
  preview(objrequest: ExistingDocumentRequest) {
    return this.http.postJsonLogin(objrequest, "api/existingdocumentreq/preview", this.type);
  }
  getTemplate(templte: string, ispdf: boolean = true, type = 'master') {
    return this.http.getwithheader(`api/documenttemplateconfiguration/getpdf?templateinf=${templte}&p_isPdf=${ispdf}`, type);
  }
}
