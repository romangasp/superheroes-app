import { ValidatorFn } from '@angular/forms';

export type fieldType = 'text' | 'number' | 'slider';

export interface FieldConfig {
  name: string;
  label: string;
  type: fieldType;
  value?: string | number;
  validators?: ValidatorFn[];
  placeholder?: string;
  required?: boolean;
  defaultValue?: number | string;
}

export interface formConfig {
  title: string;
  fields: FieldConfig[];
  submitText?: string;
  cancelText?: string;
}
