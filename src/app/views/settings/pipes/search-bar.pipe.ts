import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'searchBar'
})
export class SearchBarPipe implements PipeTransform {

  transform(value = [], SearchBarText: string): any {
    if(!SearchBarText){
      return value     
    }
    SearchBarText = SearchBarText.toLowerCase();
    return value.filter((results: any) => 
      results.name.toLowerCase().includes(SearchBarText)
    )
  }

  /*transform(items: any, filter: any, defaultFilter: boolean): any {
    if(!filter){
      return items;
    }
    if(!Array.isArray(items)){
      return items;
    }
    if(filter && Array.isArray(items)){
      let filterKeys =  Object.keys(filter);

      if(defaultFilter){
        return items.filter(item => 
          filterKeys.reduce((x, keyName) =>
          (x && new RegExp(filter[keyName], 'gi').test(item[keyName]))))
      }else{
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName])
          })
        })
      }
    }
  }*/

}

