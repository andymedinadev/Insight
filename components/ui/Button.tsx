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
      className={`h-12 w-full cursor-pointer rounded-lg border border-black bg-[#0655D5] font-['Inter'] text-lg font-bold text-white hover:bg-[#5674a5] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
