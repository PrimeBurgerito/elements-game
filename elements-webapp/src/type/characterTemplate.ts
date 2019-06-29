import IDocumentBase from '@type/DocumentBase';
import { IImage } from '@type/image';

export interface ICharacterTemplate extends IDocumentBase {
  properties: { [id: string]: string };
  attributes: { [id: string]: number };
  images: { [id: string]: IImage };
}

export interface ICharacterStatistics {
  properties: { [id: string]: string };
  attributes: { [id: string]: number };
  images: { [id: string]: IImage };
  objectives: string[];
}
