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
<<<<<<< HEAD
      className={`md:hover:bg-neutral-300 hover:bg-neutral-300 w-full h-12 bg-neutral-400 border border-black rounded-lg text-sm font-semibold text-black font-['Inter'] ${className}`}
=======
      className={`h-12 w-full rounded-lg border border-black bg-neutral-400 font-['Inter'] text-sm font-semibold text-black ${className}`}
>>>>>>> dd23eb3023bff4ed424302919c642ce823cd0fba
    >
      {children}
    </button>
  );
};

export default Button;
