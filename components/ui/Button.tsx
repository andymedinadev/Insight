// components/Button.tsx
import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-12 bg-neutral-400 border border-black rounded-lg text-sm font-semibold text-black font-['Inter'] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
