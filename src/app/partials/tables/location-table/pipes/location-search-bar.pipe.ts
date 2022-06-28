import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationSearchBar'
})
export class LocationSearchBarPipe implements PipeTransform {

  transform(locationValue: any, LocationSearchBarText: string): any {
    if(!locationValue || !LocationSearchBarText){
      return locationValue     
    }
    LocationSearchBarText = LocationSearchBarText.toLowerCase();
    return locationValue.filter((locationResults) => 
      locationResults.address.toLowerCase().includes(LocationSearchBarText) ||
      locationResults.notes.toLowerCase().includes(LocationSearchBarText) ||
      locationResults.status.toLowerCase().includes(LocationSearchBarText)
    )
  }

/*   transform(locationValue: any, address: any, notes: any): any {
    if(!address){
      return locationValue
    }
    var filteredLocationItems : any = []
    if (address){   
      filteredLocationItems = locationValue.filter(t=>t.includes(address));
     }
    if (notes){   
      filteredLocationItems = locationValue.filter(t=>t.includes(notes));
     }
     return locationValue;
  } */

}
