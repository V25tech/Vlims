import { Component, Input } from '@angular/core';
import { MessageListItem } from './messagelistitem';

@Component({
  selector: 'messagelist',
  templateUrl: './messagelist.component.html'
})
export class MessagelistComponent {
  // isMsgPopupVisible: boolean = false;
  // curntItem = new MessageListItem();
  @Input() data = new Array<MessageListItem>();

  // openMsgPopup(data) {
  //   this.isMsgPopupVisible = true;
  //   this.curntItem = data;
  // }
  // closeMsgPopup() {
  //   this.isMsgPopupVisible = false;
  // }
}
