import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'waitingListSearchBar'
})
export class WaitingListSearchBarPipe implements PipeTransform {

  transform(wlValue: any, SearchBarText: string): any {
    if(!wlValue || !SearchBarText){
      return wlValue     
    }
    SearchBarText = SearchBarText.toLowerCase();
    return wlValue.filter((serviceResults) => 
      serviceResults.name.toLowerCase().includes(SearchBarText) ||
      serviceResults.service.name.toLowerCase().includes(SearchBarText)
    )
  }

}
