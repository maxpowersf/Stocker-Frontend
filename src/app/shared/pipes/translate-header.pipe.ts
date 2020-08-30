import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateHeader'
})
export class TranslateHeaderPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch (value) {
      case 'name': return 'name';
      case 'year': return 'year';
      default: return value;
    }
  }
}