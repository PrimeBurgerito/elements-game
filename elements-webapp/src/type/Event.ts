import { IImage } from '@type/Image';

export type SceneType = 'DEFAULT' | 'OPTION';

export interface IEvent {
  text: string;
  image: IImage;
  type: SceneType;
  options?: IOption[];
}

export interface IOption {
  text: string;
  disabled: boolean;
}
