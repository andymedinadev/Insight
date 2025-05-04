import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function InputField({
  id,
  label,
  type = 'text',
  required = false,
  value,
  onChange,
  onBlur,
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-medium text-black">
        {label} {required && <span>*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className="mt-1 h-12 w-full rounded-xl border border-gray-400 bg-gray-50 px-4 placeholder:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none lg:placeholder:text-gray-600"
      />
    </div>
  );
}
