'use client';

interface ConfirmCodeInputProps {
  code: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

export function ConfirmCodeInput({ code, handleChange }: ConfirmCodeInputProps) {
  return (
    <div className="flex h-[42px] gap-[2px] lg:h-[85px] lg:w-[675px] lg:gap-[4px]">
      {code.map((char, i) => (
        <input
          key={i}
          id={`code-${i}`}
          type="text"
          value={char}
          onChange={(e) => handleChange(e, i)}
          maxLength={1}
          className="h-full w-[42px] justify-start rounded-lg border border-black/50 bg-white text-center font-['Roboto'] text-base leading-normal font-semibold tracking-tight text-black uppercase lg:w-[80px]"
        />
      ))}
    </div>
  );
}
