import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'condition',
})
export class InputFormCondition implements PipeTransform {
  public transform(condition: InputFormCondition, ...args: any[]) {}
}
