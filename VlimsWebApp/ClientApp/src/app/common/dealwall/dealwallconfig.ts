export class Dealwallconfig {
  public getitemsurl: string;
  public createnoteurl: string;
  public updatenoteurl: string;
  public deletenoteurl: string;
  public addattachmenturl: string;
  public updateattachmenturl: string;
  public uploadattachmenturl: string;
  public deleteattachment: string;
  public downloadattachmenturl: string;
  public getactivitiesurl: string;
  public userid: number;
  public applicationid: number;
  public entitytype: any;
  public entityid: any;
  public username: any;
  public isunderwriter: any;
  public tenantid: number;
  public HttpHeaders: any;
  public UriParameters: any;
  constructor(
    GetItemsUrl: string,
    CreateNoteUrl: string,
    UpdateNoteUrl: string,
    DeleteNoteUrl: string,
    AddAttachmentUrl: string,
    UpdateAttachmentUrl: string,
    UploadAttachmentUrl: string,
    DeleteAttachment: string,
    DownloadAttachmentUrl: string,
    GetActivitiesUrl: string
  ) {
    this.getitemsurl = GetItemsUrl;
    this.createnoteurl = CreateNoteUrl;
    this.updatenoteurl = UpdateNoteUrl;
    this.deletenoteurl = DeleteNoteUrl;
    this.addattachmenturl = AddAttachmentUrl;
    this.updateattachmenturl = UpdateAttachmentUrl;
    this.uploadattachmenturl = UploadAttachmentUrl;
    this.deleteattachment = DeleteAttachment;
    this.downloadattachmenturl = DownloadAttachmentUrl;
    this.getactivitiesurl = GetActivitiesUrl;
  }
}

export class DealwallContext {
  public Subject: string;
  public Status: string;
  public Priority: string;
  public NotesType: string;
  public UserName: string;
  public isunderwriter: boolean;
  constructor(subject, status, priority, notesType, userName, isunderwriter) {
    this.Subject = subject;
    this.Status = status;
    this.Priority = priority;
    this.NotesType = notesType;
    this.UserName = userName;
    this.isunderwriter = isunderwriter;
  }
}
