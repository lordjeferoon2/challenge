import React from 'react';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

interface Props {
  label: string;
  id: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

const InputField: React.FC<Props> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  className,
}) => {
  return (
    <div className={classNames('p-field p-fluid', className)}>
      <label htmlFor={id} className="block font-medium mb-2 mt-4">
        {label}
      </label>
      <InputText
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={classNames('p-inputtext p-2', { 'p-invalid': !!error })}
      />
      {error && <small className="p-error block mt-1">{error}</small>}
    </div>
  );
};

export default InputField;
