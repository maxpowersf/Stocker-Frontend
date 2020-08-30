import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateHeader'
})
export class TranslateHeaderPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch (value) {
      case 'name': return 'name';
      case 'categoryName': return 'Category';
      case 'minimumAccepted': return 'Minimum Accepted';
      case 'minimumRequired': return 'Minimum Required';
      default: return value;
    }
  }
}