import { IEvent } from '@type/Event';
import { ILocation } from '@type/Location';
import { ICharacter } from '@type/Character';

export interface IGameStateResource {
  character: ICharacter;
  location: ILocation;
  currentEvent?: IEvent;
}
