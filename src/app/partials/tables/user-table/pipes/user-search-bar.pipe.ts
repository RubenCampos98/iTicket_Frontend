import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSearchBar'
})
export class UserSearchBarPipe implements PipeTransform {

  transform(userValue: any, SearchBarText: string): any {
    if(!userValue || !SearchBarText){
      return userValue     
    }
    SearchBarText = SearchBarText.toLowerCase();
    return userValue.filter((serviceResults) => 
      serviceResults.name.toLowerCase().includes(SearchBarText) ||
      serviceResults.email.toLowerCase().includes(SearchBarText)
    )
  }

}
