import { InputNumberMode } from '../input-number/input-number';
import { SelectOption } from '../input-select/input-select';

export type InputType = 'text' | 'number' | 'select' | 'equity' | 'date';

export type InputField = {
  id: string;
  type: InputType;
  required: boolean;
  label: string;
  placeholder: string;
  mode: InputNumberMode;

  /**
   * When select is chosen as type then
   * options must be provided
   */
  options?: SelectOption[];
  condition?: InputCondition;
};

export type FormModel = Record<string, any>;

/**
 * Condition for displaying an input
 */
export type InputCondition = { fieldId: string; operator: 'equals'; value: any };
