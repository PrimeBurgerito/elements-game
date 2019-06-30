import { IImage } from '@type/image';

export interface ILocation {
  name: string;
  nearbyLocations: string[];
  images: IImage[];
}
