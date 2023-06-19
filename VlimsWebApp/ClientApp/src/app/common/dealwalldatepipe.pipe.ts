import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dealwalldatepipe'
})
export class DealwalldatepipePipe implements PipeTransform {
  transform(CreatedDate: any, type: string): any {
    if (type == 'event') {
      let now = new Date(), objtime = new Date(CreatedDate);
      let appends = function (val) {
        return val != 1 ? 's ago' : ' ago';
      }
      let seconds = Math.floor((now.getTime() - objtime.getTime()) / 1000);
      if (seconds < 0) {
        return "0 seconds ago";
      }
      else if (seconds < 60) {
        return Math.floor(seconds) + ' second' + appends(Math.floor(seconds));
      }
      else {
        let minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
          return Math.floor(minutes) + ' minute' + appends(Math.floor(minutes));
        }
        else {
          let hours = Math.floor(minutes / 60);
          if (hours < 24) {
            return Math.floor(hours) + ' hour' + appends(Math.floor(hours));
          }
          else {
            let days = Math.floor(hours / 24);
            if (days < 7) {
              return Math.floor(days) + ' day' + appends(Math.floor(days));
            }
            else if (days < 30) {
              return Math.floor(days / 7) + ' week' + appends(Math.floor(days));
            }
            else {
              let months = Math.floor(days / 30);
              if (months < 12) {
                return Math.floor(months) + ' month' + appends(Math.floor(months));
              }
              else {
                let years = Math.floor(months / 12);
                return Math.floor(years) + ' year' + appends(Math.floor(years));
              }
            }
          }
        }
      }
    }
    else {
      let widgetDate = new Date(CreatedDate), dd = widgetDate.getDate(), mm = widgetDate.getMonth() + 1, yyyy = widgetDate.getFullYear(), hr = widgetDate.getHours(), min = widgetDate.getMinutes(), ampm = (hr >= 12) ? 'PM' : 'AM';
      dd = (dd < 10) ? 0 + dd : dd;
      mm = (mm < 10) ? 0 + mm : mm;
      hr = (hr > 12) ? hr - 12 : hr;
      hr = (hr < 10) ? 0 + hr : hr;
      min = (min < 10) ? 0 + min : min;
      return mm + '-' + dd + '-' + yyyy + ' | ' + hr + ':' + min + '  ' + ampm;
    }
  }
}
