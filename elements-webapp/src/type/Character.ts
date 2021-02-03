import IDocumentBase from '@type/DocumentBase';
import { INumericProperty, IStringProperty } from '@type/Property';
import { IImage } from '@type/Image';

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
