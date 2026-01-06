import { SelectOption } from '../input-select/input-select';

export type InputType = 'text' | 'number' | 'select';

export type InputField = {
  id: string;
  type: InputType;
  required: boolean;
  label: string;
  placeholder: string;

  /**
   * When select is chosen as type then
   * options must be provided
   */
  options?: SelectOption[];
  condition?: InputCondition;
};

export type FormModel = Record<string, unknown>;

/**
 * Condition for displaying an input
 */
export type InputCondition = { fieldId: string; operator: 'equals'; value: any };
