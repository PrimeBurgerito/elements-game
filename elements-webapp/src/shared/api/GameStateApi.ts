import { POST } from '@shared/api/request-template/requests';
import { AxiosResponse } from 'axios';

const GAME_STATE_PATH = '/game-state';

export interface IGameStateDto {
  characterTemplateId: string;
  characterName: string;
}

export default class GameStateApi {
  public static create = async (gameStateDto: IGameStateDto): Promise<boolean> => {
    const response: AxiosResponse = await POST(GAME_STATE_PATH, gameStateDto);
    return await response.data;
  }
}
