export interface Button {
  customClass?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  disabled?: boolean;
}

export interface Input {
  modelValue: string;
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
};

export interface Textarea {
  modelValue: string;
  id: string;
  label?: string;
  placeholder?: string;
  error?: string;
}