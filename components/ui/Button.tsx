// components/Button.tsx
import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', onClick, children, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-12 w-full rounded-lg border border-black bg-neutral-400 font-['Inter'] text-sm font-semibold text-black ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
