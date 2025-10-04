
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  name?: string;
  role?: string;
  phone?: string;
};

export const placeholderImages: ImagePlaceholder[] = data.placeholderImages;

    

    