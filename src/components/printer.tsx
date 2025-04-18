'use client';

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  CSSProperties
} from 'react';
import { PrinterIcon } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  className?: string,
}

export function Printer ({className=""}: Props) {
  const [safeBottom, setSafeBottom] = useState<string>('1rem');
  const lastScrollPos = useRef<number>(0);

  const calculateSafePosition = useCallback((): void => {
    const footer = document.querySelector('footer');
    if (!footer) {
      setSafeBottom('1rem');
      return;
    }

    const footerRect = footer.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if ((viewportWidth - footerRect.width) / 2 > (64+16)) {
      setSafeBottom('1rem');
      return;
    }

    const viewportHeight = window.innerHeight;
    const spaceFromBottom = viewportHeight - footerRect.top;

    setSafeBottom(`${Math.max(16, spaceFromBottom + 16)}px`);
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      lastScrollPos.current = window.pageYOffset;
      calculateSafePosition();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculateSafePosition);
    calculateSafePosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateSafePosition);
    };
  }, [calculateSafePosition]);

  const buttonStyle: CSSProperties = {
    bottom: safeBottom,
  };

  return (
    <Button
      className={`fixed z-50 right-4 size-16 rounded-full shadow-2xl print:hidden ${className}`}
      style={buttonStyle}
      onClick={() => window.print()}
      title="Напечатать резюме"
    >
      <PrinterIcon />
    </Button>
  );
};