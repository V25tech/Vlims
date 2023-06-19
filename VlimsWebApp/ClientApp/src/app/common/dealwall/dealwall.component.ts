import { Component, OnInit, Input, OnDestroy, forwardRef } from "@angular/core";
import { Dealwallconfig, DealwallContext } from "./dealwallconfig";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilityService } from "src/app/utility.service";
import { Subscription } from "rxjs";
import { Note } from "./note";
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
@Component({
  selector: "exp-dealwall",
  templateUrl: "./dealwall.component.html",
  styleUrls: ["./dealwall.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DealwallComponent),
      multi: true,
    }],
})
export class DealwallComponent implements OnInit, OnDestroy, ControlValueAccessor {
  cbValue: boolean = false;
  @Input("elementRef") control: NgControl;
  onChange: any = () => { };
  onTouched: any = () => { };
  changeAndTouch() {
    this.cbValue = true;
    this.onChange(this.cbValue);
    this.onTouched();
  }
  reset() {
    this.control.reset(this.control.value);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.cbValue = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  @Input("config") config: Dealwallconfig;
  @Input("applicationId") applicationId: number;
  @Input("tenantid") tenantid: any;
  @Input("entityId") entityId: any;
  @Input("entityType") entityType: string;
  @Input("userId") userId: any;
  @Input("isUnderwriter") isUnderwriter: boolean;
  @Input("userName") userName: string;
  @Input("getactivitiesUrl") GetActivitiesUrl: string;
  @Input("getdealwallitemsUrl") getdealwallitemsUrl: string;
  @Input("deletenoteUrl") DeleteNoteUrl: string;
  @Input("downloadattachmentUrl") DownloadAttachmentUrl: string;
  @Input("createnoteUrl") CreateNoteUrl: string;
  @Input("uploadattachmentUrl") UploadAttachmentUrl: string;
  @Input("updatenoteUrl") UpdateNoteUrl: string;
  @Input("createattachmentUrl") AddAttachmentUrl: string;
  @Input("updateattachmentUrl") UpdateAttachmentUrl: string;
  @Input("deleteattachmentUrl") DeleteAttachmentUrl: string;
  @Input("enable") enable: boolean = true;
  constructor(public _http: HttpClient, public us: UtilityService) { }
  private subscription: Subscription = new Subscription();
  items: Array<Note> = [];
  filteritemtype: string = "all";
  addtype: string = "";
  errormessage: string = "";
  public trackbydealwallitems = (index: number, item: any) => item.Id;
  public toggle: boolean = false;
  public adddealwalloptions = ["Attachment", "Note"];

  filterValues = [
    { Text: "All", Value: "all" },
    {
      Text: "Attachments",
      Value: "Attachment"
    },
    {
      Text: "Notes",
      Value: "note"
    },
    {
      Text: "Events",
      Value: "activity"
    }
  ];

  ngOnInit() {
    if (this.GetActivitiesUrl !== "") {
      this.GetActivities();
    } else {
      this.GetDealWallItems();
    }
  }

  GetActivities() {
    let headerdata: any = this.config.HttpHeaders;
    try {
      this.subscription.add(
        this._http
          .get(this.getUrlWithParameters(this.GetActivitiesUrl), {
            headers: new HttpHeaders(headerdata)
          })
          .subscribe(
            (data: any) => {
              if (data && data.length > 0) this.items = data;
              this.GetDealWallItems();
            },
            (error) => {
              this.GetDealWallItems();
            }
          )
      );
    } catch (ex) {
      this.errormessage = ex.message;
    }
  }
  GetDealWallItems() {

    let headerdata: any = this.config.HttpHeaders;
    try {
      this.subscription.add(
        this._http
          .get(this.getUrlWithParameters(this.getdealwallitemsUrl),
            {
              headers: new HttpHeaders(headerdata)
            }
          )
          .subscribe(
            (data: any) => {
              let l_items = [],
                isunderwriter = this.isUnderwriter;
              if (data.Notes != null && data.Notes.length > 0) {
                data.Notes.forEach((element) => {
                  element["_context"] = JSON.parse(element.Context);
                  if (
                    element.Description == "##attachment##" &&
                    element.Attachments &&
                    element.Attachments.length > 0
                  ) {
                    element["type"] = "Attachment";
                    l_items.push(element);
                  } else {
                    element["type"] = "note";
                    if (isunderwriter || !element["_context.isunderwriter"]) {
                      l_items.push(element);
                    }
                  }
                });
              }
              this.items = l_items
                .concat(this.items)
                .sort(
                  (a, b) =>
                    new Date(b.CreatedDate).getTime() -
                    new Date(a.CreatedDate).getTime()
                );
            },
            (error) => { }
          )
      );
    } catch (ex) {
      this.errormessage = ex.message;
    }
  }

  deleteItem(note: Note, type: string) {
    let headerdata: any = this.config.HttpHeaders;
    try {
      this.us.Confirmation("Are you sure you want to delete " + type).subscribe(
        (data) => {
          if (data) {
            this.subscription.add(
              this._http
                .delete(this.DeleteNoteUrl + note.Id, {
                  headers: new HttpHeaders(headerdata)
                })
                .subscribe(
                  (success) => {
                    const index: number = this.items.findIndex(
                      (x) => x.Id == note.Id
                    );
                    if (index !== -1) {
                      this.items.splice(index, 1);
                    }
                    if (type == "note") {
                      this.us.Show("Note deleted successfully", "success");
                    } else {
                      this.us.Show(
                        "Attachment deleted successfully",
                        "success"
                      );
                    }
                  },
                  (error) => { }
                )
            );
          }
        },
        () => { }
      );
    } catch (ex) {
      this.errormessage = ex.message;
    }
  }
  cancel() {
    this.addtype = "";
    this.reset();
  }
  downloadfile(file: any) {
    let headerdata: any = this.config.HttpHeaders;
    try {
      this.subscription.add(
        this._http
          .get(this.DownloadAttachmentUrl + file.Id, {
            headers: new HttpHeaders(headerdata)
          })
          .subscribe(
            (s: string) => {
              window.open(s);
            },
            (e) => { }
          )
      );
    } catch (ex) {
      this.errormessage = ex.message;
    }
  }
  public save(data: any, type: string): void {
    let note = data.Note;
    let isAnother = data.isAnother;
    let headerdata: any = this.config.HttpHeaders;
    this.errormessage = "";
    try {
      let _note: Note = new Note();
      _note.TenantId = this.tenantid;
      _note.ApplicationId = this.applicationId;
      _note.UserId = this.userId;
      _note.EntityType = this.entityType;
      _note.EntityId = this.entityId;

      _note.Description = note.Description;
      _note.NotesType = note.NotesType;
      _note.Priority = note.Priority;
      _note.Status = note.Status;
      _note.Subject = note.Subject;
      let ctx: DealwallContext = new DealwallContext(
        note.Subject,
        note.Status,
        note.Priority,
        note.NotesType,
        this.userName,
        this.isUnderwriter
      );
      _note.Context = JSON.stringify(ctx);
      this.subscription.add(
        this._http
          .post(this.CreateNoteUrl, _note, {
            headers: new HttpHeaders(headerdata)
          })
          .subscribe(
            (success: number) => {
              this.reset();
              note.Id = success["Id"];
              note["_context"] = ctx;
              note["type"] = type;
              note.CreatedDate = new Date();
              if (
                note.Attachments &&
                note.Attachments != null &&
                note.Attachments.length > 0
              ) {
                _note.DiaryItemType = "Note";
                _note.NotesType = note.Attachments[0].NotesType;
                _note.Description = note.Attachments[0].Description;
                _note.FileName = note.FileName;
                _note.FileNameExt = note.Attachments[0].FileName;
                _note.FileType = note.FileType;
                _note.DiaryItemId = note.Attachments[0].DiaryItemId =
                  success["Id"];
                let ctx = (note.Attachments[0]["context"] = new DealwallContext(
                  null,
                  null,
                  null,
                  _note.NotesType,
                  this.userName,
                  null
                ));

                _note.Context = JSON.stringify(ctx);
                this.subscription.add(
                  this._http
                    .post(this.AddAttachmentUrl, _note, {
                      headers: new HttpHeaders(headerdata)
                    })
                    .subscribe(
                      (success: number) => {
                        note.Attachments[0].Id = success["Id"];
                        let data = new FormData();
                        data.append("file", note.Attachments[0]["File"]);
                        this.subscription.add(
                          this._http
                            .post(
                              this.UploadAttachmentUrl + success["Id"],
                              data, {
                              headers: new HttpHeaders({ 'enctype': 'multipart/formdata' })
                            }
                            )
                            .subscribe(
                              (success) => {
                                note.Attachments[0].Url = success[0].Path;
                                if (type != "note") {
                                  this.us.Show(
                                    "Attachment added successfully",
                                    "success"
                                  );
                                } else {
                                  this.us.Show(
                                    "Note added successfully",
                                    "success"
                                  );
                                }
                                this.items.splice(0, 0, note);
                                this.addtype = "";
                                if (isAnother) {
                                  setTimeout(() => {
                                    this.addtype = type;
                                  }, 100);
                                }
                              },
                              (error) => {
                                this.errormessage =
                                  "Error while uploading attachment.";
                              }
                            )
                        );
                      },
                      (error) => {
                        if (note.Attachments[0]["type"] == "note") {
                          this.errormessage = "Error while adding attachment";
                        }
                      }
                    )
                );
              } else {
                this.addtype = "";
                this.items.splice(0, 0, note);
                this.us.Show("Note added successfully", "success");
              }
            },
            (error) => {
              if (this.addtype == "note") {
                this.errormessage = "Error while adding note";
              }
            }
          )
      );
    } catch (ex) {
      this.errormessage = ex;
    }
  }
  filter(obj: any) {
    this.filteritemtype = obj;
  }
  getUrlWithParameters(url: string) {
    for (let i = 0; i < this.config.UriParameters.length; i++) {
      url = url.replace(
        "{" + this.config.UriParameters[i].Key + "}",
        this.config.UriParameters[i].Value
      );
    }
    return url;
  }
  itemClick(type) {
    this.addtype = type;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
