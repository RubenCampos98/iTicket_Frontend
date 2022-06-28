import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingSearchBar'
})
export class BookingSearchBarPipe implements PipeTransform {

  transform(bookingValue: any, BookingSearchBarText: string): any {
    if(!bookingValue || !BookingSearchBarText){
      return bookingValue     
    }
    BookingSearchBarText = BookingSearchBarText.toLowerCase();
    return bookingValue.filter((serviceResults) => 
      serviceResults.name.toLowerCase().includes(BookingSearchBarText) ||
      serviceResults.email.toLowerCase().includes(BookingSearchBarText)
    )
  }

}
