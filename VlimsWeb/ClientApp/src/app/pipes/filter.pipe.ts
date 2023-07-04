import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, ...filterKeys: string[]): any[] {

        //let filterOn = ['BrandName','CreatedBy'];
        if (!items) return [];
        if (!searchText || !filterKeys) return items;
        searchText = searchText.toLowerCase();

        if (Array.isArray(filterKeys)) {            
            return items.filter(item => {
                return filterKeys.some(x => {
                    return (item[x]!=null) && (item[x].toLowerCase().includes(searchText));
                });
            });
        }
        else {
            let filterKey=filterKeys;
            return items.filter(it => {
                return it[filterKey].toLowerCase().includes(searchText);
            });
        }

    }


}
