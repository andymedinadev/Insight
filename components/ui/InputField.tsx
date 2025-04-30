import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function InputField({
  id,
  label,
  type = 'text',
  required = false,
  value,
  onChange,
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-base text-black">
        {label} {required && <span className="text-gray-400">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
}
