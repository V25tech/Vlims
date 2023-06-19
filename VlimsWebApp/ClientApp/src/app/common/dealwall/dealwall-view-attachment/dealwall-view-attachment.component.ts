import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'exp-dealwall-view-attachment',
  templateUrl: './dealwall-view-attachment.component.html',
  styleUrls: ['./dealwall-view-attachment.component.scss']
})
export class DealwallViewAttachmentComponent {

  @Output('delete') delete: EventEmitter<Note> = new EventEmitter();
  @Output('download') download: EventEmitter<any> = new EventEmitter();
  @Input('data') attachment: Note;
  @Input("enable") enable: boolean = true;
  deleteattachment() {
    this.delete.emit(this.attachment);
  }
  downloadattachment(file: any) {
    this.download.emit(file);
  }
}
