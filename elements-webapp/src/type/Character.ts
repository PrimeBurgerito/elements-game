import IDocumentBase from '@type/DocumentBase';
import { IImage } from '@type/image';
import { INumericProperty, IStringProperty } from '@type/Property';

interface ICharacterProperties {
  numericProperties: INumericProperty[];
  stringProperties: IStringProperty[];
}

export interface ICharacterTemplate extends IDocumentBase {
  images: { [id: string]: IImage };
  properties: ICharacterProperties;
}

export interface ICharacter {
  name: string;
  images: { [id: string]: IImage };
  statistics: ICharacterProperties;
  templateId: string;
}
