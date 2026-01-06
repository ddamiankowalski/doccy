import { hidden, required, schema, Schema } from '@angular/forms/signals';
import { InputField } from '../type';

/**
 * Parses the metadata and creates signal form
 * schema out of it
 *
 * @param fields
 * @returns
 */
export const toSchema = (fields: InputField[]): Schema<unknown> => {
  return schema((path: any) => {
    for (const field of fields) {
      const fieldPath = path[field.id];

      if (!fieldPath) {
        continue;
      }

      if (field.required) {
        required(fieldPath);
      }

      if (field.condition) {
        const { fieldId, value } = field.condition;
        hidden(fieldPath, ({ valueOf }) => valueOf(path[fieldId]) !== value);
      }
    }
  });
};
