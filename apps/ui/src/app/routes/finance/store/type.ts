import { FormModel, InputField } from '../../../ui/input/input-form/type';

export type Asset = {
  uuid: string;
  name: string;
};

export type SectionType = 'assets' | 'liabilities' | 'income';

export type Section<T = any> = {
  entries: T[];
  loading: boolean;
  error: boolean;
  createLoading: boolean;
  fields: SectionFields;
};

export type SectionFields = {
  metadata: InputField[];
  loading: boolean;
  error: boolean;
};
