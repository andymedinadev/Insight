import Image, { StaticImageData } from 'next/image';

import { CheckIcon, CloseIcon, InfoIcon, Xerror } from '@/public';

type AlertType = 'error' | 'info' | 'success';

type AlertStyle = {
  bg: string;
  border: string;
  sideBar: string;
  icon: StaticImageData;
};

const alertStyles: Record<AlertType, AlertStyle> = {
  error: {
    bg: 'bg-[#FF4A4A]/20',
    border: 'outline-[#C73A3A]/14',
    sideBar: 'bg-[#C73A3A]/80',
    icon: Xerror,
  },
  info: {
    bg: 'bg-[#26B0FF]/20',
    border: 'outline-[#1A74A8]/20',
    sideBar: 'bg-[#1A74A8]/80',
    icon: InfoIcon,
  },
  success: {
    bg: 'bg-[#0ACC92]/20',
    border: 'outline-[#067A57]/20',
    sideBar: 'bg-[#067A57]/80',
    icon: CheckIcon,
  },
};

const positionClasses: Record<NonNullable<AlertProps['position']>, string> = {
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
};

interface AlertProps {
  type: AlertType;
  title: string;
  visible: boolean;
  description?: string;
  onClose?: () => void;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
}

export function Alert({
  type,
  title,
  description,
  onClose,
  visible,
  position = 'bottom-left',
  className,
}: AlertProps) {
  const styles = alertStyles[type];
  const height = description ? 'h-[78px] md:h-[106px]' : 'h-[56px] md:h-[76px]';

  if (!visible) return null;

  return (
    <div
      className={`fixed z-50 overflow-hidden rounded-lg ${styles.bg} transition-all duration-300 ${positionClasses[position]} ${className}`}
    >
      <div
        className={`relative inline-flex w-96 items-start overflow-hidden rounded-lg outline-1 outline-offset-[-1px] md:w-[600px] ${styles.border} ${height} `}
      >
        <div className={`absolute top-0 left-0 h-full w-1 ${styles.sideBar}`} />
        <div className="flex flex-1 items-start justify-start gap-3 p-4 md:gap-3 md:p-6">
          <div className="flex h-7 w-6 items-center justify-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden">
              <Image src={styles.icon} alt="icon" width={24} height={24} />
            </div>
          </div>

          <div className="mt-1.5 self-center text-xs leading-tight font-semibold text-[#000F27]/90 md:mt-0 md:text-2xl md:leading-7">
            <div>{title}</div>
            {description && (
              <div className="mt-1 min-h-7 font-normal text-[#000D22]/60 md:text-base md:leading-normal">
                <p>{description}</p>
              </div>
            )}
          </div>
        </div>

        {description && onClose && (
          <button
            onClick={onClose}
            className="group absolute top-4 right-4 h-6 w-6 md:top-7 md:right-6"
            aria-label="Cerrar alerta"
          >
            <Image
              src={CloseIcon}
              alt="close icon"
              width={24}
              height={24}
              className="transition-transform group-hover:rotate-90"
            />
          </button>
        )}
      </div>
    </div>
  );
}
