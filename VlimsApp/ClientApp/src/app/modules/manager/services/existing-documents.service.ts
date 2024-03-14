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
  preview(objrequest: ExistingDocumentRequest) {
    return this.http.postJsonLogin(objrequest, "api/existingdocumentreq/preview", this.type);
  }
}
