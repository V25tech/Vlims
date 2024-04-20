import { Injectable } from '@angular/core';
import { RequestContext, RequestContext1 } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class WorkitemsService {
  type: string = "admin";

  constructor(private http: HttpbaseService) { }
  getworkitems(objrequest: RequestContext1,username:string | null = null) {
    // const url = username
    // ? `api/workitems/GetAllworkitems?p_UserName=${username}`
    // : 'api/workitems/GetAllworkitems';
    if (username != null || username != undefined) {
      objrequest.UserName = username;
    }
    const url = `api/workitems/GetAllworkitems?p_UserName=${username}`;
    //change this method
    return this.http.postJsonLogin(objrequest, url, this.type);
  }
  
}
