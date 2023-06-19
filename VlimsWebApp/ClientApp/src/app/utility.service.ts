
import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { Subject } from 'rxjs';
import { NgModelGroup, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public qryParams;
  subject: Subject<boolean>;
  constructor(private ns: NotificationService, private dialogService: DialogService) { }

Show(msg, type){      
    this.ns.show({
        content: msg,
        cssClass: 'button-notification',
        position: { horizontal: 'right', vertical: 'top' },
        type: { style: type, icon: true },
        hideAfter: 5000
    });
}
Confirmation(message: string) {
        this.subject = new Subject<boolean>();
        const dialog: DialogRef = this.dialogService.open({
            content: message,
            actions: [
                { text: 'Cancel' },
                { text: 'Ok', primary: true }
            ],
        });
        dialog.result.subscribe((response) => {
            if (response instanceof DialogCloseResult) {
                this.subject.next(false);
            } else {
                this.subject.next(response['text'] == 'Ok');
                this.subject.complete();
            }
        })
        return this.subject;
}
GetSessionStorageValue(key):any {try {if (sessionStorage.getItem(key) !== null) return JSON.parse(sessionStorage.getItem(key)); return null;} catch (e) {return sessionStorage.getItem(key);}}
SetSessionStorageValue(key, value):void { if (typeof value === 'string') { sessionStorage.setItem(key, value) } else { sessionStorage.setItem(key, JSON.stringify(value)) } }
ClearSessionStorage():void { sessionStorage.clear(); }
ClearSessionStorageByKey(key):void { sessionStorage.removeItem(key); }
GetLocalStoreageValue(key):any { if (localStorage.getItem(key) !== null) return JSON.parse(localStorage.getItem(key)); return null; }
SetLocaltorageValue(key, value):void { if (typeof value === 'string') { localStorage.setItem(key, value) } else { localStorage.setItem(key, JSON.stringify(value)) } }
ClearLocalStorage():void { localStorage.clear(); }
ClearLocalStorageByKey(key):void { localStorage.removeItem(key); }
GetQueryString(key) {
        if (this.qryParams == undefined) {
            this.qryParams = {};
        }
        let match, pl = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query = window.location.search.substr(1);
        while (match = search.exec(query))
            this.qryParams[decode(match[1])] = decode(match[2]);
        if (typeof this.qryParams[key] != 'undefined') {
            return this.qryParams[key];
        }
        return '';
}
Serialize(obj, name) {
    
}
Deserialize(xmlString) {
   
}
GetHtml(code) {
    var code = code;
    return code;
}
Today(){
    return new Date();
}
Year(date){
    if(date)
        return new Date(date).getFullYear();
    else
        return new Date().getFullYear();
}
AgeFromDOB(birthday) {      
    var now = new Date();
    var past = new Date(birthday);
    var nowYear = now.getFullYear();
    var pastYear = past.getFullYear();
    if (pastYear < nowYear) {
        var age = nowYear - pastYear;
        return age;
    }
    return undefined;
}
Month(date) {
    if (date)
        return new Date(date).getMonth() + 1;
    else
        return new Date().getMonth() + 1;
}
Date(date) {       
    if (date)
        return new Date(date).getDate();
    else
        return new Date().getDate();
}
AggregateSum(lstitems, property) {
    var sum = 0;
    if (lstitems && lstitems.length > 0) {
        if (property) {
            for (var i = 0; i < lstitems.length ; i++) {
                var value = eval('lstitems[' + i + '].' + property);
                if (value && value != null)
                    sum += parseFloat(value);
            }
        }
        else {
            for (var i = 0; i < lstitems.length; i++) {
                if (lstitems[i] && lstitems[i] != null)
                    sum += parseFloat(lstitems[i]);
            }
        }
    }
    return sum;
}
CastToInteger(value) {
    if (value && value != null)
        return parseInt(value);
}
New(objName) {
    return eval('new '+objName+'()');
}
ItemByIndex(ItemsArray, index) {
    if (ItemsArray != null && ItemsArray.length > 0 && ItemsArray.length > parseInt(index)) {
        return ItemsArray[index];
    }
    return null;
}
Length(item) {
    if (item.length != undefined) return item.length;
    return -1;
}
AddItemToArray(item, array, index?) {
    if (index != undefined && index < array.length) {
        array.splice(index, 0, item);
    }
    else {
        array.push(item);
    }
}
RemoveItemByIndex(array, index) {
    if (index != undefined && array.length > index) {
        array.splice(index, 1);
    }
}
GetGUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
Trim(searchvalue){
    return searchvalue.replace(/^\s+|\s+$/gm,'');
}
Validate(){
    return true;
}
  ClearDirtyFlag(...fgs: NgModelGroup[]) {
    fgs.forEach((fg: NgModelGroup) => {
      fg.reset(fg.value);
    });
  }

  ClearFormDirty(scope) {
    if(scope != undefined){
      let instanceIndex=1;
      for (let variable of Object.entries(scope)) {
        if (variable[instanceIndex] instanceof NgForm) {
          (<NgForm>variable[instanceIndex]).reset((<NgForm>variable[instanceIndex]).value)
        }
      }
    }
  }
}
