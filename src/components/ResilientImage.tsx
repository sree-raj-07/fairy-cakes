import { useState } from 'react';
import { CakeSlice } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export default function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Fairy Cakes',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FFD166] via-[#FFF3D1] to-[#E0F7FA] text-[#2D0C33] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <CakeSlice className="w-10 h-10 mb-2 text-[#C9185B]" aria-hidden="true" />
        <span className="font-display font-bold text-base">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="eager"
    />
  );
}
