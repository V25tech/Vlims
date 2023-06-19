import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from "@angular/core";
import {
  Note,
  Attachment,
  attachmentsallowfiletypes,
  documenttypes
} from "../note";
import { NgForm } from "@angular/forms";
import { UtilityService } from "src/app/utility.service";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "exp-dealwall-add-attachment",
  templateUrl: "./dealwall-add-attachment.component.html",
  styleUrls: ["./dealwall-add-attachment.component.scss"],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateY(-50%)", "max-height": "*", opacity: 1 }),
        animate("400ms ease-in", style({ transform: "translateY(0%)" })),
      ]),
      transition(":leave", [
        animate(
          "400ms ease-in",
          style({
            transform: "translateY(-50%)",
            "max-height": "0px",
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class DealwallAddAttachmentComponent implements OnInit {
  @Output("save") add: EventEmitter<any> = new EventEmitter();
  @Output("cancel") cancel: EventEmitter<void> = new EventEmitter();
  @ViewChild("attachmentform", null) form: NgForm;
  @Input("allowfiletypes") allowfiletypes: Array<string>;
  @Input("enable") enable: boolean = true;
  @Input("isopen") isopen: boolean = false;
  attachment: Attachment;
  constructor(private us: UtilityService) {
    this.attachment = new Attachment();
  }
  @Output("dirtyMark") dirtyMark: EventEmitter<any> = new EventEmitter<any>();
  makrkedDirty: boolean = false;
  ngOnInit() {
    if (!this.allowfiletypes) {
      this.allowfiletypes = attachmentsallowfiletypes;
    }
    this.note = new Note();
  }
  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe((x) => {
      if (!this.makrkedDirty && this.form.dirty) {
        this.dirtyMark.emit(true);
        this.makrkedDirty = true;
      }
    })
  }
  note: Note;
  addAttachment(e, isAnother) {
    if (this.form.valid) {
      this.note.Subject = "##attachment##";
      this.note.Description = "##attachment##";
      this.note.Attachments = [];
      this.attachment.FileName = this.note.FileName;
      this.attachment.FileType = this.note.FileType;
      this.note.Attachments.push(this.attachment);
      this.add.emit({ 'Note': this.note, 'isAnother': isAnother });
    } else {
      this.form.control.markAllAsTouched();
    }
  }
  cancelattachment() {
    this.cancel.emit();
    this.form.reset();
  }
  uploadfile(files: FileList) {
    let file = files[0],
      namearr = file.name.split(".");
    if (!(attachmentsallowfiletypes.indexOf(file.type) === -1)) {
      namearr = file.name.split(".");
      this.attachment["File"] = file;
      this.note.FileType = namearr[namearr.length - 1];
      namearr.splice(namearr.length - 1, 1);
      this.note.FileName = namearr.join(".");
    } else {
      this.us.Show("Only files with format pdf, .doc, .docx, .xls, .xlsx, jpg, jpeg, png is allowed", "error");
      this.note.FileName = "";
    }
  }
  doctypes = documenttypes;
  title: string = "Add New";
  file: any;
  clear() {
    this.file = null;
    this.attachment.FileName = "";
  }
  files: any;
}
