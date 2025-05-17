'use client';

import { useState } from 'react';
import Image from 'next/image';

import { ValidationError } from '@/components';
import { ClosedEye, OpenEye } from '@/public';

interface InputFieldProps {
  id: string;
  label?: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
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
  hasError = false,
  errorMessage,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const shouldShowEye = touched && value.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    onChange?.(e);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="justify-start font-['Roboto'] text-base leading-normal font-normal text-[#000F27]"
      >
        {label ? label : ''}{' '}
        {required && (
          <span className="justify-start font-['Roboto'] text-base leading-normal font-normal text-red-600">
            *
          </span>
        )}
      </label>
      {errorMessage ? <ValidationError label={errorMessage} /> : null}
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          className={`mt-1 h-12 w-full items-center justify-start gap-2 self-stretch rounded-lg px-4 outline-1 outline-offset-[-1px] outline-[#001F52]/40 ${
            hasError
              ? 'bg-[#FF4a4a]/5 outline-2 outline-[#c73a3a]/80 focus:ring-[#c73a3a]'
              : 'bg-white outline-1 outline-offset-[-1px] outline-[001F52]/40'
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`${shouldShowEye ? 'opacity-100' : 'pointer-events-none opacity-0'} absolute inset-y-0 top-[2px] right-3 flex items-center transition-opacity duration-300`}
            tabIndex={-1}
          >
            <Image src={showPassword ? OpenEye : ClosedEye} alt="EyeIcon" />
          </button>
        )}
      </div>
    </div>
  );
}
