import { IScene } from '@type/Event';
import { ILocation } from '@type/Location';
import { ICharacter } from '@type/Character';

export interface IGameStateResource {
  character: ICharacter;
  location: ILocation;
  currentScene?: IScene;
}
