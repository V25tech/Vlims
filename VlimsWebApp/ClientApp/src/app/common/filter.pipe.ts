import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string,...args: any): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    if (args.length > 0) {
      return items.filter(it => {
        return args.some(x => it[x].toLowerCase().indexOf(searchText.toLowerCase()) != -1);
      });
    }
    else {
      return items.filter(it => {
        return args.some(x => it.toLowerCase().indexOf(searchText.toLowerCase()) != -1);
      });
    }
  }
}
