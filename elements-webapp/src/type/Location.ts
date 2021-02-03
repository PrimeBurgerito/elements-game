import { IImage } from '@type/Image';

export interface ILocation {
  name: string;
  nearbyLocations: string[];
  images: IImage[];
}
