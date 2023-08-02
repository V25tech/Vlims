import { Injectable } from '@angular/core';
import { RequestContext } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class WorkitemsService {
  type: string = "admin";

  constructor(private http: HttpbaseService) { }
  getworkitems(objrequest: RequestContext) {
    
    //change this method
    return this.http.postJsonLogin(objrequest, "api/workitems/GetAllworkitems", this.type);
  }
  
}
