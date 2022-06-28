import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBar'
})
export class SearchBarPipe implements PipeTransform {

  transform(serviceValue: any, SearchBarText: string): any {
    if(!serviceValue || !SearchBarText){
      return serviceValue     
    }
    SearchBarText = SearchBarText.toLowerCase();
    return serviceValue.filter((serviceResults) => 
      serviceResults.name.toLowerCase().includes(SearchBarText) ||
      serviceResults.notes.toLowerCase().includes(SearchBarText) ||
      serviceResults.status.toLowerCase().includes(SearchBarText) 
    )
  }

}

