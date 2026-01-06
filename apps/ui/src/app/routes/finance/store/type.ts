import { FormModel, InputField } from '../../../ui/input/input-form/type';

export type Asset = {
  uuid: string;
  name: string;
};

export type SectionType = 'assets' | 'liabilities' | 'income';

export type Section<T> = {
  entries: T[];
  loading: boolean;
  error: boolean;
  fields: SectionFields;
};

export type SectionFields = {
  model: FormModel;
  metadata: InputField[];
  loading: boolean;
  error: boolean;
};
