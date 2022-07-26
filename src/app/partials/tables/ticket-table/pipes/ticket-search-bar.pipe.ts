import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketSearchBar'
})
export class TicketSearchBarPipe implements PipeTransform {

  transform(ticketValue: any, SearchBarText: string): any {
    if(!ticketValue || !SearchBarText){
      return ticketValue     
    }
    SearchBarText = SearchBarText.toLowerCase();
    return ticketValue.filter((serviceResults) => 
      serviceResults.number.toString().includes(SearchBarText) ||
      serviceResults.waiting_list.name.toLowerCase().includes(SearchBarText)
    )
  }

}
