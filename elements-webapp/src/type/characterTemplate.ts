import { IImage } from '@type/image';

export interface ICharacterTemplate {
  properties: { [id: string]: string };
  attributes: { [id: string]: number };
  images: { [id: string]: IImage };
}
