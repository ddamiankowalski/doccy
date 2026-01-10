import { InputField } from '../../../ui/input/input-form/type';

export type FinanceEntry = {
  type: string;
};

export type AssetEntry = {} & FinanceEntry;

export type LiabilityEntry = {} & FinanceEntry;

export type IncomeEntry = {} & FinanceEntry;

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

export type Equity = {
  symbol: string;
  name: string;
  shortname: string;
  longname: string;
  exchange: string;
};
