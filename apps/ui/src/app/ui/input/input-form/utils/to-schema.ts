import { schema, Schema } from '@angular/forms/signals';

export const toSchema = (fields: any): Schema<unknown> => {
  return schema(() => {});
};
