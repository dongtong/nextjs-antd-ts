import Image from 'next/image';
import React from 'react';

export interface ILogo {
  imgSrc?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<ILogo> = ({ imgSrc, width, height }) => {
  return (
    <Image
      width={width || 120}
      height={height || 120}
      src={imgSrc || '/images/logo.png'}
      alt="Logo"
    />
  );
};

export default Logo;
