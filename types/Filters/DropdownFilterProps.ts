// types/DropdownFilterProps.ts

import { StaticImageData } from 'next/image';

export interface DropdownFilterProps {
  label: string;
  icon?: StaticImageData;
  options: string[];
  onSelect: (value: string) => void;
}
