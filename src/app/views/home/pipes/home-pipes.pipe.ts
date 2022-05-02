import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homePipes'
})
export class HomePipesPipe implements PipeTransform {

  transform(name: string): any {
    return name
      .split(" ")
      .map(n => n[0])
      .join("");
  }

}
