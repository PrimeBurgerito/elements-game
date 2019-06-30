import { ICharacterStatistics } from '@type/characterTemplate';
import { ILocation } from '@type/Location';

export interface IClientGameState {
  characterStatistics: ICharacterStatistics;
  location: ILocation;
}
