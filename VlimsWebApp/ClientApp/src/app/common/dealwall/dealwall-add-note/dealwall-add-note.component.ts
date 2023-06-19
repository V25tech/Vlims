import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  Input,
} from "@angular/core";
import {
  Note,
  notetypes,
  documenttypes,
  Attachment,
  attachmentsallowfiletypes,
} from "../note";
import { NgForm } from "@angular/forms";
import { UtilityService } from "src/app/utility.service";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "exp-dealwall-add-note",
  templateUrl: "./dealwall-add-note.component.html",
  styleUrls: ["./dealwall-add-note.component.scss"],
  animations: [
    trigger("slideInOut", [
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
      transition(":enter", [
        style({
          transform: "translateY(50%)",
          "max-height": "*",
          opacity: 1,
        }),
        animate("400ms ease-in", style({ transform: "translateY(0%)" })),
      ]),
    ]),
  ],
})
export class DealwallAddNoteComponent implements OnInit {
  @Output("save") add: EventEmitter<any> = new EventEmitter();
  @Output("cancel") cancel: EventEmitter<void> = new EventEmitter();
  @ViewChild("noteform", null) form: NgForm;
  title: string = "Add Note";
  description: any;
  @Output("dirtyMark") dirtyMark: EventEmitter<any> = new EventEmitter<any>();
  makrkedDirty: boolean = false;
  ngOnInit() {
    this.note = new Note();
    this.notetypes = notetypes;
    this.doctypes = documenttypes;
  }
  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe((x) => {
      if (!this.makrkedDirty && this.form.dirty) {
        this.dirtyMark.emit(true);
        this.makrkedDirty = true;
      }
    })
  }
  constructor(private us: UtilityService) { }
  public note: Note;
  public notetypes = [];
  public addattachment = false;
  public doctypes = [];

  addnote(e, isAnother) {
    if (this.form.valid) {
      if (this.addattachment) {
        this.note.Attachments = new Array<Attachment>();
        let attachment = {
          Description: this.description,
          File: this.note["file"],
          FileName: this.note.FileName,
          FileType: this.note.FileType,
          NotesType: this.note["documenttype"]
        };

        this.note.Attachments.push(attachment);
      }
      this.add.emit({ 'Note': this.note, 'isAnother': isAnother });
    } else {
      this.form.control.markAllAsTouched();
    }
  }
  clearnote() {
    this.cancel.emit();
    this.form.reset();
  }
  addnoteattachment() {
    this.addattachment = true;
  }
  uploadfile(files: FileList) {
    let file = files[0],
      namearr = file.name.split(".");
    if (!(attachmentsallowfiletypes.indexOf(file.type) === -1)) {
      namearr = file.name.split(".");
      this.note["file"] = file;
      this.note.FileType = namearr[namearr.length - 1];
      namearr.splice(namearr.length - 1, 1);
      this.note.FileName = namearr.join(".");
    } else {
      this.us.Show(
        "Only files with format pdf, .doc, .docx, .xls, .xlsx, jpg, jpeg, png is allowed",
        "error"
      );
      this.note.FileName = "";
    }
  }
  file: any;
}
