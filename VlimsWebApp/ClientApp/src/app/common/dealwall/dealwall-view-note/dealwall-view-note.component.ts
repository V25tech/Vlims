import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Attachment, Note } from '../note';


@Component({
  selector: 'exp-dealwall-view-note',
  templateUrl: './dealwall-view-note.component.html',
  styleUrls: ['./dealwall-view-note.component.scss']
})
export class DealwallViewNoteComponent {
  @Input('data') note: Note;
  @Output('delete') deletenote: EventEmitter<Note> = new EventEmitter();
  @Output('download') download: EventEmitter<Attachment> = new EventEmitter();
  @Output('edit') editnote: EventEmitter<Note> = new EventEmitter();
  @Input("enable") enable: boolean = true;
  deletenotes() {
    this.deletenote.emit(this.note);
  }
  editnotes() {
    this.editnote.emit(this.note);
  }
  downloadnote(file: Attachment) {
    this.download.emit(file);
  }
}
