import { InputField } from '../../../ui/input/input-form/type';

export type Asset = {
  id: string;
  name: string;
  value: number;
  type: string;
  subtype: string | null;
};

export type Liability = {
  id: string;
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
