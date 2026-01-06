export type Asset = {
  uuid: string;
  name: string;
};

export type SectionType = 'assets' | 'liabilities' | 'income';

export type SectionAddField = {
  type: string;
};

export type Section<T> = {
  entries: T[];
  loading: boolean;
  error: boolean;
  addFields: SectionAddField[] | 'error' | 'loading';
};
