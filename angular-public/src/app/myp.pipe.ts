import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myp'
})
export class MypPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown { return null; }
  transform(s: string): number { return s.length };

}
