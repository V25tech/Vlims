import { Injectable } from '@angular/core';
import { RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentRevisonService {
  type: string = "manager";

  constructor(private http: HttpbaseService) { }
  getdocumentrevison(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentrequest/GetAllDocreq", this.type);
  }
}
