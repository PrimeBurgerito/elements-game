import { ICharacter } from '@type/character';
import { ILocation } from '@type/Location';

export interface IClientGameState {
  character: ICharacter;
  location: ILocation;
}
