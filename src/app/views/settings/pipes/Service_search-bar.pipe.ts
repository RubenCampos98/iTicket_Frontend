import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'searchBar'
})
export class SearchBarPipe implements PipeTransform {

transform(value: any, SearchBarText: string): any {
    if(!value || !SearchBarText){
      return value     
    }
    SearchBarText = SearchBarText.toLowerCase();
    return value.filter((results) => 
      results.name.toLowerCase().includes(SearchBarText) ||
      results.status.toLowerCase().includes(SearchBarText) 
    )
  }

}

