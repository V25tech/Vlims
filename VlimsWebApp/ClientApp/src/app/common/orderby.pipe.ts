import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: true
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], propertyName: string): any[] {
    if (value != null && propertyName){
      return value.sort((a: any, b: any) => String(a[propertyName]).localeCompare(String(b[propertyName])));
    }else
      return value;
  }

}