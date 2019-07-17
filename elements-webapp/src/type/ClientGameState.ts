import { ICharacter } from '@type/character';
import { IEvent } from '@type/Event';
import { ILocation } from '@type/Location';

export interface IClientGameState {
  character: ICharacter;
  location: ILocation;
  currentEvent?: IEvent;
}
