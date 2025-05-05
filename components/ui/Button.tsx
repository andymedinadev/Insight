// components/Button.tsx
import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-12 w-full cursor-pointer rounded-lg border border-black bg-neutral-400 font-['Inter'] text-sm font-semibold text-black hover:bg-neutral-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
