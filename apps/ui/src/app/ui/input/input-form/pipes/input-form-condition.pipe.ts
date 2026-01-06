import { Pipe, PipeTransform } from '@angular/core';
import { InputCondition, InputField } from '../type';

@Pipe({
  name: 'condition',
})
export class InputConditionPipe implements PipeTransform {
  /**
   * Returns true if the field should be rendered inside
   * the input form
   *
   * @param field
   * @param fields
   */
  public transform(
    { condition }: InputField,
    fields: InputField[],
    value: Record<string, unknown>
  ): boolean {
    if (condition === undefined) {
      return true;
    }

    return false;
  }
}
