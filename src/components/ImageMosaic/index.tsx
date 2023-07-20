import { FC } from 'react';
import Image from 'next/image';
import image1 from '@/public/image-mosaic/image-1.webp';
import image2 from '@/public/image-mosaic/image-2.webp';

import image3 from '@/public/image-mosaic/image-3.webp';
import image4 from '@/public/image-mosaic/image-4.webp';
import image5 from '@/public/image-mosaic/image-5.webp';
import image6 from '@/public/image-mosaic/image-6.webp';
import image7 from '@/public/image-mosaic/image-7.webp';
import image8 from '@/public/image-mosaic/image-8.webp';

interface ImageGridItemProps {
  src: string;
  alt: string;
  gridArea: string;
}
const images = [
  { src: image1.src, gridArea: 'first' },
  { src: image2.src, gridArea: 'second' },
  { src: image3.src, gridArea: 'third' },
  { src: image4.src, gridArea: 'forth' },
  { src: image5.src, gridArea: 'fifth' },
  { src: image6.src, gridArea: 'sixth' },
  { src: image7.src, gridArea: 'seventh' },
  { src: image8.src, gridArea: 'eight' },
];
export const ImageGridItem: FC<ImageGridItemProps> = ({
  src,
  alt,
  gridArea,
}) => {
  return (
    <div
      className="relative rounded-md "
      style={{
        gridArea: gridArea,
      }}
    >
      <Image src={src} alt={src} fill className="rounded-md" />
    </div>
  );
};

const ImageGrid = () => (
  <div className="p-lg  max-h-[70vh] align-self-center hidden lg:block ">
    <div className="image-mosaic h-[60vh]  gap-3">
      {images.map(({ src, gridArea }) => (
        <ImageGridItem key={src} src={src} alt="" gridArea={gridArea} />
      ))}
    </div>
  </div>
);

export default ImageGrid;
