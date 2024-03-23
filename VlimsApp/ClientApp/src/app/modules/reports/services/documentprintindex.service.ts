import { Injectable } from '@angular/core';
import { HttpbaseService } from '../../../shared/httpbase.service';
import { RequestContext1 } from '../../../models/model';



@Injectable()
export class DocumentPrintIndexService {
  type: string = "admin";

  constructor(private http: HttpbaseService) { }
  getworkitems(objrequest: RequestContext1, username: string | null = null) {
 
    if (username != null || username != undefined) {
      objrequest.UserName = username;
    }
    const url = `api/workitems/GetAllworkitems?p_UserName=${username}`;
    //change this method
    return this.http.postJsonLogin(objrequest, url, this.type);
  }

}
