import { useState } from 'react';

export function useCodeInput(length = 8) {
  const [code, setCode] = useState(Array(length).fill(''));

  const isComplete = code.every((char) => /^[A-Z0-9]$/.test(char));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.toUpperCase().slice(0, 1);
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    if (val && index < length - 1) {
      const next = document.getElementById(`code-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (code[index] === '' && index > 0) {
        const prev = document.getElementById(`code-${index - 1}`);
        prev?.focus();
      }
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`);
      prev?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      const next = document.getElementById(`code-${index + 1}`);
      next?.focus();
    }
  };

  return { code, setCode, isComplete, handleChange, handleKeyDown };
}
