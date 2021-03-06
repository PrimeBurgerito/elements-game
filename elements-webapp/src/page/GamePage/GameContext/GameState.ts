import { Dispatch, ReducerAction, useReducer } from 'react';
import { IGameStateResource } from '@type/GameStateResource';

export const initialGameState = {
  connected: false,
  test: '',
  resource: {} as IGameStateResource
};

export const GameStateAction = {
  connected: () => ({type: 'CONNECTED', value: true} as const),
  test: (value: string) => ({type: 'TEST', value} as const),
  updateClientGameState: (value: IGameStateResource) => ({type: 'GAME_STATE', value} as const),
};

export type GameState = typeof initialGameState;
type GameAction = ReturnType<typeof GameStateAction.test
  | typeof GameStateAction.connected
  | typeof GameStateAction.updateClientGameState>;

const gameStateReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'TEST':
      return {...state, test: action.value || 'no payload :('};
    case 'CONNECTED':
      return {...state, connected: action.value};
    case 'GAME_STATE':
      return {...state, resource: action.value};
  }
};
export type GameStateDispatcher = Dispatch<ReducerAction<typeof gameStateReducer>>;

export default (state = initialGameState) => useReducer(gameStateReducer, state);
