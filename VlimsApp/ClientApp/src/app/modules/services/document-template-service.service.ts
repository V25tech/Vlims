import { Injectable } from '@angular/core';
import { HttpbaseService } from 'src/app/shared/httpbase.service';


import { DocumentTemplateConfiguration, RequestContext } from 'src/app/models/model';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateServiceService {
  type: string = "master";
  constructor(private http: HttpbaseService, private commonsvc: CommonService) { }

  getdocttemplate(objrequest: RequestContext) {

    return this.http.postJsonLogin(objrequest, "api/documenttemplateconfiguration/getalldoctemplate", this.type);
  }
  getdoctemplatebyname(objname: string) {

    return this.http.getwithheader("api/documenttemplateconfiguration/getbyName" + "?name=" + objname, this.type);
  }
  adddoctemplate(objrequest: DocumentTemplateConfiguration) {

    return this.http.postJsonLogin(objrequest, "api/documenttemplateconfiguration/savedocumenttemplateconfiguration", this.type);
  }
  updatedoctemplate(objrequest: DocumentTemplateConfiguration) {

    return this.http.postJsonLogin(objrequest, "api/documenttemplateconfiguration/updatedocumenttemplateconfiguration", this.type);
  }

  getbyId(id: number) {

    return this.http.getwithheader("api/documenttemplateconfiguration/getbyId" + "?dTID=" + id, this.type);
  }
  getTemplate(templte: string, prepId: number, ispdf: boolean = true) {
    debugger
    return this.http.getwithheader(`api/documenttemplateconfiguration/getpdf?templateinf=${templte}&p_user=${this.commonsvc.getUsername()}&p_PrepId=${prepId}&p_isPdf=${ispdf}`, this.type);
  }
  isduplicate(templte: string) {
    debugger
    return this.http.getwithheader(`api/documenttemplateconfiguration/isduplicate?p_template=${templte}`, this.type);
  }
  geturl() {
    debugger
    return this.http.getwithheader(`api/documenttemplateconfiguration/getpath`, this.type);
  }
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.postJsonLogin(formData, "api/documenttemplateconfiguration/upload-image", this.type);
  }
  upload(objrequest: FormData, filename: string) {
    return this.http.postJsonLogin(objrequest, `api/documenttemplateconfiguration/upload?filename=${filename}`, this.type);
  }
  checkFileExist(docNo: string) {
    return this.http.getwithheader(`api/documenttemplateconfiguration/checkfileexist?filename=${docNo}.docx`, this.type);
  }  
  deleteFile(docNo: string) {
    return this.http.getwithheader(`api/documenttemplateconfiguration/deletefile?filename=${docNo}.docx`, this.type);
  }
}
